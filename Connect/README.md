# Stage 5: React + Backend Integration

This folder contains the scripts, test suites, and documentation generated while seamlessly tying the React UI to the FastAPI ML backend.

## Instructions to Run End-to-End

You will need two terminal windows:

### Terminal 1: Backend Server
1. Navigate to the project root.
2. Run `Connect\scripts\start_backend.bat`
   *(This will activate the virtual environment and host the API on `127.0.0.1:8000`)*

### Terminal 2: Frontend Server
1. Navigate to the project root.
2. Run `Connect\scripts\start_frontend.bat`
   *(This will start Vite dev server, typically on `http://localhost:5173`)*

**Important:** You must open `http://localhost:5173` in your browser. Using `http://127.0.0.1:5173` will trigger CORS errors as they are treated as distinct origins.

## Disconnecting Backend (Mock Mode)
If you wish to view the frontend isolated from the backend service:
1. Open `frontend/.env.development`.
2. Change `VITE_USE_MOCK_DATA=false` to `VITE_USE_MOCK_DATA=true`.
3. Restart the frontend server. The UI will instantly revert to local simulated analytics and display "Demo Data" badges.
