# Stage 4: Persists to SQLite via SQLite Database/database.py
# The public interface (add_prediction / get_history) is unchanged,
# so main.py and predictor.py do not need to change.

import sys
import logging
import pathlib
from typing import List
from app.schemas import HistoryItem
from app.config import RISK_HIGH_THRESHOLD, RISK_MEDIUM_THRESHOLD
from datetime import datetime

logger = logging.getLogger(__name__)

# Add SQLite Database to path
backend_dir = pathlib.Path(__file__).resolve().parent.parent
project_root = backend_dir.parent
sqlite_dir = project_root / "SQLite Database"
sys.path.insert(0, str(sqlite_dir))

import database

def add_prediction(username: str, prediction: str, fake_probability: float) -> HistoryItem:
    real_probability = 1.0 - fake_probability
    confidence = max(fake_probability, real_probability)
    
    if fake_probability >= RISK_HIGH_THRESHOLD:
        risk_level = "High"
    elif fake_probability >= RISK_MEDIUM_THRESHOLD:
        risk_level = "Medium"
    else:
        risk_level = "Low"
        
    created_at = datetime.utcnow().isoformat() + "Z"
    new_id = 0
    try:
        new_id = database.add_prediction(
            username=username,
            prediction=prediction,
            fake_probability=fake_probability,
            real_probability=real_probability,
            confidence=confidence,
            risk_level=risk_level,
            created_at=created_at
        )
    except Exception as e:
        logger.error(f"Failed to add prediction to database: {e}")
        
    return HistoryItem(
        id=new_id,
        username=username,
        prediction=prediction,
        fake_probability=fake_probability,
        created_at=created_at
    )

def get_history() -> List[HistoryItem]:
    try:
        rows = database.get_history(limit=100)
        return [
            HistoryItem(
                id=row["id"],
                username=row["username"],
                prediction=row["prediction"],
                fake_probability=row["fake_probability"],
                created_at=row["created_at"]
            )
            for row in rows
        ]
    except Exception as e:
        logger.error(f"Failed to fetch history from database: {e}")
        return []
