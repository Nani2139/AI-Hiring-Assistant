from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class Call(Base):
    __tablename__ = "calls"

    id: Mapped[int] = mapped_column(primary_key=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id"))
    person_id: Mapped[int] = mapped_column(ForeignKey("people.id"))
    hunar_call_id: Mapped[str] = mapped_column(String(80), default="")
    request_id: Mapped[str] = mapped_column(String(80), default="")
    channel: Mapped[str] = mapped_column(String(20), default="voice")
    status: Mapped[str] = mapped_column(String(40), default="QUEUED")
    phone: Mapped[str] = mapped_column(String(40), default="")
    recording_url: Mapped[str] = mapped_column(String(500), default="")
    result_json: Mapped[str] = mapped_column(Text, default="{}")
    summary: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    job = relationship("Job", back_populates="calls")
    person = relationship("Person", back_populates="calls")
