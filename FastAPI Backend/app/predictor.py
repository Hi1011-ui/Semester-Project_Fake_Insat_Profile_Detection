import sys
import json
import joblib
from app.config import MODEL_PATH, METADATA_PATH, FEATURE_ENGINEERING_DIR, RISK_HIGH_THRESHOLD, RISK_MEDIUM_THRESHOLD
from app.schemas import ProfileInput, PredictionResponse, FlagReason

sys.path.insert(0, str(FEATURE_ENGINEERING_DIR))
from feature_engineering import build_feature_vector

# Load model and metadata at startup
print(f"Loading metadata from {METADATA_PATH}...")
try:
    with open(METADATA_PATH, 'r') as f:
        metadata = json.load(f)
    feature_order = metadata['features']
    print(f"Loaded feature order: {feature_order}")
except Exception as e:
    print(f"Failed to load metadata: {e}")
    feature_order = []

print(f"Loading model from {MODEL_PATH}...")
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
    MODEL_LOADED = True
except Exception as e:
    print(f"Failed to load model: {e}")
    MODEL_LOADED = False

def generate_flagged_reasons(profile: ProfileInput) -> list[FlagReason]:
    reasons = []
    
    # Following-to-follower ratio
    followers = max(profile.followers, 1)
    ratio = profile.following / followers
    if ratio > 3:
        reasons.append(FlagReason(label=f"Very high following/follower ratio ({ratio:.1f})", riskLevel="High"))
    elif ratio > 1.5:
        reasons.append(FlagReason(label=f"High following/follower ratio ({ratio:.1f})", riskLevel="Medium"))
        
    # Low post count
    if profile.posts < 5:
        reasons.append(FlagReason(label=f"Very low post count ({profile.posts})", riskLevel="High"))
    elif profile.posts < 15:
        reasons.append(FlagReason(label=f"Low post count ({profile.posts})", riskLevel="Medium"))
        
    # High username digit ratio
    if len(profile.username) > 0:
        digit_ratio = sum(c.isdigit() for c in profile.username) / len(profile.username)
        if digit_ratio > 0.5:
            reasons.append(FlagReason(label=f"Many numbers in username ({digit_ratio:.0%})", riskLevel="High"))
        elif digit_ratio > 0.3:
            reasons.append(FlagReason(label=f"Some numbers in username ({digit_ratio:.0%})", riskLevel="Medium"))
            
    # No profile picture
    if not profile.profile_pic:
        reasons.append(FlagReason(label="No profile picture", riskLevel="Medium"))
        
    return reasons

def predict_profile(profile: ProfileInput) -> PredictionResponse:
    if not MODEL_LOADED:
        raise RuntimeError("Model is not loaded.")
        
    # Build vector
    profile_dict = profile.model_dump()
    vector = build_feature_vector(profile_dict, feature_order)
    
    # Predict
    probabilities = model.predict_proba([vector])[0]
    real_prob = probabilities[0]
    fake_prob = probabilities[1]
    
    confidence = max(real_prob, fake_prob)
    
    # Derive risk and prediction
    if fake_prob >= RISK_HIGH_THRESHOLD:
        risk_level = "High"
        prediction = "Likely Fake"
    elif fake_prob >= RISK_MEDIUM_THRESHOLD:
        risk_level = "Medium"
        prediction = "Uncertain"
    else:
        risk_level = "Low"
        prediction = "Likely Real"
        
    flagged_reasons = generate_flagged_reasons(profile)
    
    return PredictionResponse(
        prediction=prediction,
        fake_probability=float(fake_prob),
        real_probability=float(real_prob),
        confidence=float(confidence),
        risk_level=risk_level,
        flagged_reasons=flagged_reasons
    )
