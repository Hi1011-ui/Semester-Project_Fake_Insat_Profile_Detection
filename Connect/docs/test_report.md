# Test Report

## PRD Test Matrix

| # | Test Scenario | Result | Notes |
| :--- | :--- | :--- | :--- |
| 1 | Normal profile | **PASS** | `POST /predict` returns prediction JSON. History reflects the entry. |
| 2 | Many username digits | **PASS** | `POST /predict` returns prediction. Backend handles the string correctly. |
| 3 | No profile picture | **PASS** | Handled seamlessly; boolean `false` correctly mapped by backend. |
| 4 | Extremely high following | **PASS** | Processed without issue. |
| 5 | Very low activity | **PASS** | Handled correctly. |
| 6 | Private account | **PASS** | Boolean correctly sent. |
| 7 | Negative followers | **PASS** | Rejected by frontend validation; backend correctly responds with 422 if forced. |
| 8 | Empty username | **PASS** | Rejected by frontend input validation; API validation correctly guards it. |
| 9 | Backend unavailable | **PASS** | Yields friendly UI error `"Unable to connect to prediction server. Please try again."` |
| 10 | Multiple predictions | **PASS** | Repeated calls successfully create chronological entries in `/history` page. |

