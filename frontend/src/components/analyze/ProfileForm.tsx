import { useState } from 'react';
import { BasicInformationSection } from './BasicInformationSection';
import { AccountSettingsSection } from './AccountSettingsSection';
import { ActivityInformationSection } from './ActivityInformationSection';
import type { ProfileFormData } from '../../types';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  isLoading: boolean;
}

export function ProfileForm({ onSubmit, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    fullname: '',
    bio: '',
    profile_pic: true,
    private: false,
    external_url: false,
    posts: 0,
    followers: 0,
    following: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (formData.posts < 0) newErrors.posts = 'Cannot be negative';
    if (formData.followers < 0) newErrors.followers = 'Cannot be negative';
    if (formData.following < 0) newErrors.following = 'Cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <BasicInformationSection
        username={formData.username}
        fullname={formData.fullname}
        bio={formData.bio}
        onChange={handleChange}
        errors={errors}
      />
      <AccountSettingsSection
        profile_pic={formData.profile_pic}
        private_account={formData.private}
        external_url={formData.external_url}
        onChange={handleChange}
      />
      <ActivityInformationSection
        posts={formData.posts}
        followers={formData.followers}
        following={formData.following}
        onChange={handleChange}
        errors={errors}
      />
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary-500/30 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Analyze Profile
            <ArrowRight size={20} className="ml-1" />
          </>
        )}
      </button>
    </form>
  );
}
