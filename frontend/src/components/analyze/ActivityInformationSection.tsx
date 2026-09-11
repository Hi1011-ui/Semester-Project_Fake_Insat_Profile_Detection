import { SectionCard } from '../common/SectionCard';
import { IconInput } from '../common/IconInput';
import { Activity, Image as ImageIcon, Users, UserPlus } from 'lucide-react';

interface ActivityInformationProps {
  posts: number;
  followers: number;
  following: number;
  onChange: (field: string, value: number) => void;
  errors?: Record<string, string>;
}

export function ActivityInformationSection({ posts, followers, following, onChange, errors = {} }: ActivityInformationProps) {
  const handleNumberChange = (field: string, val: string) => {
    const num = parseInt(val, 10);
    onChange(field, isNaN(num) ? 0 : num);
  };

  return (
    <SectionCard title="Activity Information" icon={<Activity size={20} />}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IconInput
          type="number"
          min="0"
          label="Number of Posts"
          icon={<ImageIcon size={18} />}
          value={posts.toString()}
          onChange={(e) => handleNumberChange('posts', e.target.value)}
          error={errors.posts}
        />
        <IconInput
          type="number"
          min="0"
          label="Number of Followers"
          icon={<Users size={18} />}
          value={followers.toString()}
          onChange={(e) => handleNumberChange('followers', e.target.value)}
          error={errors.followers}
        />
        <IconInput
          type="number"
          min="0"
          label="Number of Following"
          icon={<UserPlus size={18} />}
          value={following.toString()}
          onChange={(e) => handleNumberChange('following', e.target.value)}
          error={errors.following}
        />
      </div>
    </SectionCard>
  );
}
