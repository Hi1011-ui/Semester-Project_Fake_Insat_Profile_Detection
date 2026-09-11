import { ShieldAlert } from 'lucide-react';

export function DisclaimerNoteCard() {
  return (
    <div className="h-full bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800/50 flex gap-4">
      <div className="p-2 h-fit bg-green-100 dark:bg-green-900/50 rounded-xl text-green-600 dark:text-green-400 shrink-0">
        <ShieldAlert size={20} />
      </div>
      <div>
        <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Note</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          This tool uses machine learning and publicly available profile information. Results are predictions and may not be 100% accurate.
        </p>
      </div>
    </div>
  );
}
