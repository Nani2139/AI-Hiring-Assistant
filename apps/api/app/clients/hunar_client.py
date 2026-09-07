import httpx

from app.config import settings

BASE = "https://api.voice.hunar.ai/external/v1"


def _headers() -> dict:
    return {
        "X-API-Key": settings.hunar_api_key,
        "Content-Type": "application/json",
    }


def list_agents() -> dict:
    with httpx.Client(timeout=30, verify=settings.ssl_verify) as client:
        res = client.get(f"{BASE}/agents/", headers=_headers())
        res.raise_for_status()
        return res.json()


def start_call(agent_id: str, callee_name: str, mobile_number: str, custom_data: dict, request_id: str) -> dict:
    body = {
        "agent_id": agent_id,
        "callee_name": callee_name,
        "mobile_number": mobile_number,
        "custom_data": custom_data,
        "request_id": request_id,
        "retry_config": {"max_retry_count": 0, "retry_interval_hours": 0},
    }
    if settings.webhook_base_url.startswith("https://"):
        body["callback_config"] = {
            "call_status_callback_url": f"{settings.webhook_base_url}/webhooks/hunar/status",
            "call_recording_callback_url": f"{settings.webhook_base_url}/webhooks/hunar/recording",
            "call_result_callback_url": f"{settings.webhook_base_url}/webhooks/hunar/result",
            "call_summary_callback_url": f"{settings.webhook_base_url}/webhooks/hunar/summary",
        }
    with httpx.Client(timeout=30, verify=settings.ssl_verify) as client:
        res = client.post(f"{BASE}/calls/", headers=_headers(), json=body)
        if res.is_error:
            raise RuntimeError(_error_text(res))
        return res.json()


def _error_text(res: httpx.Response) -> str:
    try:
        data = res.json()
        return str(data.get("message") or data)
    except Exception:
        return res.text or f"Hunar error {res.status_code}"


def get_call(call_id: str) -> dict:
    with httpx.Client(timeout=30, verify=settings.ssl_verify) as client:
        res = client.get(f"{BASE}/calls/{call_id}/", headers=_headers())
        res.raise_for_status()
        return res.json()

