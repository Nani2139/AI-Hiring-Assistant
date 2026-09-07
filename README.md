# guk.ai Hire

Hiring portal: jobs, people search, voice screens, and an inbox.

- Web: Next.js, TypeScript, React
- API: Python FastAPI
- Keys stay in env files. Never commit them.

## Local setup

### API

```
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy ..\..\.env.example .env
```

Put real keys only in `apps/api/.env`:

- `HUNAR_API_KEY`
- `PDL_API_KEY`
- `DEMO_MODE=false` for live voice screens
- `SAFE_PHONE` as `+91...`
- `SSL_VERIFY=false` only if your Windows Python hits SSL errors

```
uvicorn app.main:app --reload --port 8000
```

### Web

```
cd apps/web
copy .env.local.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## GitHub

Repo: https://github.com/Nani2139/AI-Hiring-Assistant

Remote `origin` is already set. You push yourself. From this folder:

```
git add .
git status
```

Confirm `.env` and `.env.local` are **not** listed. Then:

```
git commit -m "Initial commit: guk.ai hiring portal"
git branch -M main
git push -u origin main
```
