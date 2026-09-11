import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type RiskLevel = 'High' | 'Medium' | 'Low' | 'High Risk' | 'Medium Risk' | 'Low Risk';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const isHigh = level.startsWith('High');
  const isMedium = level.startsWith('Medium');
  const isLow = level.startsWith('Low');

  return (
    <span
      className={twMerge(
        clsx(
          'px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap',
          {
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': isHigh,
            'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': isMedium,
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': isLow,
          }
        ),
        className
      )}
    >
      {level}
    </span>
  );
}
