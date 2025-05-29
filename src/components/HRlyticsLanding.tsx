import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  BarChart3, 
  Brain, 
  Phone, 
  Users, 
  Star,
  Menu,
  X,
  Play,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MessageSquare,
  Clock,
  User,
  Lock
} from 'lucide-react';
import { teamMembers } from '../data/teamMembers';
import { pricingPlans } from '../data/pricingPlans';
import DashboardPreview from './DashboardPreview';
import Modal from './Modal';
import HomeSection from './sections/HomeSection';
import FeaturesSection from './sections/FeaturesSection';
import AboutSection from './sections/AboutSection';
import PricingSection from './sections/PricingSection';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HRlyticsLanding: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    name: '',
    organization: '',
    designation: '',
    department: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'signin') {
      if (credentials.username && credentials.password) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Please enter both username and password');
      }
    } else {
      // Sign up validation
      if (!credentials.username || !credentials.password || !credentials.name || 
          !credentials.organization || !credentials.designation || !credentials.email) {
        setError('Please fill in all required fields');
        return;
      }
      // Here you would typically make an API call to create the account
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const showSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'
        }`}>
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HRlytics
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'features', 'about', 'pricing'].map(section => (
                <button 
                  key={section}
                  onClick={() => showSection(section)}
                  className={`font-semibold transition-colors capitalize ${
                    activeSection === section 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                  aria-label={`Navigate to ${section} section`}
                >
                  {section}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setModalType('signin')}
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-colors duration-300"
                aria-label="Sign In"
              >
                Sign In
              </button>
              <button 
                onClick={() => setModalType('signup')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
          
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-800 border-t shadow-lg">
              <div className="px-6 py-4 space-y-4">
                {['home', 'features', 'about', 'pricing'].map(section => (
                  <button 
                    key={section}
                    onClick={() => showSection(section)}
                    className="block w-full text-left font-semibold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 capitalize"
                    aria-label={`Navigate to ${section} section`}
                  >
                    {section}
                  </button>
                ))}
                <div className="pt-4 space-y-2">
                  <button 
                    onClick={() => setModalType('signin')}
                    className="block w-full px-6 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-xl font-semibold text-center"
                    aria-label="Sign In"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setModalType('signup')}
                    className="block w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-center"
                    aria-label="Sign Up"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="pt-20">
          {activeSection === 'home' && <HomeSection openModal={() => setModalType('signin')} />}
          {activeSection === 'features' && <FeaturesSection />}
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'pricing' && <PricingSection openModal={() => setModalType('signup')} />}
        </main>

        <Footer />
        <ThemeToggle />
      </div>

      {/* Custom Modal Implementation */}
      {modalType && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setModalType(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative my-8 max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8 max-h-[80vh] overflow-hidden">
              {/* Left side - Form */}
              <div className="overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 sticky top-0 bg-white dark:bg-gray-800 py-4 z-[5]">
                  {modalType === 'signin' ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {modalType === 'signin' ? 'Access your dashboard' : 'Join HRlytics platform'}
                </p>

                <form onSubmit={handleLogin} className="space-y-6 pb-6">
                  {/* Username field */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password field */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Additional fields for sign up */}
                  {modalType === 'signup' && (
                    <>
                      {/* Full Name */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={credentials.name}
                          onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          placeholder="Enter your full name"
                          required
                        />
                      </motion.div>

                      {/* Organization */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Organization <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={credentials.organization}
                          onChange={(e) => setCredentials({ ...credentials, organization: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          placeholder="Enter your organization name"
                          required
                        />
                      </motion.div>

                      {/* Designation */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={credentials.designation}
                          onChange={(e) => setCredentials({ ...credentials, designation: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          placeholder="Enter your designation"
                          required
                        />
                      </motion.div>

                      {/* Department */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={credentials.department}
                          onChange={(e) => setCredentials({ ...credentials, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          required
                        >
                          <option value="">Select department</option>
                          <option value="HR">Human Resources</option>
                          <option value="IT">Information Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Operations">Operations</option>
                          <option value="Management">Management</option>
                        </select>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={credentials.email}
                          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          placeholder="Enter your email"
                          required
                        />
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={credentials.phone}
                          onChange={(e) => setCredentials({ ...credentials, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-shadow"
                          placeholder="Enter your phone number"
                        />
                      </motion.div>
                    </>
                  )}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
                  >
                    {modalType === 'signin' ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              </div>

              {/* Right side - Features */}
              <div className="hidden md:block bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-xl text-white sticky top-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold mb-6">Why Choose HRlytics?</h3>
                  
                  {[
                    "Real-time HR analytics and insights",
                    "Comprehensive performance tracking",
                    "Automated report generation",
                    "Secure data management",
                    "Interactive dashboards"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <p>{feature}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HRlyticsLanding; 