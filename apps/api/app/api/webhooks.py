from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db import get_db
from app.services import webhook_service

router = APIRouter(prefix="/webhooks/hunar", tags=["webhooks"])


@router.post("/status")
@router.post("/recording")
@router.post("/result")
@router.post("/summary")
async def hunar_hook(request: Request, db: Session = Depends(get_db)):
    payload = await request.json()
    webhook_service.save_event(db, payload)
    return {"ok": True}
