import json
import re
import uuid
from datetime import datetime

from sqlalchemy.orm import Session

from app.clients import hunar_client, whatsapp_client
from app.config import settings
from app.models.call import Call
from app.repos import call_repo, job_repo, person_repo

DONE = {"COMPLETED", "FAILED", "CANCELLED", "NOT_CONNECTED"}


def start_call(db: Session, job_id: int, person_id: int, phone: str) -> Call:
    job = job_repo.get(db, job_id)
    person = person_repo.get(db, person_id)
    if not job or not person:
        raise ValueError("Job or person not found")

    number = clean_phone(phone or person.phone or settings.safe_phone)
    request_id = f"job-{job.id}-person-{person.id}-{uuid.uuid4().hex[:8]}"
    agent_id = job.agent_id or _first_agent_id()
    if not job.agent_id:
        job.agent_id = agent_id
        job_repo.save(db, job)

    hunar = hunar_client.start_call(
        agent_id=agent_id,
        callee_name=person.name,
        mobile_number=number,
        custom_data={
            "job_role": job.title,
            "company": settings.company_name,
            "location": person.location or "India",
        },
        request_id=request_id,
    )
    call = Call(
        job_id=job.id,
        person_id=person.id,
        hunar_call_id=str(hunar.get("id") or ""),
        request_id=request_id,
        channel="voice",
        status=str(hunar.get("status") or hunar.get("lifecycle_status") or "QUEUED"),
        phone=number,
    )
    return call_repo.add(db, call)


def refresh_call(db: Session, call: Call) -> Call:
    if not call.hunar_call_id or call.status in DONE:
        return call
    remote = hunar_client.get_call(call.hunar_call_id)
    if remote.get("status"):
        call.status = str(remote.get("lifecycle_status") or remote["status"])
    if remote.get("recording_url"):
        call.recording_url = str(remote["recording_url"])
    if remote.get("result"):
        call.result_json = json.dumps(remote["result"])
        summary = remote["result"].get("summary") if isinstance(remote["result"], dict) else ""
        if summary:
            call.summary = str(summary)
    call.updated_at = datetime.utcnow()
    return call_repo.save(db, call)


def send_followup(db: Session, call_id: int) -> Call:
    call = call_repo.get(db, call_id)
    if not call:
        raise ValueError("Call not found")
    person = person_repo.get(db, call.person_id)
    job = job_repo.get(db, call.job_id)
    msg = whatsapp_client.send_followup(person.name if person else "", call.phone, job.title if job else "")
    call.channel = "whatsapp"
    call.status = "COMPLETED"
    call.summary = msg["reply"]
    result = json.loads(call.result_json or "{}")
    result["whatsapp_reply"] = msg["reply"]
    result.pop("sms_sent", None)
    result.pop("sms_reply", None)
    call.result_json = json.dumps(result)
    call.updated_at = datetime.utcnow()
    return call_repo.save(db, call)


def clean_phone(raw: str) -> str:
    digits = re.sub(r"\D", "", raw or "")
    if digits.startswith("91") and len(digits) >= 12:
        return "+" + digits
    if len(digits) == 10:
        return "+91" + digits
    if raw.startswith("+"):
        return "+" + digits
    return "+91" + digits


def _first_agent_id() -> str:
    data = hunar_client.list_agents()
    rows = data.get("results") or []
    if not rows:
        raise ValueError("No Hunar agent found")
    for row in rows:
        if "outreach" in (row.get("name") or "").lower() or "screen" in (row.get("name") or "").lower():
            return row["id"]
    return rows[0]["id"]
