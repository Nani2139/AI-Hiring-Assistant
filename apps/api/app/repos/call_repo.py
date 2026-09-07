from sqlalchemy.orm import Session

from app.models.call import Call


def add(db: Session, call: Call) -> Call:
    db.add(call)
    db.commit()
    db.refresh(call)
    return call


def get(db: Session, call_id: int) -> Call | None:
    return db.get(Call, call_id)


def get_by_hunar_id(db: Session, hunar_call_id: str) -> Call | None:
    return db.query(Call).filter(Call.hunar_call_id == hunar_call_id).first()


def list_all(db: Session) -> list[Call]:
    return db.query(Call).order_by(Call.id.desc()).all()


def save(db: Session, call: Call) -> Call:
    db.add(call)
    db.commit()
    db.refresh(call)
    return call
