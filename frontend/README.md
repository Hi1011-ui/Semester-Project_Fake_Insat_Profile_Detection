# Fake Instagram Profile Detector - Frontend

This is the frontend-only React application for the "Fake Instagram Profile Detector" college semester project. It provides a visual dashboard for analyzing Instagram profile characteristics to detect fake accounts using machine learning.

## Technology Stack
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** `lucide-react`

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Backend Integration

Currently, this frontend runs using **mock data** to simulate the machine learning predictions. All areas displaying mock data are labeled with a "Demo Data" badge.

To connect this frontend to your live FastAPI backend once it is built:
1. Open `src/services/predictionService.ts`.
2. Replace the simulated `analyzeProfile` and `getHistory` methods with actual network calls using `fetch` or `axios` (e.g., `POST http://localhost:8000/predict`).
3. Ensure your backend returns JSON matching the exact shape defined in `API_CONTRACT.md`.
4. No other frontend components will need to change.

## Feature Engineering

Notice that the "Username Analysis" metrics are calculated live on the client side in real-time as the user types. This logic can be found in `src/utils/featureEngineering.ts`.

## UI Design
The UI is fully responsive, supporting both desktop side-by-side layouts and mobile stacked layouts, and includes built-in Light/Dark mode support (toggleable via the top right icon).
