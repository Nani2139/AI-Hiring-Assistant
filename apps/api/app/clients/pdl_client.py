import httpx

from app.config import settings

BASE = "https://api.peopledatalabs.com/v5/person/search"


def search_people(title: str, location: str, skills: list[str], city: str = "", country: str = "") -> list[dict]:
    if not settings.pdl_api_key:
        return []

    title_text = _job_title(title)
    city = city or location
    country = country or ("india" if city in {"bengaluru", "mumbai", "delhi", "hyderabad", "pune", "chennai"} else "")
    queries = [
        _query(title_text, city, country, skills[:3]),
        _query(title_text, city, country, skills[:1]),
        _query(title_text, "", country or "india" if country or city else "", []),
    ]
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": settings.pdl_api_key,
    }
    found = []
    with httpx.Client(timeout=40, verify=settings.ssl_verify) as client:
        for query in queries:
            res = client.post(BASE, headers=headers, json={"size": 8, "query": query})
            if res.status_code == 404:
                continue
            res.raise_for_status()
            found = res.json().get("data") or []
            if found:
                break

    rows = []
    for item in found:
        name = item.get("full_name") or " ".join(
            part for part in [item.get("first_name"), item.get("last_name")] if part
        )
        linkedin = item.get("linkedin_url") or ""
        if linkedin and not linkedin.startswith("http"):
            linkedin = "https://" + linkedin
        email = item.get("work_email")
        rows.append(
            {
                "name": (name or "Unknown").title(),
                "title": _text(item.get("job_title")),
                "company": _text(item.get("job_company_name")),
                "location": _place(item),
                "email": email if isinstance(email, str) else "",
                "phone": "",
                "linkedin": linkedin,
                "source": "pdl",
            }
        )
    return rows


def _query(title: str, city: str, country: str, skills: list[str]) -> dict:
    must = [{"match": {"job_title": title}}]
    if city:
        must.append({"match": {"location_locality": city}})
    if country:
        must.append({"term": {"location_country": country}})
    for skill in skills:
        must.append({"match": {"skills": skill}})
    return {"bool": {"must": must}}


def _job_title(title: str) -> str:
    lower = (title or "").lower()
    if "engineer" in lower:
        return "software engineer"
    if "sales" in lower:
        return "sales"
    return title or "software engineer"


def _place(item: dict) -> str:
    parts = [_text(item.get("location_locality")), _text(item.get("location_region")), _text(item.get("location_country"))]
    return ", ".join(part for part in parts if part)


def _text(value) -> str:
    return value if isinstance(value, str) else ""
