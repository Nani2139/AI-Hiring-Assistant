import json
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.event import Event
from app.repos import call_repo, event_repo


def save_event(db: Session, payload: dict) -> None:
    event_type = str(payload.get("event_type") or "unknown")
    call_id = str(payload.get("call_id") or "")
    if call_id and event_repo.seen(db, event_type, call_id):
        return
    event_repo.add(
        db,
        Event(
            event_type=event_type,
            call_id=call_id,
            request_id=str(payload.get("request_id") or ""),
            payload=json.dumps(payload),
        ),
    )
    update_call(db, payload)


def update_call(db: Session, payload: dict) -> None:
    hunar_id = str(payload.get("call_id") or "")
    if not hunar_id:
        return
    call = call_repo.get_by_hunar_id(db, hunar_id)
    if not call:
        return
    if payload.get("status"):
        call.status = str(payload["status"])
    if payload.get("lifecycle_status"):
        call.status = str(payload["lifecycle_status"])
    if payload.get("recording_url"):
        call.recording_url = str(payload["recording_url"])
    if payload.get("result"):
        call.result_json = json.dumps(payload["result"])
        summary = payload["result"].get("summary") if isinstance(payload["result"], dict) else ""
        if summary:
            call.summary = str(summary)
    call.updated_at = datetime.utcnow()
    call_repo.save(db, call)
