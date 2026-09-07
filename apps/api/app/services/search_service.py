from sqlalchemy.orm import Session

from app.clients import pdl_client
from app.models.person import Person
from app.repos import person_repo
from app.utils.jd_parse import parse_jd


def search_people(jd_text: str) -> list[dict]:
    parsed = parse_jd(jd_text)
    try:
        rows = pdl_client.search_people(
            parsed["title"],
            parsed["location"],
            parsed["skills"],
            parsed.get("city") or "",
            parsed.get("country") or "",
        )
    except Exception as err:
        print("pdl search failed:", err)
        rows = []
    return rows


def save_shortlist(db: Session, job_id: int, people: list[dict]) -> list[Person]:
    saved = []
    for item in people:
        person = Person(
            job_id=job_id,
            name=item.get("name") or "Unknown",
            title=item.get("title") or "",
            company=item.get("company") or "",
            location=item.get("location") or "",
            email=item.get("email") or "",
            phone=item.get("phone") or "",
            linkedin=item.get("linkedin") or "",
            source=item.get("source") or "pdl",
        )
        saved.append(person_repo.add(db, person))
    return saved


def add_person(db: Session, data: dict) -> Person:
    existing = person_repo.get_by_phone(db, data["job_id"], data.get("phone") or "")
    if existing:
        existing.name = data.get("name") or existing.name
        return person_repo.add(db, existing)
    person = Person(**data)
    return person_repo.add(db, person)


def list_people(db: Session, job_id: int) -> list[Person]:
    return person_repo.list_for_job(db, job_id)
