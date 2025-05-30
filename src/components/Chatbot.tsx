import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Book,
  Headphones,
  Clock,
  X,
  Send,
  Bot,
  Settings,
  Users,
  BarChart,
  FileText,
  Calendar,
  DollarSign,
  Briefcase,
  Zap,
  Award,
  TrendingUp,
  MessageCircle,
  Smartphone,
  GraduationCap,
  Heart,
  LineChart,
  Lock,
  Globe,
  Cloud,
  PieChart,
  Target,
  Lightbulb,
  Laptop,
  UserCheck,
  User
} from 'lucide-react';

const predefinedQuestions = [
  {
    id: 1,
    text: 'Enterprise Security',
    query: 'security',
    icon: Shield,
    response: 'HRlytics maintains the highest security standards with ISO 27001 certification, SOC 2 Type II compliance, and enterprise-grade encryption for all data.'
  },
  {
    id: 2,
    text: 'Implementation Process',
    query: 'implementation',
    icon: Book,
    response: 'Our enterprise implementation process includes dedicated support, custom data migration, integration setup, and comprehensive team training, typically completed within 4-6 weeks.'
  },
  {
    id: 3,
    text: 'Support SLA',
    query: 'support',
    icon: Headphones,
    response: 'Enterprise clients receive 24/7 priority support with guaranteed response times: 15 minutes for critical issues, 2 hours for high-priority, and 8 hours for standard requests.'
  },
  {
    id: 4,
    text: 'ROI Timeline',
    query: 'roi',
    icon: Clock,
    response: 'Based on client data, enterprises typically see measurable ROI within 3-6 months, with an average 30% reduction in HR operational costs and 25% improvement in retention rates.'
  },
  {
    id: 5,
    text: 'Performance Analytics',
    query: 'analytics',
    icon: BarChart,
    response: 'Our AI-powered analytics engine provides real-time insights into employee performance, team dynamics, and organizational health with predictive modeling capabilities.'
  },
  {
    id: 6,
    text: 'Integration Capabilities',
    query: 'integrations',
    icon: Settings,
    response: 'HRlytics seamlessly integrates with major HRIS, ATS, and ERP systems including Workday, SAP, Oracle, and custom enterprise solutions through our secure API.'
  },
  {
    id: 7,
    text: 'Employee Experience',
    query: 'experience',
    icon: Users,
    response: 'Our platform enhances employee experience through personalized dashboards, automated workflows, and AI-driven career development recommendations.'
  },
  {
    id: 8,
    text: 'Compliance Management',
    query: 'compliance',
    icon: FileText,
    response: 'Stay compliant with automated updates for local and international regulations, built-in reporting templates, and audit trails for all HR activities.'
  },
  {
    id: 9,
    text: 'Leave Management',
    query: 'leave',
    icon: Calendar,
    response: 'Streamline leave management with automated approvals, calendar integration, and predictive absence analytics to optimize workforce planning.'
  },
  {
    id: 10,
    text: 'Compensation Planning',
    query: 'compensation',
    icon: DollarSign,
    response: 'Make data-driven compensation decisions with market benchmarking, equity analysis, and budget optimization tools.'
  },
  {
    id: 11,
    text: 'Talent Acquisition',
    query: 'recruitment',
    icon: Briefcase,
    response: 'Accelerate hiring with AI-powered candidate matching, automated screening, and predictive success modeling for better hiring decisions.'
  },
  {
    id: 12,
    text: 'Quick Setup',
    query: 'setup',
    icon: Zap,
    response: 'Get started in minutes with our guided setup process, pre-built templates, and automated data import tools.'
  },
  {
    id: 13,
    text: 'Mobile Access',
    query: 'mobile',
    icon: Smartphone,
    response: 'Access HRlytics on any device with our responsive web app and native mobile applications for iOS and Android, featuring biometric login and offline capabilities.'
  },
  {
    id: 14,
    text: 'Training Programs',
    query: 'training',
    icon: GraduationCap,
    response: 'Our platform includes comprehensive training modules, interactive workshops, skill assessments, and personalized learning paths for employee development.'
  },
  {
    id: 15,
    text: 'Employee Benefits',
    query: 'benefits',
    icon: Heart,
    response: 'Track and manage employee benefits including healthcare, retirement plans, stock options, and wellness programs with automated enrollment and real-time updates.'
  },
  {
    id: 16,
    text: 'Performance Metrics',
    query: 'metrics',
    icon: LineChart,
    response: 'Monitor key performance indicators, set and track goals, and generate detailed performance reports with our customizable metrics dashboard.'
  },
  {
    id: 17,
    text: 'Data Privacy',
    query: 'privacy',
    icon: Lock,
    response: 'Your data is protected with end-to-end encryption, role-based access control, and compliance with GDPR, CCPA, and other global privacy regulations.'
  },
  {
    id: 18,
    text: 'Global Support',
    query: 'global',
    icon: Globe,
    response: 'HRlytics supports multiple languages, currencies, and regional compliance requirements, with localized support teams across different time zones.'
  },
  {
    id: 19,
    text: 'Cloud Infrastructure',
    query: 'cloud',
    icon: Cloud,
    response: 'Our platform runs on enterprise-grade cloud infrastructure with 99.99% uptime, automatic backups, and disaster recovery capabilities.'
  },
  {
    id: 20,
    text: 'Custom Reports',
    query: 'reports',
    icon: PieChart,
    response: 'Create custom reports and dashboards with drag-and-drop tools, advanced filters, and automated scheduling for regular distribution.'
  },
  {
    id: 21,
    text: 'Goal Setting',
    query: 'goals',
    icon: Target,
    response: 'Set and track organizational, team, and individual goals with OKR frameworks, progress tracking, and alignment visualization tools.'
  },
  {
    id: 22,
    text: 'Innovation Features',
    query: 'innovation',
    icon: Lightbulb,
    response: 'Stay ahead with AI-powered insights, predictive analytics, and emerging HR tech integrations regularly added to the platform.'
  },
  {
    id: 23,
    text: 'Remote Work Tools',
    query: 'remote',
    icon: Laptop,
    response: 'Support remote and hybrid teams with integrated time tracking, virtual check-ins, collaboration tools, and remote work policy management.'
  },
  {
    id: 24,
    text: 'Employee Onboarding',
    query: 'onboarding',
    icon: UserCheck,
    response: 'Streamline new hire onboarding with automated workflows, document management, training schedules, and progress tracking for both remote and in-office employees.'
  }
];

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessageBubble: React.FC<{ message: Message; index: number }> = ({ message, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotateX: -20 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    exit={{ opacity: 0, y: -20, rotateX: 20 }}
    transition={{ 
      duration: 0.4,
      delay: index * 0.1,
      type: "spring",
      damping: 15
    }}
    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group perspective`}
  >
    {!message.isUser && (
      <motion.div
        initial={{ scale: 0, rotateY: -90 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-2 mt-2 shadow-lg"
      >
        <Bot className="w-4 h-4 text-white" />
      </motion.div>
    )}
    <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
      <motion.div
        layout
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02, rotateX: 5 }}
        className={`max-w-[80%] p-3 ${
          message.isUser
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl rounded-l-2xl shadow-blue-500/25'
            : 'bg-gray-100 dark:bg-gray-700 dark:text-white rounded-t-2xl rounded-r-2xl shadow-gray-500/10'
        } shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </motion.div>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-2"
      >
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </motion.span>
    </div>
    {message.isUser && (
      <motion.div
        initial={{ scale: 0, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center ml-2 mt-2 shadow-lg"
      >
        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </motion.div>
    )}
  </motion.div>
);

const ScrollContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth perspective"
      animate={{
        boxShadow: isScrolling 
          ? 'inset 0 -20px 20px -20px rgba(0,0,0,0.1), inset 0 20px 20px -20px rgba(0,0,0,0.1)' 
          : 'inset 0 0 0 0 rgba(0,0,0,0)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const QuickQuestion: React.FC<{
  question: typeof predefinedQuestions[0];
  onClick: () => void;
}> = ({ question, onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 text-xs bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 group"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
      <question.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    </div>
    <span className="text-left flex-1 text-gray-700 dark:text-gray-300">{question.text}</span>
  </motion.button>
);

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello! I'm your HR Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleClose = () => {
    onClose();
    // Reset messages after closing animation completes
    setTimeout(() => {
      setMessages([
        {
          id: 0,
          text: "Hello! I'm your HR Assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setInputValue('');
      setIsTyping(false);
    }, 500);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching predefined response or give default response
    const matchingQuestion = predefinedQuestions.find(q => 
      text.toLowerCase().includes(q.query.toLowerCase())
    );

    const botMessage: Message = {
      id: messages.length + 1,
      text: matchingQuestion?.response || "I'm not sure about that. Please try asking about our security, implementation, support, or ROI.",
      isUser: false,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuestionClick = (question: typeof predefinedQuestions[0]) => {
    handleSend(question.text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-20 right-4 z-50 w-[400px] perspective"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 h-[600px] transform-gpu"
            initial={{ rotateX: -10 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: -10 }}
            transition={{ duration: 0.4 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Header */}
            <motion.div
              className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl flex justify-between items-center relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="flex items-center gap-3 z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <ScrollContainer>
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full w-20 ml-10"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -5, 0],
                        rotateX: [0, 45, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full shadow-lg"
                    />
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </ScrollContainer>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                Suggested Questions
              </p>
              <motion.div 
                className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {predefinedQuestions.map((question) => (
                  <QuickQuestion
                    key={question.id}
                    question={question}
                    onClick={() => handleQuestionClick(question)}
                  />
                ))}
              </motion.div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <motion.div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm shadow-sm"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  whileTap={{ scale: 0.95, rotateZ: -2 }}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot; 