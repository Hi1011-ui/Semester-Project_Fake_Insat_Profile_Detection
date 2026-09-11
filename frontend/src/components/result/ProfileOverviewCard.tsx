import { User } from 'lucide-react';

export function ProfileOverviewCard({ profile }: { profile: any }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center shrink-0">
        <User size={32} className="text-slate-400 dark:text-slate-500" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">@{profile.username || 'username'}</h4>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{profile.fullname || 'Full Name'}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 max-w-md">
          {profile.bio || 'No biography provided.'}
        </p>
      </div>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <div className="text-center">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{profile.posts}</div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{profile.followers}</div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{profile.following}</div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Following</div>
        </div>
      </div>
    </div>
  );
}
