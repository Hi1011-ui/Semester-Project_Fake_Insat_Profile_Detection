import { AppLayout } from '../components/layout/AppLayout';
import { Topbar } from '../components/layout/Topbar';
import { History, Search } from 'lucide-react';
import { mockHistory } from '../data/mockData';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { RiskBadge } from '../components/common/RiskBadge';

export default function HistoryPage() {
  return (
    <AppLayout>
      <Topbar 
        title="Analysis History" 
        subtitle="Review previously analyzed profiles and their predictions."
        icon={<History size={24} />}
      />
      
      <div className="p-8 max-w-[1200px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Recent Predictions</h2>
          <DemoDataBadge />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          {mockHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Prediction</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fake Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {mockHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        @{item.username}
                      </td>
                      <td className="px-6 py-4">
                        <RiskBadge 
                          level={item.prediction === 'Likely Fake' ? 'High Risk' : item.prediction === 'Likely Real' ? 'Low Risk' : 'Medium Risk'} 
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full max-w-[100px] overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${item.fake_probability > 0.6 ? 'bg-red-500' : item.fake_probability < 0.4 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${item.fake_probability * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            {Math.round(item.fake_probability * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 dark:text-slate-500">
              <Search size={48} className="mb-4 opacity-50" />
              <p>No history found.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
