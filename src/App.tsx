import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/UserContext';
import HRlyticsLanding from './components/HRlyticsLanding';
import Dashboard from './components/Dashboard';
import Overview from './components/dashboard/Overview';
import UserProfile from './components/dashboard/UserProfile';
import EmployeeDirectory from './components/dashboard/employees/EmployeeDirectory';
import AttendanceMonitoring from './components/dashboard/employees/AttendanceMonitoring';
import LeaveManagement from './components/dashboard/employees/LeaveManagement';
import PerformanceTracking from './components/dashboard/performance/PerformanceTracking';
import TeamAnalytics from './components/dashboard/performance/TeamAnalytics';
import AttritionPrediction from './components/dashboard/performance/AttritionPrediction';
import CallQualityAnalysis from './components/dashboard/ai-analytics/CallQualityAnalysis';
import SentimentAnalysis from './components/dashboard/ai-analytics/SentimentAnalysis';
import PerformanceForecasting from './components/dashboard/ai-analytics/PerformanceForecasting';
import CustomReports from './components/dashboard/reports/CustomReports';
import AnalyticsExport from './components/dashboard/reports/AnalyticsExport';
import ScheduledReports from './components/dashboard/reports/ScheduledReports';
import Settings from './components/settings/Settings';
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

  if (!isAuthenticated) return null;

  return <>{children}</>;
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
          <UserProvider>
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
                  <Route path="profile" element={<UserProfile />} />
                  
                  {/* Employee Management Routes */}
                  <Route path="employees">
                    <Route path="directory" element={<EmployeeDirectory />} />
                    <Route path="attendance" element={<AttendanceMonitoring />} />
                    <Route path="leave" element={<LeaveManagement />} />
                  </Route>

                  {/* Performance Routes */}
                  <Route path="performance">
                    <Route path="tracking" element={<PerformanceTracking />} />
                    <Route path="team-analytics" element={<TeamAnalytics />} />
                    <Route path="attrition" element={<AttritionPrediction />} />
                  </Route>

                  {/* AI Analytics Routes */}
                  <Route path="ai-analytics">
                    <Route path="call-quality" element={<CallQualityAnalysis />} />
                    <Route path="sentiment" element={<SentimentAnalysis />} />
                    <Route path="forecasting" element={<PerformanceForecasting />} />
                  </Route>

                  {/* Reports Routes */}
                  <Route path="reports">
                    <Route path="custom" element={<CustomReports />} />
                    <Route path="export" element={<AnalyticsExport />} />
                    <Route path="scheduled" element={<ScheduledReports />} />
                  </Route>

                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </div>
          </UserProvider>
        </DataProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 