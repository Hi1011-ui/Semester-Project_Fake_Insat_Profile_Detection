# Frontend Change Log

Below is the exhaustive list of frontend files modified during the Stage 5 integration:

1. **`src/services/predictionService.ts`**:
   - Replaced mock `analyzeProfile` logic with a real `fetch` call to `POST /predict`.
   - Replaced `getHistory` mock return with a `fetch` call to `GET /history`.
   - Added logic to respect `VITE_USE_MOCK_DATA` flag.
   - Added AbortController for network timeouts (~15s) and user-friendly error translations.

2. **`src/pages/AnalyzeDashboardPage.tsx`**:
   - Injected CSS to hide the "Demo Data" badge when `isMockMode` is `false`.
   - Added an error banner to display API connection errors gracefully.
   - Handled empty `flagged_reasons` arrays by injecting a "No major risk indicators found" fallback locally.

3. **`src/pages/HistoryPage.tsx`**:
   - Migrated from hardcoded `mockHistory` to fetching dynamic data via `getHistory()` on mount.
   - Added loading spinners and error state handling.
   - Conditionally rendered the "Demo Data" badge based on `isMockMode`.

4. **New `.env` Files**:
   - `.env.development`
   - `.env.example`
