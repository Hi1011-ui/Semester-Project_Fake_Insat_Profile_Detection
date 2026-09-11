import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Database, Server, Layout, Search, BrainCircuit } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 selection:bg-primary-200 dark:selection:bg-primary-900">
      
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">◎</span>
          </div>
          <span className="font-bold text-xl text-slate-800 dark:text-white">Profile Detector</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-[1200px] mx-auto px-8 pb-20">
        
        {/* Hero Section */}
        <section className="py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6 border border-primary-100 dark:border-primary-800">
            <Sparkles size={16} />
            <span>AI-Powered Detection</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white tracking-tight mb-6 max-w-3xl leading-tight">
            Identify Fake Instagram Profiles with Machine Learning
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl">
            A simple, educational tool that analyzes profile characteristics and predicts whether an account is likely real or fake.
          </p>
          
          <button
            onClick={() => navigate('/analyze')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary-500/30 hover:scale-105 active:scale-95"
          >
            Start Analysis
            <ArrowRight size={20} />
          </button>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center relative">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. Profile Data</h3>
              <p className="text-slate-600 dark:text-slate-400">Enter basic public metrics like followers, posts, and username characteristics.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center relative mt-0 md:mt-8">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">2. ML Model</h3>
              <p className="text-slate-600 dark:text-slate-400">Our Random Forest model processes the features based on 5,000+ learned profiles.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center relative mt-0 md:mt-16">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">3. Prediction</h3>
              <p className="text-slate-600 dark:text-slate-400">Get an instant probability score indicating if the account is real or fake.</p>
            </div>
          </div>
        </section>

        {/* Tech Overview Section */}
        <section className="py-16 mt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-medium">
                <Layout className="text-blue-500" size={20} />
                React + Vite
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-medium">
                <Server className="text-emerald-500" size={20} />
                FastAPI
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-medium">
                <BrainCircuit className="text-purple-500" size={20} />
                Random Forest
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 font-medium">
                <Database className="text-slate-500" size={20} />
                SQLite
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
