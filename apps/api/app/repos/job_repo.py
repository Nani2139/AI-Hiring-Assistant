from sqlalchemy.orm import Session

from app.models.job import Job


def add(db: Session, job: Job) -> Job:
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def get(db: Session, job_id: int) -> Job | None:
    return db.get(Job, job_id)


def list_all(db: Session) -> list[Job]:
    return db.query(Job).order_by(Job.id.desc()).all()


def save(db: Session, job: Job) -> Job:
    db.add(job)
    db.commit()
    db.refresh(job)
    return job
