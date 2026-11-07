CREATE TABLE IF NOT EXISTS predictions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    username         TEXT    NOT NULL,
    prediction       TEXT    NOT NULL,
    fake_probability REAL    NOT NULL CHECK (fake_probability BETWEEN 0 AND 1),
    real_probability REAL    NOT NULL CHECK (real_probability BETWEEN 0 AND 1),
    confidence       REAL    NOT NULL CHECK (confidence BETWEEN 0 AND 1),
    risk_level       TEXT    NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High')),
    created_at       TEXT    NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions (created_at DESC);
