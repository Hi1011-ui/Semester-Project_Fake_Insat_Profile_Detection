import { NavLink } from 'react-router-dom';
import { Search, History, Database, Info, ShieldAlert } from 'lucide-react';

const navItems = [
  { path: '/analyze', label: 'Analyze Profile', icon: Search },
  { path: '/history', label: 'History', icon: History },
  { path: '/dataset', label: 'Dataset Info', icon: Database },
  { path: '/about', label: 'About Project', icon: Info },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
      {/* Logo & Title */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xl">◎</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 dark:text-white leading-tight">Fake Instagram<br/>Profile Detector</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Safer Social Media, Smarter AI</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom CTA Card */}
      <div className="p-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-3">
            <ShieldAlert size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Help make Instagram a safer place!</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detect fake profiles using Machine Learning</p>
        </div>
      </div>
    </aside>
  );
}
