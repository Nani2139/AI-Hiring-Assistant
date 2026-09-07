from sqlalchemy.orm import Session

from app.models.person import Person


def add(db: Session, person: Person) -> Person:
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


def get(db: Session, person_id: int) -> Person | None:
    return db.get(Person, person_id)


def list_for_job(db: Session, job_id: int) -> list[Person]:
    return db.query(Person).filter(Person.job_id == job_id).order_by(Person.id.desc()).all()


def get_by_phone(db: Session, job_id: int, phone: str) -> Person | None:
    return (
        db.query(Person)
        .filter(Person.job_id == job_id, Person.phone == phone)
        .first()
    )
