import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import AnalyzeDashboardPage from './pages/AnalyzeDashboardPage';
import HistoryPage from './pages/HistoryPage';
import DatasetInfoPage from './pages/DatasetInfoPage';
import AboutProjectPage from './pages/AboutProjectPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzeDashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/dataset" element={<DatasetInfoPage />} />
            <Route path="/about" element={<AboutProjectPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
