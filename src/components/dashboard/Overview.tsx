import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, BarChart2, LineChart, ArrowUp, ArrowDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Card3D: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = ((mouseX - width / 2) / width) * 100;
    const yPct = ((mouseY - height / 2) / height) * 100;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-2xl backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-200 ease-out"
    >
      {children}
    </motion.div>
  );
};

const Overview: React.FC = () => {
  const { employees, organization } = useData();
  const { darkMode } = useTheme();

  // Calculate department performance
  const departmentPerformance = employees.reduce((acc, emp) => {
    if (!acc[emp.departmentId]) {
      acc[emp.departmentId] = {
        total: 0,
        count: 0,
        metrics: { efficiency: 0, quality: 0, consistency: 0, attendance: 0 }
      };
    }
    
    acc[emp.departmentId].total += (
      emp.performanceMetrics.efficiency +
      emp.performanceMetrics.quality +
      emp.performanceMetrics.consistency +
      emp.performanceMetrics.attendance
    ) / 4;
    acc[emp.departmentId].count += 1;
    acc[emp.departmentId].metrics.efficiency += emp.performanceMetrics.efficiency;
    acc[emp.departmentId].metrics.quality += emp.performanceMetrics.quality;
    acc[emp.departmentId].metrics.consistency += emp.performanceMetrics.consistency;
    acc[emp.departmentId].metrics.attendance += emp.performanceMetrics.attendance;
    
    return acc;
  }, {} as Record<string, { total: number; count: number; metrics: Record<string, number> }>);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000'
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#fff' : '#000',
        bodyColor: darkMode ? '#fff' : '#000',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        displayColors: true,
        boxPadding: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#fff' : '#000'
        }
      },
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    }
  };

  const departmentNames = Object.keys(departmentPerformance);
  const averagePerformance = departmentNames.map(
    dept => departmentPerformance[dept].total / departmentPerformance[dept].count
  );

  const performanceData = {
    labels: departmentNames,
    datasets: [
      {
        label: 'Average Performance',
        data: averagePerformance,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const metricsData = {
    labels: ['Efficiency', 'Quality', 'Consistency', 'Attendance'],
    datasets: departmentNames.map((dept, index) => ({
      label: dept,
      data: [
        departmentPerformance[dept].metrics.efficiency / departmentPerformance[dept].count,
        departmentPerformance[dept].metrics.quality / departmentPerformance[dept].count,
        departmentPerformance[dept].metrics.consistency / departmentPerformance[dept].count,
        departmentPerformance[dept].metrics.attendance / departmentPerformance[dept].count
      ],
      borderColor: `hsl(${index * (360 / departmentNames.length)}, 70%, 50%)`,
      backgroundColor: `hsla(${index * (360 / departmentNames.length)}, 70%, 50%, 0.5)`
    }))
  };

  const employeeDistribution = {
    labels: departmentNames,
    datasets: [{
      data: departmentNames.map(dept => departmentPerformance[dept].count),
      backgroundColor: departmentNames.map((_, index) => 
        `hsla(${index * (360 / departmentNames.length)}, 70%, 50%, 0.8)`
      )
    }]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-8"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h2>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <select className="bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
            Generate Report
          </button>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Department Performance */}
        <Card3D>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-500" />
            Department Performance
            <span className="ml-auto text-sm text-green-500 flex items-center">
              <ArrowUp className="w-4 h-4" />
              8.2%
            </span>
          </h3>
          <Bar options={chartOptions} data={performanceData} />
        </Card3D>

        {/* Performance Metrics */}
        <Card3D>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-green-500" />
            Performance Metrics
            <span className="ml-auto text-sm text-red-500 flex items-center">
              <ArrowDown className="w-4 h-4" />
              2.4%
            </span>
          </h3>
          <Line options={chartOptions} data={metricsData} />
        </Card3D>

        {/* Employee Distribution */}
        <Card3D>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Employee Distribution
          </h3>
          <div className="relative">
            <Doughnut 
              options={{
                ...chartOptions,
                cutout: '75%'
              }} 
              data={employeeDistribution}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{employees.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Employees</p>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Summary Stats */}
        <Card3D>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Employees</p>
                <ArrowUp className="w-4 h-4 text-green-500" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-2xl font-bold text-blue-700 dark:text-blue-300"
              >
                {employees.length}
              </motion.p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-green-600 dark:text-green-400">Departments</p>
                <ArrowUp className="w-4 h-4 text-green-500" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-bold text-green-700 dark:text-green-300"
              >
                {departmentNames.length}
              </motion.p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-purple-600 dark:text-purple-400">Avg Performance</p>
                <ArrowDown className="w-4 h-4 text-red-500" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-2xl font-bold text-purple-700 dark:text-purple-300"
              >
                {(averagePerformance.reduce((a, b) => a + b, 0) / averagePerformance.length).toFixed(1)}%
              </motion.p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl border border-orange-500/20"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-orange-600 dark:text-orange-400">Top Department</p>
                <ArrowUp className="w-4 h-4 text-green-500" />
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl font-bold text-orange-700 dark:text-orange-300"
              >
                {departmentNames[averagePerformance.indexOf(Math.max(...averagePerformance))]}
              </motion.p>
            </motion.div>
          </div>
        </Card3D>
      </div>
    </motion.div>
  );
};

export default Overview; 