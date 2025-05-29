import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import HRlyticsLanding from './components/HRlyticsLanding';
import Dashboard from './components/Dashboard';
import Overview from './components/dashboard/Overview';
import PerformanceInsights from './components/dashboard/PerformanceInsights';
import ReportGenerator from './components/reports/ReportGenerator';
import Settings from './components/settings/Settings';
import OrganizationImport from './components/organization/OrganizationImport';
import Chatbot from './components/chatbot/Chatbot';
import ThemeToggle from './components/ThemeToggle';
import SplashScreen from './components/SplashScreen';
import FAQ from './components/FAQ';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <button
        onClick={handleSignOut}
        className="fixed top-4 right-4 z-[100] px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Sign Out
      </button>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <DataProvider>
          {showSplash && <SplashScreen />}
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              <Route path="/" element={<HRlyticsLanding />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/dashboard"
                element={
                  <AuthWrapper>
                    <Dashboard />
                  </AuthWrapper>
                }
              >
                <Route index element={<Overview />} />
                <Route path="performance" element={<PerformanceInsights />} />
                <Route path="reports" element={<ReportGenerator />} />
                <Route path="settings" element={<Settings />} />
                <Route path="organization" element={<OrganizationImport />} />
              </Route>
            </Routes>
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
              <ThemeToggle />
              <Chatbot />
            </div>
          </div>
        </DataProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 