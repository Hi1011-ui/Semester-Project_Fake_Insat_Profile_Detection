import type { ProfileFormData, PredictionResult, FlagReason } from '../types';
import { usernameNumericRatio } from '../utils/featureEngineering';

export async function analyzeProfile(input: ProfileFormData): Promise<PredictionResult> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

  // TODO: replace with real POST /predict call once backend is ready.

  // --- MOCK LOGIC ---
  let fakeScore = 0;
  const reasons: FlagReason[] = [];

  const digitRatio = usernameNumericRatio(input.username);
  if (digitRatio > 0.4) {
    fakeScore += 30;
    reasons.push({ label: `High username digit ratio (${(digitRatio * 100).toFixed(1)}%)`, riskLevel: 'High' });
  }

  if (input.followers > 0) {
    const followingRatio = input.following / input.followers;
    if (followingRatio > 10) {
      fakeScore += 40;
      reasons.push({ label: `High following to follower ratio (${followingRatio.toFixed(2)})`, riskLevel: 'High' });
    }
  }

  if (!input.profile_pic) {
    fakeScore += 20;
    reasons.push({ label: 'No profile picture', riskLevel: 'Medium' });
  }

  if (input.posts < 5) {
    fakeScore += 10;
    reasons.push({ label: `Low number of posts (${input.posts})`, riskLevel: 'Low' });
  }

  let prediction: "Likely Fake" | "Likely Real" | "Uncertain" = "Uncertain";
  let riskLevel: "High" | "Medium" | "Low" = "Medium";
  
  // Normalize score between 0 and 100 for percentage
  const fakeProb = Math.min(100, Math.max(0, fakeScore + Math.random() * 10)); // Add some randomness
  const realProb = 100 - fakeProb;

  if (fakeProb >= 60) {
    prediction = "Likely Fake";
    riskLevel = "High";
  } else if (fakeProb < 40) {
    prediction = "Likely Real";
    riskLevel = "Low";
  }

  return {
    prediction,
    fake_probability: fakeProb / 100,
    real_probability: realProb / 100,
    confidence: Math.max(fakeProb, realProb) / 100,
    risk_level: riskLevel,
    flagged_reasons: reasons,
  };
}
