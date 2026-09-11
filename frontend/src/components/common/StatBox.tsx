
interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function StatBox({ label, value, icon }: StatBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
      {icon && <div className="text-primary-500 mb-1">{icon}</div>}
      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</span>
    </div>
  );
}
