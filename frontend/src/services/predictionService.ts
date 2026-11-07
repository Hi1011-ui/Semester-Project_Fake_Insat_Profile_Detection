import type { ProfileFormData, PredictionResult, FlagReason, HistoryItem } from '../types';
import { usernameNumericRatio } from '../utils/featureEngineering';

export const isMockMode = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function analyzeProfile(input: ProfileFormData): Promise<PredictionResult> {
  if (isMockMode) {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

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
    
    const fakeProb = Math.min(100, Math.max(0, fakeScore + Math.random() * 10));
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...input,
        posts: Number(input.posts),
        followers: Number(input.followers),
        following: Number(input.following),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      if (response.status === 422) {
        const errorData = await response.json();
        throw new Error(`Validation Error: ${JSON.stringify(errorData.detail)}`);
      }
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (
      typeof data.prediction !== 'string' ||
      typeof data.fake_probability !== 'number' ||
      typeof data.real_probability !== 'number' ||
      typeof data.confidence !== 'number' ||
      typeof data.risk_level !== 'string' ||
      !Array.isArray(data.flagged_reasons)
    ) {
      throw new Error('API Contract Violation: Unexpected response shape.');
    }

    return data as PredictionResult;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error("Unable to connect to prediction server. Please try again.");
    } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error("Unable to connect to prediction server. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  if (isMockMode) {
    const { mockHistory } = await import('../data/mockData');
    return mockHistory;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${API_BASE_URL}/history`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('API Contract Violation: Expected an array for history.');
    }
    
    return data as HistoryItem[];
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error("Unable to connect to prediction server. Please try again.");
    } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error("Unable to connect to prediction server. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
