from pydantic import BaseModel


class PersonIn(BaseModel):
    job_id: int
    name: str
    title: str = ""
    company: str = ""
    location: str = ""
    email: str = ""
    phone: str = ""
    linkedin: str = ""
    source: str = "manual"


class PersonOut(BaseModel):
    id: int
    job_id: int
    name: str
    title: str
    company: str
    location: str
    email: str
    phone: str
    linkedin: str
    source: str

    class Config:
        from_attributes = True


class SearchIn(BaseModel):
    jd_text: str
    job_id: int | None = None
