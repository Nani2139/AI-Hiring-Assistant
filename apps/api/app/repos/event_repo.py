from sqlalchemy.orm import Session

from app.models.event import Event


def add(db: Session, event: Event) -> Event:
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def seen(db: Session, event_type: str, call_id: str) -> bool:
    row = (
        db.query(Event)
        .filter(Event.event_type == event_type, Event.call_id == call_id)
        .first()
    )
    return row is not None
