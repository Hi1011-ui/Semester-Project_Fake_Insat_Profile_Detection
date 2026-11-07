@echo off
cd "%~dp0..\.."
call .venv\Scripts\activate.bat
cd "FastAPI Backend"
uvicorn app.main:app --host 127.0.0.1 --port 8000
