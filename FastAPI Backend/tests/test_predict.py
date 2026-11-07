from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_predict_sample_profile():
    # The hand-crafted profile from Stage 2
    payload = {
        "username": "hitesh123",
        "fullname": "Hitesh Chaudhari",
        "bio": "Data science student",
        "profile_pic": True,
        "private": False,
        "external_url": False,
        "posts": 42,
        "followers": 350,
        "following": 800
    }
    
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert "prediction" in data
    assert "fake_probability" in data
    assert "real_probability" in data
    assert "confidence" in data
    assert "risk_level" in data
    assert "flagged_reasons" in data
    
    # Check probabilities sum to ~1.0
    assert abs(data["fake_probability"] + data["real_probability"] - 1.0) < 1e-5
