import httpx
import sys

BASE_URL = "http://127.0.0.1:8000"

def check_contract():
    print("Testing GET /")
    res = httpx.get(f"{BASE_URL}/")
    res.raise_for_status()
    print("GET / passed")

    print("Testing GET /health")
    res = httpx.get(f"{BASE_URL}/health")
    res.raise_for_status()
    health_data = res.json()
    assert "status" in health_data
    assert "model_loaded" in health_data
    print("GET /health passed")

    print("Testing POST /predict")
    payload = {
        "username": "demo123",
        "fullname": "Demo User",
        "bio": "Hello everyone",
        "profile_pic": True,
        "private": False,
        "external_url": False,
        "posts": 20,
        "followers": 150,
        "following": 650
    }
    res = httpx.post(f"{BASE_URL}/predict", json=payload)
    res.raise_for_status()
    predict_data = res.json()
    
    assert "prediction" in predict_data
    assert isinstance(predict_data["prediction"], str)
    assert "fake_probability" in predict_data
    assert isinstance(predict_data["fake_probability"], float)
    assert "real_probability" in predict_data
    assert isinstance(predict_data["real_probability"], float)
    assert "confidence" in predict_data
    assert isinstance(predict_data["confidence"], float)
    assert "risk_level" in predict_data
    assert isinstance(predict_data["risk_level"], str)
    assert "flagged_reasons" in predict_data
    assert isinstance(predict_data["flagged_reasons"], list)
    
    for reason in predict_data["flagged_reasons"]:
        assert "label" in reason
        assert isinstance(reason["label"], str)
        assert "riskLevel" in reason
        assert isinstance(reason["riskLevel"], str)
        
    print("POST /predict passed")

    print("Testing GET /history")
    res = httpx.get(f"{BASE_URL}/history")
    res.raise_for_status()
    history_data = res.json()
    
    assert isinstance(history_data, list)
    if len(history_data) > 0:
        item = history_data[0]
        assert "id" in item
        assert isinstance(item["id"], int)
        assert "username" in item
        assert isinstance(item["username"], str)
        assert "prediction" in item
        assert isinstance(item["prediction"], str)
        assert "fake_probability" in item
        assert isinstance(item["fake_probability"], float)
        assert "created_at" in item
        assert isinstance(item["created_at"], str)
        
    print("GET /history passed")
    print("All contract checks passed!")

if __name__ == "__main__":
    check_contract()
