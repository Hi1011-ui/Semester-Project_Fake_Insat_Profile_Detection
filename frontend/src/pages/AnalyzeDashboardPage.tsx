import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Topbar } from '../components/layout/Topbar';
import { ProfileForm } from '../components/analyze/ProfileForm';
import { ResultSummaryCard } from '../components/result/ResultSummaryCard';
import { UsernameAnalysisCard } from '../components/result/UsernameAnalysisCard';
import { ModelConfidenceCard } from '../components/result/ModelConfidenceCard';
import { DisclaimerNoteCard } from '../components/result/DisclaimerNoteCard';
import { Search, AlertCircle } from 'lucide-react';
import type { ProfileFormData, PredictionResult } from '../types';
import { analyzeProfile } from '../services/predictionService';

export default function AnalyzeDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [profileData, setProfileData] = useState<ProfileFormData | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string>(''); // For live username stats
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setErrorMsg(null);
    setProfileData(data);
    try {
      const res = await analyzeProfile(data);
      if (res.flagged_reasons.length === 0) {
        res.flagged_reasons = [{ label: "No major risk indicators found", riskLevel: "Low" }];
      }
      setResult(res);
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Topbar 
        title="Analyze Instagram Profile" 
        subtitle="Enter the profile details below to detect whether the Instagram account is real or fake using our ML model."
        icon={<Search size={24} />}
      />

      
      <div className="p-8 space-y-8 max-w-[1400px]">
        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Top 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.5fr_1fr] gap-8">
          
          {/* Left Column: Form */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-slate-800 dark:text-slate-100">
              <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                <Search size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Profile Information</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enter the Instagram profile details to get started.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              {/* Note: We capture username changes bubbling up or we can pass a callback to ProfileForm to capture live username */}
              <div onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.name === 'username' || target.placeholder === 'e.g. john_12345') {
                   setCurrentUsername(target.value);
                }
              }}>
                <ProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="flex flex-col">
            <ResultSummaryCard result={result} profileData={profileData} />
          </div>
        </div>

        {/* Bottom 3 Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UsernameAnalysisCard username={currentUsername || (profileData?.username || '')} />
          <ModelConfidenceCard confidence={result?.confidence || null} />
          <DisclaimerNoteCard />
        </div>
      </div>
    </AppLayout>
  );
}
