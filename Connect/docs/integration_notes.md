# Integration Notes

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant React Frontend
    participant FastAPI Backend
    participant SQLite Database
    
    User->>React Frontend: Submits Profile Info
    React Frontend->>FastAPI Backend: POST /predict (Raw Profile)
    FastAPI Backend->>FastAPI Backend: Feature Engineering & Model Inference
    FastAPI Backend->>SQLite Database: INSERT INTO predictions
    SQLite Database-->>FastAPI Backend: Success
    FastAPI Backend-->>React Frontend: PredictionResponse JSON
    React Frontend-->>User: Displays Results
    
    User->>React Frontend: Visits History Page
    React Frontend->>FastAPI Backend: GET /history
    FastAPI Backend->>SQLite Database: SELECT * FROM predictions
    SQLite Database-->>FastAPI Backend: Rows
    FastAPI Backend-->>React Frontend: HistoryItem[] JSON
    React Frontend-->>User: Displays History Table
```

## Environment Variables
The frontend uses the following environment variables (stored in `.env.development`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | The base URL for the FastAPI backend. |
| `VITE_USE_MOCK_DATA` | `false` | Set to `true` to run the frontend entirely in mock mode without the backend. |

## Switching Mock / Real Mode
To test the application without a running backend:
1. Open `.env.development` (or create `.env.local`).
2. Set `VITE_USE_MOCK_DATA=true`.
3. Restart the Vite dev server (`npm run dev`).
The app will display the "Demo Data" badge and use hardcoded offline data.
