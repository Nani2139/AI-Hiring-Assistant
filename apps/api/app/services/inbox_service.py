from sqlalchemy.orm import Session

from app.repos import call_repo, job_repo, person_repo
from app.services import call_service


def list_inbox(db: Session) -> list[dict]:
    rows = []
    for call in call_repo.list_all(db):
        try:
            call = call_service.refresh_call(db, call)
        except Exception as err:
            print("call refresh failed:", err)
        person = person_repo.get(db, call.person_id)
        job = job_repo.get(db, call.job_id)
        rows.append(
            {
                "id": call.id,
                "job_id": call.job_id,
                "person_id": call.person_id,
                "hunar_call_id": call.hunar_call_id,
                "request_id": call.request_id,
                "channel": call.channel,
                "status": call.status,
                "phone": call.phone,
                "recording_url": call.recording_url,
                "result_json": call.result_json,
                "summary": call.summary,
                "person_name": person.name if person else "",
                "job_title": job.title if job else "",
            }
        )
    return rows
