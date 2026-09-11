export interface ProfileFormData {
  username: string;
  fullname: string;
  bio: string;
  profile_pic: boolean;
  private: boolean;
  external_url: boolean;
  posts: number;
  followers: number;
  following: number;
}

export interface FlagReason {
  label: string;
  riskLevel: "High" | "Medium" | "Low";
}

export interface PredictionResult {
  prediction: "Likely Fake" | "Likely Real" | "Uncertain";
  fake_probability: number;   // 0-1
  real_probability: number;   // 0-1
  confidence: number;         // 0-1
  risk_level: "Low" | "Medium" | "High";
  flagged_reasons: FlagReason[];
}

export interface HistoryItem {
  id: number;
  username: string;
  prediction: string;
  fake_probability: number;
  created_at: string;
}
