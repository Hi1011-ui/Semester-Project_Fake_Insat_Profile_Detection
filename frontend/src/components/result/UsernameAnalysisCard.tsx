import { SectionCard } from '../common/SectionCard';
import { AtSign, Type, Hash, Percent } from 'lucide-react';
import { usernameDigitCount, usernameNumericRatio } from '../../utils/featureEngineering';
import { StatBox } from '../common/StatBox';

export function UsernameAnalysisCard({ username }: { username: string }) {
  const length = username ? username.length : 0;
  const digits = usernameDigitCount(username);
  const ratio = usernameNumericRatio(username);

  return (
    <SectionCard 
      title="Username Analysis" 
      subtitle="Derived features from the username (calculated automatically)." 
      icon={<AtSign size={20} />}
      className="h-full"
    >
      <div className="grid grid-cols-3 gap-3">
        <StatBox 
          label="characters" 
          value={length} 
          icon={<Type size={16} />} 
        />
        <StatBox 
          label="numbers" 
          value={digits} 
          icon={<Hash size={16} />} 
        />
        <StatBox 
          label={`(${digits}/${length || 0})`} 
          value={`${Math.round(ratio * 100)}%`} 
          icon={<Percent size={16} />} 
        />
      </div>
    </SectionCard>
  );
}
