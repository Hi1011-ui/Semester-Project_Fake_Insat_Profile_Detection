import { SectionCard } from '../common/SectionCard';
import { BarChart3 } from 'lucide-react';

export function ModelConfidenceCard({ confidence }: { confidence: number | null }) {
  const confPercent = confidence !== null ? Math.round(confidence * 100) : 0;
  
  return (
    <SectionCard 
      title="Model Confidence" 
      subtitle="The model is highly confident in this prediction." 
      icon={<BarChart3 size={20} />}
      className="h-full flex flex-col"
    >
      <div className="flex-1 flex flex-col justify-center mt-2">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-out rounded-full" 
              style={{ width: `${confPercent}%` }}
            />
          </div>
          <div className="w-12 text-right text-xl font-black text-slate-800 dark:text-slate-100">
            {confPercent}%
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
