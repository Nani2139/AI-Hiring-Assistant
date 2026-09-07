from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import calls, inbox, jobs, search, webhooks
from app.config import settings
from app.db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="guk.ai Recruiter OS")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origin_list(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(jobs.router)
app.include_router(search.router)
app.include_router(calls.router)
app.include_router(inbox.router)
app.include_router(webhooks.router)


@app.get("/health")
def health():
    return {
        "ok": True,
        "company": settings.company_name,
        "demo_mode": settings.demo_mode,
    }
