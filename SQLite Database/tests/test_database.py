import pytest
import os
import tempfile
import pathlib
import sys
import sqlite3

# Insert the SQLite Database path so we can import database.py
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))
import database

@pytest.fixture(autouse=True)
def setup_db(monkeypatch):
    fd, path = tempfile.mkstemp(suffix='.db')
    os.close(fd)
    
    monkeypatch.setenv("FPD_DB_PATH", path)
    database.DB_PATH = path
    database._db_initialized = False # Force re-init for tests
    
    yield path
    
    os.unlink(path)

def test_add_and_get_history():
    # Insert multiple records
    id1 = database.add_prediction(
        username="test_user1",
        prediction="Likely Real",
        fake_probability=0.2,
        real_probability=0.8,
        confidence=0.8,
        risk_level="Low",
        created_at="2023-01-01T12:00:00Z"
    )
    
    id2 = database.add_prediction(
        username="o'brien\"; DROP TABLE predictions;--",
        prediction="Likely Fake",
        fake_probability=0.9,
        real_probability=0.1,
        confidence=0.9,
        risk_level="High",
        created_at="2023-01-02T12:00:00Z"
    )
    
    assert id1 > 0
    assert id2 > id1
    
    history = database.get_history(limit=10)
    assert len(history) == 2
    
    # Check newest first
    assert history[0]['username'] == "o'brien\"; DROP TABLE predictions;--"
    assert history[0]['prediction'] == "Likely Fake"
    assert history[0]['fake_probability'] == 0.9
    
    assert history[1]['username'] == "test_user1"

def test_get_history_limit():
    for i in range(5):
        database.add_prediction(
            username=f"user_{i}",
            prediction="Likely Real",
            fake_probability=0.1,
            real_probability=0.9,
            confidence=0.9,
            risk_level="Low"
        )
    
    history = database.get_history(limit=3)
    assert len(history) == 3

def test_invalid_risk_level():
    with pytest.raises(sqlite3.IntegrityError):
        database.add_prediction(
            username="test_user",
            prediction="Likely Fake",
            fake_probability=0.9,
            real_probability=0.1,
            confidence=0.9,
            risk_level="InvalidRisk"
        )

def test_invalid_probability():
    with pytest.raises(sqlite3.IntegrityError):
        database.add_prediction(
            username="test_user",
            prediction="Likely Fake",
            fake_probability=1.5,
            real_probability=0.1,
            confidence=0.9,
            risk_level="High"
        )
