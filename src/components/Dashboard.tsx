import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import FilterPanel from './dashboard/FilterPanel';
import Overview from './dashboard/Overview';
import PerformanceInsights from './dashboard/PerformanceInsights';
import EmployeeTable from './dashboard/EmployeeTable';
import ThemeToggle from './ThemeToggle';

const Dashboard: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Performance', path: '/dashboard/performance', icon: BarChart2 },
    { name: 'Reports', path: '/dashboard/reports', icon: FileText },
    { name: 'Organization', path: '/dashboard/organization', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">HRlytics</h1>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 