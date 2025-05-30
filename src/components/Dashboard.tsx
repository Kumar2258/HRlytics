import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  ChevronDown,
  Menu,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  PlayCircle
} from 'lucide-react';
import DatePicker from './common/DatePicker';
import Filter from './common/Filter';
import FilterPanel from './dashboard/FilterPanel';
import Overview from './dashboard/Overview';
import PerformanceInsights from './dashboard/PerformanceInsights';
import EmployeeTable from './dashboard/EmployeeTable';
import ThemeToggle from './ThemeToggle';
import { useUser } from '../context/UserContext';
import Chatbot from './Chatbot';

const HRlyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="url(#paint0_linear)"/>
    <path d="M13 7H11V13H17V11H13V7Z" fill="url(#paint1_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB"/>
        <stop offset="1" stopColor="#4F46E5"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="11" y1="10" x2="17" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB"/>
        <stop offset="1" stopColor="#4F46E5"/>
      </linearGradient>
    </defs>
  </svg>
);

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { userInfo } = useUser();

  // Function to check if we're on the profile page
  const isProfilePage = location.pathname === '/dashboard/profile';

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
      icon: SettingsIcon,
      onClick: () => navigate('/dashboard/settings')
    }
  ];

  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const filterOptions = [
    { id: 'department', label: 'Department' },
    { id: 'status', label: 'Status' },
    { id: 'role', label: 'Role' },
    { id: 'location', label: 'Location' }
  ];

  const sidebarVariants = {
    expanded: { 
      width: '17.5rem',
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    collapsed: { 
      width: '5.5rem',
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  const contentVariants = {
    expanded: { 
      marginLeft: '18.5rem',
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    collapsed: { 
      marginLeft: '6.5rem',
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Floating Sidebar */}
      <motion.aside
        initial="expanded"
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="fixed inset-y-4 left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 flex flex-col overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4">
          <AnimatePresence mode="wait">
            {!isSidebarCollapsed ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <Link to="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HRlytics
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <Link to="/dashboard" className="flex items-center justify-center" title="HRlytics">
                  <HRlyticsIcon />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Navigation Divider */}
        <div className="px-4 py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {navigation.map((item, index) => {
            const isActive = item.path === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.path + '/') || location.pathname === item.path;
            const isExpanded = expandedItem === item.name;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.subItems ? (
                  <>
                    <motion.button
                      onClick={() => {
                        if (isSidebarCollapsed) {
                          setIsSidebarCollapsed(false);
                          setTimeout(() => setExpandedItem(item.name), 100);
                        } else {
                          setExpandedItem(isExpanded ? null : item.name);
                        }
                      }}
                      className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      title={isSidebarCollapsed ? item.name : undefined}
                    >
                      <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                      <AnimatePresence>
                        {!isSidebarCollapsed && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="ml-3 flex-1 text-left whitespace-nowrap"
                            >
                              {item.name}
                            </motion.span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <AnimatePresence>
                      {!isSidebarCollapsed && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`flex items-center px-3 py-2 text-sm rounded-xl transition-colors ${
                                location.pathname === subItem.path
                                  ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30'
                                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.button
                    onClick={item.onClick || (() => navigate(item.path))}
                    className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    title={isSidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                    <AnimatePresence>
                      {!isSidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="ml-3 flex-1 text-left whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </nav>

        {/* Navigation Divider */}
        <div className="px-4 py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>

        {/* Sidebar Footer */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-8 h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial="expanded"
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        className="min-h-screen pt-4 pr-4 pb-4 transition-colors"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 min-h-screen shadow-xl border border-gray-100 dark:border-gray-700">
          {/* Top bar with date picker, filters, and profile */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {!isProfilePage && (
                <>
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
                </>
              )}
            </div>

            {/* User Profile Button */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <img
                  src={userInfo.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-100 dark:border-blue-900"
                />
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {userInfo.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userInfo.role}
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <Outlet />
        </div>
      </motion.main>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white ${
            isChatOpen ? 'hidden' : 'flex'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Dashboard; 