from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ProfileInput, PredictionResponse, HistoryItem
from app.predictor import predict_profile, MODEL_LOADED
from app.history_store import add_prediction, get_history
from typing import List

app = FastAPI(title="Fake Instagram Profile Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "API is running"}

@app.get("/health")
def read_health():
    return {
        "status": "healthy" if MODEL_LOADED else "unhealthy",
        "model_loaded": MODEL_LOADED
    }

@app.post("/predict", response_model=PredictionResponse)
def predict(profile: ProfileInput):
    try:
        result = predict_profile(profile)
        # Log to history
        add_prediction(
            username=profile.username,
            prediction=result.prediction,
            fake_probability=result.fake_probability
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history", response_model=List[HistoryItem])
def history():
    return get_history()
