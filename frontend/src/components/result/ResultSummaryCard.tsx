import { SectionCard } from '../common/SectionCard';
import { BarChart3 } from 'lucide-react';
import type { PredictionResult } from '../../types';
import { ProbabilityGauge } from './ProbabilityGauge';
import { ProbabilityBars } from './ProbabilityBars';
import { ProfileOverviewCard } from './ProfileOverviewCard';
import { FlagReasonsList } from './FlagReasonsList';
import { DemoDataBadge } from '../common/DemoDataBadge';

interface ResultSummaryCardProps {
  result: PredictionResult | null;
  profileData: any; // Using any here for simplicity, could type with ProfileFormData
}

export function ResultSummaryCard({ result, profileData }: ResultSummaryCardProps) {
  if (!result) {
    return (
      <SectionCard 
        title="Analysis Result" 
        subtitle="Fill in the profile details and click Analyze to see results." 
        icon={<BarChart3 size={20} />}
      >
        <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          <BarChart3 size={48} className="mb-4 opacity-50" />
          <p>No profile analyzed yet.</p>
        </div>
      </SectionCard>
    );
  }

  const isFake = result.prediction === 'Likely Fake';
  const isReal = result.prediction === 'Likely Real';
  
  let alertBg = 'bg-amber-50 dark:bg-amber-900/20';
  let alertBorder = 'border-amber-200 dark:border-amber-800';
  let alertText = 'text-amber-800 dark:text-amber-300';
  
  if (isFake) {
    alertBg = 'bg-red-50 dark:bg-red-900/20';
    alertBorder = 'border-red-200 dark:border-red-800';
    alertText = 'text-red-800 dark:text-red-300';
  } else if (isReal) {
    alertBg = 'bg-green-50 dark:bg-green-900/20';
    alertBorder = 'border-green-200 dark:border-green-800';
    alertText = 'text-green-800 dark:text-green-300';
  }

  return (
    <SectionCard 
      title="Analysis Result" 
      subtitle="Our AI model has analyzed the profile and here are the results." 
      icon={<BarChart3 size={20} />}
    >
      <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
        <span className="text-xs italic text-primary-600 dark:text-primary-400">"Because a safer internet starts with awareness."</span>
        <DemoDataBadge />
      </div>

      <div className={`p-6 rounded-2xl border ${alertBg} ${alertBorder} flex items-center justify-between mb-8`}>
        <div>
          <div className={`text-2xl font-black mb-1 flex items-center gap-2 ${alertText}`}>
            <span className="text-3xl">⚠</span> {result.prediction.toUpperCase()}
          </div>
          <p className={`text-sm ${alertText} opacity-80`}>
            This profile shows a {isFake ? 'high' : isReal ? 'low' : 'medium'} probability of being fake.
          </p>
        </div>
        <ProbabilityGauge percentage={Math.round(result.fake_probability * 100)} colorClass={isFake ? 'text-red-500' : isReal ? 'text-green-500' : 'text-amber-500'} />
      </div>

      <ProbabilityBars fakeProb={result.fake_probability} realProb={result.real_probability} />
      
      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Profile Overview</h3>
        <ProfileOverviewCard profile={profileData} />
      </div>

      {result.flagged_reasons.length > 0 && (
        <div className="mt-8">
          <FlagReasonsList reasons={result.flagged_reasons} />
        </div>
      )}
    </SectionCard>
  );
}
