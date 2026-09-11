import { SectionCard } from '../common/SectionCard';
import { IconInput } from '../common/IconInput';
import { User, AtSign, AlignLeft } from 'lucide-react';

interface BasicInformationProps {
  username: string;
  fullname: string;
  bio: string;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function BasicInformationSection({ username, fullname, bio, onChange, errors = {} }: BasicInformationProps) {
  return (
    <SectionCard title="Basic Information" icon={<User size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <IconInput
          label="Username *"
          icon={<AtSign size={18} />}
          placeholder="e.g. john_12345"
          value={username}
          onChange={(e) => onChange('username', e.target.value)}
          error={errors.username}
        />
        <IconInput
          label="Full Name *"
          icon={<User size={18} />}
          placeholder="e.g. John Doe"
          value={fullname}
          onChange={(e) => onChange('fullname', e.target.value)}
          error={errors.fullname}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bio</label>
        <div className="relative">
          <AlignLeft size={18} className="absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
          <textarea
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none h-24"
            placeholder="Profile biography..."
            value={bio}
            onChange={(e) => onChange('bio', e.target.value)}
            maxLength={150}
          />
          <div className="absolute bottom-2 right-3 text-xs text-slate-400">
            {bio.length}/150
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
