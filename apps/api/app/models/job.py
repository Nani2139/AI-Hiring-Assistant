from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    jd_text: Mapped[str] = mapped_column(Text)
    questions: Mapped[str] = mapped_column(Text, default="")
    agent_id: Mapped[str] = mapped_column(String(80), default="")
    agent_kind: Mapped[str] = mapped_column(String(20), default="screener")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    people = relationship("Person", back_populates="job")
    calls = relationship("Call", back_populates="job")
