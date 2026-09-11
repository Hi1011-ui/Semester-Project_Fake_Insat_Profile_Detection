# API Contract

This document defines the exact request/response JSON shapes for the backend API of the "Fake Instagram Profile Detector". The frontend relies on these types, and `frontend/src/services/predictionService.ts` is the only file that will need modification to connect to the live backend once implemented.

## 1. POST `/predict`

**Description:** Evaluates an Instagram profile based on input features and returns a fake/real prediction with confidence scores and flagged indicators.

**Request Body (JSON):**
```json
{
  "username": "string",
  "fullname": "string",
  "bio": "string",
  "profile_pic": true,
  "private": false,
  "external_url": false,
  "posts": 0,
  "followers": 0,
  "following": 0
}
```

**Response Body (JSON):**
```json
{
  "prediction": "Likely Fake" | "Likely Real" | "Uncertain",
  "fake_probability": 0.84,
  "real_probability": 0.16,
  "confidence": 0.84,
  "risk_level": "High" | "Medium" | "Low",
  "flagged_reasons": [
    {
      "label": "string",
      "riskLevel": "High" | "Medium" | "Low"
    }
  ]
}
```

## 2. GET `/history`

**Description:** Returns previously stored predictions from the SQLite database.

**Response Body (JSON):**
```json
[
  {
    "id": 1,
    "username": "demo123",
    "prediction": "Likely Fake",
    "fake_probability": 0.84,
    "created_at": "2026-09-10T20:15:00"
  }
]
```

## Integration Instructions

Currently, the application uses mock data. To integrate the real API:
1. Open `frontend/src/services/predictionService.ts`.
2. Replace the simulated `analyzeProfile` and `getHistory` methods with `fetch()` or `axios` calls to your FastAPI server (`http://localhost:8000/predict` and `http://localhost:8000/history`).
3. No other frontend components need to be changed as long as the backend output matches the JSON shapes above.
