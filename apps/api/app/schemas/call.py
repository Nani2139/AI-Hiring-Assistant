from pydantic import BaseModel


class CallIn(BaseModel):
    job_id: int
    person_id: int
    phone: str = ""


class CallOut(BaseModel):
    id: int
    job_id: int
    person_id: int
    hunar_call_id: str
    request_id: str
    channel: str
    status: str
    phone: str
    recording_url: str
    result_json: str
    summary: str
    person_name: str = ""
    job_title: str = ""

    class Config:
        from_attributes = True


class FollowupIn(BaseModel):
    call_id: int
