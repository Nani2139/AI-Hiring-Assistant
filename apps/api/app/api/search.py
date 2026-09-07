from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.person import PersonOut, SearchIn
from app.services import search_service
from app.utils.jd_parse import parse_jd

router = APIRouter(prefix="/search", tags=["search"])


@router.post("/people")
def search_people(body: SearchIn):
    people = search_service.search_people(body.jd_text)
    source = people[0]["source"] if people else "none"
    return {"people": people, "parsed": parse_jd(body.jd_text), "source": source}


@router.post("/shortlist", response_model=list[PersonOut])
def save_shortlist(body: dict, db: Session = Depends(get_db)):
    job_id = int(body.get("job_id"))
    people = body.get("people") or []
    return search_service.save_shortlist(db, job_id, people)
