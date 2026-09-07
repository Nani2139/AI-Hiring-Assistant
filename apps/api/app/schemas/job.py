from pydantic import BaseModel


class JobIn(BaseModel):
    title: str
    jd_text: str
    questions: str = "interested, notice_period, current_ctc, expected_ctc, availability"
    agent_kind: str = "screener"


class JobOut(BaseModel):
    id: int
    title: str
    jd_text: str
    questions: str
    agent_id: str
    agent_kind: str

    class Config:
        from_attributes = True
