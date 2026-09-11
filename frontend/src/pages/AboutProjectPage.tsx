import { AppLayout } from '../components/layout/AppLayout';
import { Topbar } from '../components/layout/Topbar';
import { Info, Code2, Database, LayoutTemplate, BrainCircuit } from 'lucide-react';
import { SectionCard } from '../components/common/SectionCard';

export default function AboutProjectPage() {
  return (
    <AppLayout>
      <Topbar 
        title="About Project" 
        subtitle="Learn more about the architecture and technologies used in this project."
        icon={<Info size={24} />}
      />
      
      <div className="p-8 max-w-[800px] space-y-8">
        
        <SectionCard title="Project Description" icon={<Info size={20} />}>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The Fake Instagram Profile Detector is a web-based machine-learning application that allows users to enter Instagram profile characteristics and receive a prediction indicating whether the profile is likely fake or likely real. This project demonstrates the complete AI/Data Science lifecycle from dataset analysis to model deployment.
          </p>
        </SectionCard>

        <SectionCard title="Technology Stack" icon={<Code2 size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
                <LayoutTemplate size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Frontend</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">React 18 + Vite, Tailwind CSS</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Code2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Backend</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Python + FastAPI</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Machine Learning</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Random Forest Classifier</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
              <div className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
                <Database size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Database</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">SQLite (History Storage)</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-6 rounded-r-2xl">
          <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mb-2">Important Limitation</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300/80 leading-relaxed">
            The application predicts from profile characteristics and does not access Instagram's private/internal systems. It should not be treated as a definitive verification of identity.
          </p>
        </div>

      </div>
    </AppLayout>
  );
}
