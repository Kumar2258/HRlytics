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
  User
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
      width: '16rem',
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    collapsed: { 
      width: '4rem',
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const contentVariants = {
    expanded: { 
      paddingLeft: '16rem',
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    collapsed: { 
      paddingLeft: '4rem',
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.aside
        initial="expanded"
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-x-hidden z-30"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <AnimatePresence>
              {!isSidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
                >
                  <Link to="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    HRlytics
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </motion.button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
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
                            // When sidebar is collapsed, clicking parent item navigates to first sub-item
                            navigate(item.subItems[0].path);
                          } else {
                            setExpandedItem(isExpanded ? null : item.name);
                          }
                        }}
                        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                            className="ml-4 mt-2 space-y-1"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
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
                      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={item.name}
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

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5 min-w-[1.25rem]" />
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="ml-3"
                  >
                    Sign Out
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial="expanded"
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
      >
        <div className="p-8">
          {/* Top bar with date picker, filters, and profile */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              {!isProfilePage && (
                <div className="flex items-center gap-4">
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
              )}
            </div>

            {/* User Profile Button */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Bottom Right Controls */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-4 z-40">
        <ThemeToggle />
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white ${
            isChatOpen ? 'hidden' : 'flex'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard; 