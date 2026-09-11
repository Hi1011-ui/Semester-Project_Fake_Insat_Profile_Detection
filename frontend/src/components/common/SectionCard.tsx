
interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  subtitle,
  icon,
  iconBgColor = 'bg-primary-50 dark:bg-primary-600/20',
  iconTextColor = 'text-primary-600 dark:text-primary-400',
  children,
  className = '',
}: SectionCardProps) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <div className="w-full h-px bg-slate-100 dark:bg-slate-700 mb-6" />
      <div>{children}</div>
    </div>
  );
}
