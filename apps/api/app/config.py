from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    hunar_api_key: str = ""
    pdl_api_key: str = ""
    company_name: str = "guk.ai"
    demo_mode: bool = True
    safe_phone: str = ""
    database_url: str = "sqlite:///./data/app.db"
    webhook_base_url: str = "http://localhost:8000"
    cors_origins: str = "http://localhost:3000"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    ssl_verify: bool = True

    def origin_list(self) -> list[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]


settings = Settings()
