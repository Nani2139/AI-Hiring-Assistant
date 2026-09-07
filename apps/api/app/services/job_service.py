from sqlalchemy.orm import Session

from app.models.job import Job
from app.repos import job_repo


def create_job(db: Session, title: str, jd_text: str, questions: str, agent_kind: str) -> Job:
    job = Job(
        title=title.strip(),
        jd_text=jd_text.strip(),
        questions=questions.strip(),
        agent_kind=agent_kind or "screener",
    )
    return job_repo.add(db, job)


def get_job(db: Session, job_id: int) -> Job | None:
    return job_repo.get(db, job_id)


def list_jobs(db: Session) -> list[Job]:
    return job_repo.list_all(db)
