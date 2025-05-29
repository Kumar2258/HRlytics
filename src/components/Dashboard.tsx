import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  Settings as SettingsIcon,
  Clock,
  TrendingUp,
  Brain,
  Phone,
  Heart,
  MessageSquare,
  UserCheck,
  CalendarCheck,
  LineChart,
  X
} from 'lucide-react';
import DatePicker from './common/DatePicker';
import Filter from './common/Filter';
import FilterPanel from './dashboard/FilterPanel';
import Overview from './dashboard/Overview';
import PerformanceInsights from './dashboard/PerformanceInsights';
import EmployeeTable from './dashboard/EmployeeTable';
import ThemeToggle from './ThemeToggle';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const navigation = [
    { 
      name: 'Overview', 
      path: '/dashboard', 
      icon: LayoutDashboard,
      onClick: () => navigate('/dashboard')
    },
    {
      name: 'Employee Management',
      path: '/dashboard/employees',
      icon: Users,
      subItems: [
        { name: 'Employee Directory', path: '/dashboard/employees/directory' },
        { name: 'Attendance Monitoring', path: '/dashboard/employees/attendance' },
        { name: 'Leave Management', path: '/dashboard/employees/leave' }
      ]
    },
    {
      name: 'Performance',
      path: '/dashboard/performance',
      icon: TrendingUp,
      subItems: [
        { name: 'Performance Tracking', path: '/dashboard/performance/tracking' },
        { name: 'Team Analytics', path: '/dashboard/performance/team-analytics' },
        { name: 'Attrition Prediction', path: '/dashboard/performance/attrition' }
      ]
    },
    {
      name: 'AI Analytics',
      path: '/dashboard/ai-analytics',
      icon: Brain,
      subItems: [
        { name: 'Call Quality Analysis', path: '/dashboard/ai-analytics/call-quality' },
        { name: 'Sentiment Analysis', path: '/dashboard/ai-analytics/sentiment' },
        { name: 'Performance Forecasting', path: '/dashboard/ai-analytics/forecasting' }
      ]
    },
    {
      name: 'Reports',
      path: '/dashboard/reports',
      icon: FileText,
      subItems: [
        { name: 'Custom Reports', path: '/dashboard/reports/custom' },
        { name: 'Analytics Export', path: '/dashboard/reports/export' },
        { name: 'Scheduled Reports', path: '/dashboard/reports/scheduled' }
      ]
    },
    { 
      name: 'Settings', 
      path: '/dashboard/settings', 
      icon: SettingsIcon 
    }
  ];

  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const filterOptions = [
    { id: 'department', label: 'Department' },
    { id: 'status', label: 'Status' },
    { id: 'role', label: 'Role' },
    { id: 'location', label: 'Location' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
              HRlytics
            </Link>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              const isExpanded = expandedItem === item.name;

              return (
                <div key={item.name}>
                  {item.subItems ? (
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1 text-left">{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{item.name}</span>
                    </Link>
                  )}
                  
                  {item.subItems && isExpanded && (
                    <div className="mt-1 ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                            location.pathname === subItem.path
                              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">
          {/* Top bar with date picker and filters */}
          <div className="mb-6 flex justify-end gap-4">
            <DatePicker
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
              placeholder="Select date range"
            />
            <Filter
              options={filterOptions}
              selectedOptions={selectedFilters}
              onChange={setSelectedFilters}
              placeholder="Filter data"
            />
          </div>
          <Outlet />
        </div>
      </main>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        {isChatOpen ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 h-96 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Chat messages would go here */}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 