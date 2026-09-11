import { SectionCard } from '../common/SectionCard';
import { Settings, Image as ImageIcon, Lock, Link as LinkIcon } from 'lucide-react';

interface AccountSettingsProps {
  profile_pic: boolean;
  private_account: boolean;
  external_url: boolean;
  onChange: (field: string, value: boolean) => void;
}

const RadioRow = ({ label, icon, value, field, onChange }: { label: string, icon: React.ReactNode, value: boolean, field: string, onChange: (field: string, value: boolean) => void }) => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
      <div className="text-primary-500">{icon}</div>
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
          checked={value === true}
          onChange={() => onChange(field, true)}
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">Yes</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
          checked={value === false}
          onChange={() => onChange(field, false)}
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">No</span>
      </label>
    </div>
  </div>
);

export function AccountSettingsSection({ profile_pic, private_account, external_url, onChange }: AccountSettingsProps) {

  return (
    <SectionCard title="Account Settings" icon={<Settings size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RadioRow label="Profile Picture Available?" icon={<ImageIcon size={16} />} value={profile_pic} field="profile_pic" onChange={onChange} />
        <RadioRow label="Is Private Account?" icon={<Lock size={16} />} value={private_account} field="private" onChange={onChange} />
        <RadioRow label="External URL (Website)?" icon={<LinkIcon size={16} />} value={external_url} field="external_url" onChange={onChange} />
      </div>
    </SectionCard>
  );
}
