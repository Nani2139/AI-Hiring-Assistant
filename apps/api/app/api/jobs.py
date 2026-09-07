from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.job import JobIn, JobOut
from app.schemas.person import PersonIn, PersonOut
from app.services import job_service, search_service

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("", response_model=JobOut)
def create_job(body: JobIn, db: Session = Depends(get_db)):
    return job_service.create_job(db, body.title, body.jd_text, body.questions, body.agent_kind)


@router.get("", response_model=list[JobOut])
def list_jobs(db: Session = Depends(get_db)):
    return job_service.list_jobs(db)


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = job_service.get_job(db, job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return job


@router.get("/{job_id}/people", response_model=list[PersonOut])
def list_people(job_id: int, db: Session = Depends(get_db)):
    return search_service.list_people(db, job_id)


@router.post("/{job_id}/people", response_model=PersonOut)
def add_person(job_id: int, body: PersonIn, db: Session = Depends(get_db)):
    data = body.model_dump()
    data["job_id"] = job_id
    return search_service.add_person(db, data)
