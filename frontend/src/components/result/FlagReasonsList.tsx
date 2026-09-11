import { Lightbulb } from 'lucide-react';
import type { FlagReason } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

export function FlagReasonsList({ reasons }: { reasons: FlagReason[] }) {
  return (
    <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-xl text-amber-600 dark:text-amber-400">
          <Lightbulb size={20} />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">Why This Profile Was Flagged?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Key indicators that contributed to this prediction:</p>
        </div>
      </div>
      <ul className="space-y-3 mt-4 pl-2">
        {reasons.map((reason, idx) => {
          let dotColor = 'bg-amber-500';
          if (reason.riskLevel === 'High') dotColor = 'bg-red-500';
          if (reason.riskLevel === 'Low') dotColor = 'bg-green-500';
          
          return (
            <li key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{reason.label}</span>
              </div>
              <RiskBadge level={`${reason.riskLevel} Risk`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
