import sqlite3
import os
import pathlib
from datetime import datetime

# Resolve the database path, allowing an environment variable override for tests
DB_PATH = os.environ.get("FPD_DB_PATH", str(pathlib.Path(__file__).parent / "predictions.db"))
SCHEMA_PATH = pathlib.Path(__file__).parent / "schema.sql"

_db_initialized = False

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Enable foreign keys and other pragmas if needed
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db() -> None:
    """Idempotent: creates the table/index if missing."""
    global _db_initialized
    conn = get_connection()
    try:
        with conn:
            with open(SCHEMA_PATH, 'r') as f:
                conn.executescript(f.read())
    finally:
        conn.close()
    _db_initialized = True

def _ensure_initialized():
    if not _db_initialized:
        init_db()

def add_prediction(username: str, prediction: str, fake_probability: float, 
                   real_probability: float, confidence: float, risk_level: str, 
                   created_at: str = None) -> int:
    """Inserts one row and returns the new row's id."""
    _ensure_initialized()
    if created_at is None:
        from datetime import datetime, timezone
        created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        
    conn = get_connection()
    try:
        with conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO predictions 
                (username, prediction, fake_probability, real_probability, confidence, risk_level, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (username, prediction, fake_probability, real_probability, confidence, risk_level, created_at))
            return cursor.lastrowid
    finally:
        conn.close()

def get_history(limit: int = 100) -> list[dict]:
    """Most recent first. Returns EXACTLY the HistoryItem keys."""
    _ensure_initialized()
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, username, prediction, fake_probability, created_at
            FROM predictions
            ORDER BY created_at DESC
            LIMIT ?
        ''', (limit,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()
