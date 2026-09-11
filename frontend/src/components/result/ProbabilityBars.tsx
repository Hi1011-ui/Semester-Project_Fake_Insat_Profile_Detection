import { UserX, UserCheck } from 'lucide-react';

export function ProbabilityBars({ fakeProb, realProb }: { fakeProb: number, realProb: number }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-20 text-sm font-bold text-slate-700 dark:text-slate-300">
          <UserX size={16} className="text-red-500" />
          Fake
        </div>
        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 transition-all duration-1000 ease-out rounded-full" 
            style={{ width: `${fakeProb * 100}%` }}
          />
        </div>
        <div className="w-12 text-right text-sm font-bold text-slate-700 dark:text-slate-300">
          {Math.round(fakeProb * 100)}%
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-20 text-sm font-bold text-slate-700 dark:text-slate-300">
          <UserCheck size={16} className="text-green-500" />
          Real
        </div>
        <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-1000 ease-out rounded-full" 
            style={{ width: `${realProb * 100}%` }}
          />
        </div>
        <div className="w-12 text-right text-sm font-bold text-slate-700 dark:text-slate-300">
          {Math.round(realProb * 100)}%
        </div>
      </div>
    </div>
  );
}
