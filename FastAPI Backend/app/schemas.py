from pydantic import BaseModel, Field
from typing import List

class ProfileInput(BaseModel):
    username: str
    fullname: str
    bio: str
    profile_pic: bool
    private: bool
    external_url: bool
    posts: int = Field(ge=0)
    followers: int = Field(ge=0)
    following: int = Field(ge=0)

class FlagReason(BaseModel):
    label: str
    riskLevel: str

class PredictionResponse(BaseModel):
    prediction: str
    fake_probability: float
    real_probability: float
    confidence: float
    risk_level: str
    flagged_reasons: List[FlagReason]

class HistoryItem(BaseModel):
    id: int
    username: str
    prediction: str
    fake_probability: float
    created_at: str
