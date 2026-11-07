# FastAPI Backend (Stage 3)

This directory contains the backend for the Fake Instagram Profile Detector.

## Run Server

```bash
uvicorn app.main:app --reload
```

## Endpoints

- `GET /`
- `GET /health`
- `POST /predict`
- `GET /history`

See `/docs` for the Swagger UI after starting the server.

*Note: The `/history` endpoint is currently in-memory-only. Stage 4 will replace this with a real SQLite-backed predictions table.*
