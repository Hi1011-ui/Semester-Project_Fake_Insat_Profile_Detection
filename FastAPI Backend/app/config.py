from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
TRAIN_ML_MODEL_DIR = BASE_DIR.parent / "Train ML Model"
MODEL_PATH = TRAIN_ML_MODEL_DIR / "models" / "fake_instagram_model.pkl"
METADATA_PATH = TRAIN_ML_MODEL_DIR / "models" / "model_metadata.json"
FEATURE_ENGINEERING_DIR = TRAIN_ML_MODEL_DIR / "scripts"

# Risk Thresholds
RISK_HIGH_THRESHOLD = 0.60
RISK_MEDIUM_THRESHOLD = 0.40
