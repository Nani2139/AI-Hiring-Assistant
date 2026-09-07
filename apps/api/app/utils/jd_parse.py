import re

SKILLS = [
    "langgraph",
    "langchain",
    "mcp",
    "rag",
    "embeddings",
    "vector search",
    "fastapi",
    "python",
    "django",
    "flask",
    "react",
    "next.js",
    "typescript",
    "javascript",
    "node",
    "java",
    "sql",
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "sales",
    "recruiting",
]

CITIES = {
    "bangalore": ("bengaluru", "india"),
    "bengaluru": ("bengaluru", "india"),
    "mumbai": ("mumbai", "india"),
    "delhi": ("delhi", "india"),
    "hyderabad": ("hyderabad", "india"),
    "pune": ("pune", "india"),
    "chennai": ("chennai", "india"),
    "india": ("", "india"),
}


def parse_jd(jd_text: str) -> dict:
    text = jd_text or ""
    lower = text.lower()
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    title = lines[0][:120] if lines else "Software Engineer"
    title = re.sub(r"location:.*", "", title, flags=re.I).strip() or "Software Engineer"

    skills = [word for word in SKILLS if word in lower][:8]

    city = ""
    country = ""
    loc_match = re.search(
        r"\b(bangalore|bengaluru|mumbai|delhi|hyderabad|pune|chennai|india)\b",
        lower,
    )
    if loc_match:
        city, country = CITIES[loc_match.group(1)]

    return {
        "title": title,
        "skills": skills,
        "location": city or country,
        "city": city,
        "country": country,
    }
