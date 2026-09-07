def send_followup(name: str, phone: str, job_title: str) -> dict:
    return {
        "ok": True,
        "channel": "whatsapp",
        "to": phone,
        "text": f"Hi {name}, this is guk.ai following up on {job_title}. Reply YES if you can talk.",
        "reply": "YES, please call tomorrow morning.",
    }
