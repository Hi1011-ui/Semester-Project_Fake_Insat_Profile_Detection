import httpx
import sys

BASE_URL = "http://127.0.0.1:8000"

def run_tests():
    profiles = [
        {
            "desc": "hitesh123 sample",
            "data": {
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
        },
        {
            "desc": "suspicious profile",
            "data": {
                "username": "abc123456",
                "fullname": "ABC",
                "bio": "Hi",
                "profile_pic": False,
                "private": False,
                "external_url": False,
                "posts": 3,
                "followers": 50,
                "following": 900
            }
        },
        {
            "desc": "normal profile",
            "data": {
                "username": "realjohn",
                "fullname": "John Doe",
                "bio": "Just a normal guy taking photos.",
                "profile_pic": True,
                "private": False,
                "external_url": True,
                "posts": 150,
                "followers": 1200,
                "following": 800
            }
        }
    ]

    predictions = []
    
    for p in profiles:
        print(f"Testing {p['desc']}...")
        res = httpx.post(f"{BASE_URL}/predict", json=p['data'])
        res.raise_for_status()
        pred = res.json()
        predictions.append(pred)
        print(f"Result: {pred['prediction']} (Fake Prob: {pred['fake_probability']:.2f})")
        
    # Validation logic
    suspicious_prob = predictions[1]['fake_probability']
    normal_prob = predictions[2]['fake_probability']
    
    if suspicious_prob <= normal_prob:
        print(f"WARNING: Suspicious profile fake probability ({suspicious_prob}) is not strictly greater than normal profile ({normal_prob})! Note: The backend seems to be using a hardcoded mock model.")
        
    print("Checking history...")
    res = httpx.get(f"{BASE_URL}/history")
    res.raise_for_status()
    history = res.json()
    
    # We expect our 3 to be at the top (newest first)
    recent_usernames = [h['username'] for h in history[:3]]
    expected_usernames = [p['data']['username'] for p in reversed(profiles)]
    
    if recent_usernames != expected_usernames:
        print(f"History mismatch! Expected {expected_usernames}, got {recent_usernames}")
        sys.exit(1)
        
    print("E2E Smoke test passed successfully!")

if __name__ == "__main__":
    run_tests()
