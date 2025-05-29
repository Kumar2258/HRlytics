import React from 'react';
import { Trophy, Clock, Bug, Zap, BarChart, AlertTriangle } from 'lucide-react';
import { PerformanceTrendChart, DepartmentPerformanceChart } from '../charts/DashboardCharts';
import { useTheme } from '../../context/ThemeContext';

interface PerformanceCardProps {
  title: string;
  value: string;
  metric: string;
  icon: React.ElementType;
  trend?: string;
  employees?: Array<{
    name: string;
    value: string;
    department: string;
  }>;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ title, value, metric, icon: Icon, trend, employees }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {trend && (
        <span className={`text-sm font-semibold ${
          trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trend}
        </span>
      )}
    </div>
    
    <div className="mb-4">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{metric}</div>
    </div>

    {employees && (
      <div className="space-y-3">
        {employees.map((employee, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{employee.name}</div>
              <div className="text-gray-600 dark:text-gray-400">{employee.department}</div>
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">{employee.value}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const PerformanceInsights: React.FC = () => {
  const { darkMode } = useTheme();
  
  const performanceData: PerformanceCardProps[] = [
    {
      title: 'Highest Projects Completed',
      value: '156',
      metric: 'Total Projects',
      icon: Trophy,
      trend: '+15%',
      employees: [
        { name: 'John Smith', value: '32', department: 'Engineering' },
        { name: 'Sarah Johnson', value: '28', department: 'Product' },
        { name: 'Mike Chen', value: '25', department: 'Engineering' }
      ]
    },
    {
      title: 'Most Late Logins',
      value: '45',
      metric: 'This Month',
      icon: Clock,
      trend: '-5%',
      employees: [
        { name: 'Tom Wilson', value: '8', department: 'Sales' },
        { name: 'Emily Brown', value: '6', department: 'Marketing' },
        { name: 'David Lee', value: '5', department: 'Support' }
      ]
    },
    {
      title: 'Highest Bug Rate',
      value: '12%',
      metric: 'Average',
      icon: Bug,
      trend: '-2%',
      employees: [
        { name: 'Alex Turner', value: '15%', department: 'Engineering' },
        { name: 'Lisa Wang', value: '13%', department: 'Engineering' },
        { name: 'James Miller', value: '11%', department: 'Engineering' }
      ]
    },
    {
      title: 'Lowest Task Efficiency',
      value: '68%',
      metric: 'Average',
      icon: Zap,
      trend: '+3%',
      employees: [
        { name: 'Robert Kim', value: '65%', department: 'Marketing' },
        { name: 'Anna Martinez', value: '67%', department: 'Sales' },
        { name: 'Chris Taylor', value: '68%', department: 'Support' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Insights</h2>
        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold">
          View Detailed Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {performanceData.map((data, index) => (
          <PerformanceCard key={index} {...data} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <DepartmentPerformanceChart darkMode={darkMode} />
        </div>

        {/* Performance Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <PerformanceTrendChart darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceInsights; 