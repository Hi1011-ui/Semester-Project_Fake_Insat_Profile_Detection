import { ThemeToggle } from '../common/ThemeToggle';

interface TopbarProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function Topbar({ title, subtitle, icon }: TopbarProps) {
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-transparent">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
