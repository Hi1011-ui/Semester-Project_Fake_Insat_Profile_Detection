import { AppLayout } from '../components/layout/AppLayout';
import { Topbar } from '../components/layout/Topbar';
import { Database, Table } from 'lucide-react';
import { SectionCard } from '../components/common/SectionCard';

const features = [
  { name: 'profile_pic', type: 'Binary', meaning: 'Whether a profile picture exists' },
  { name: 'nums/length username', type: 'Float', meaning: 'Numeric characters divided by username length' },
  { name: 'fullname words', type: 'Integer', meaning: 'Number of words in full name' },
  { name: 'nums/length fullname', type: 'Float', meaning: 'Numeric characters divided by full-name length' },
  { name: 'name==username', type: 'Binary', meaning: 'Whether full name equals username' },
  { name: 'description length', type: 'Integer', meaning: 'Character count of biography' },
  { name: 'external URL', type: 'Binary', meaning: 'Whether an external URL exists' },
  { name: 'private', type: 'Binary', meaning: 'Whether account is private' },
  { name: '#posts', type: 'Integer', meaning: 'Number of posts' },
  { name: '#followers', type: 'Integer', meaning: 'Number of followers' },
  { name: '#follows', type: 'Integer', meaning: 'Number of accounts followed' },
  { name: 'fake', type: 'Binary', meaning: 'Target label (0 = Real, 1 = Fake)' },
];

export default function DatasetInfoPage() {
  return (
    <AppLayout>
      <Topbar 
        title="Dataset Information" 
        subtitle="Details about the Hugging Face dataset used to train the Random Forest model."
        icon={<Database size={24} />}
      />
      
      <div className="p-8 max-w-[1000px] space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black text-primary-600 dark:text-primary-400 mb-1">5,000</div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Profiles</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black text-green-500 mb-1">2,500</div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Real Profiles (Class 0)</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black text-red-500 mb-1">2,500</div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Fake Profiles (Class 1)</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black text-amber-500 mb-1">11</div>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Input Features</div>
          </div>
        </div>

        <SectionCard title="Feature Dictionary" icon={<Table size={20} />}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Feature</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {features.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 text-sm font-mono text-primary-600 dark:text-primary-400">{f.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">{f.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{f.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </AppLayout>
  );
}
