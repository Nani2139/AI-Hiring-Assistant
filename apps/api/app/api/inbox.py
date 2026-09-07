from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import get_db
from app.services import inbox_service

router = APIRouter(prefix="/inbox", tags=["inbox"])


@router.get("")
def list_inbox(db: Session = Depends(get_db)):
    return inbox_service.list_inbox(db)
