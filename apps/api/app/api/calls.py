from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.schemas.call import CallIn, CallOut, FollowupIn
from app.services import call_service, inbox_service

router = APIRouter(tags=["calls"])


@router.post("/calls", response_model=CallOut)
def start_call(body: CallIn, db: Session = Depends(get_db)):
    try:
        call = call_service.start_call(db, body.job_id, body.person_id, body.phone)
    except (ValueError, RuntimeError, Exception) as err:
        raise HTTPException(400, str(err)) from err
    rows = inbox_service.list_inbox(db)
    return next(row for row in rows if row["id"] == call.id)


@router.post("/calls/followup", response_model=CallOut)
def send_followup(body: FollowupIn, db: Session = Depends(get_db)):
    try:
        call = call_service.send_followup(db, body.call_id)
    except (ValueError, RuntimeError) as err:
        raise HTTPException(400, str(err)) from err
    rows = inbox_service.list_inbox(db)
    return next(row for row in rows if row["id"] == call.id)
