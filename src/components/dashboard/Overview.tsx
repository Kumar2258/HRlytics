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
      }
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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance
          </h3>
          <Bar options={chartOptions} data={performanceData} />
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics by Department
          </h3>
          <Line options={chartOptions} data={metricsData} />
        </div>

        {/* Employee Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Employee Distribution
          </h3>
          <Doughnut 
            options={{
              ...chartOptions,
              cutout: '70%'
            }} 
            data={employeeDistribution}
          />
        </div>

        {/* Summary Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Summary Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Employees</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {employees.length}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Departments</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {departmentNames.length}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-600 dark:text-purple-400">Avg Performance</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {(averagePerformance.reduce((a, b) => a + b, 0) / averagePerformance.length).toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-sm text-orange-600 dark:text-orange-400">Top Department</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {departmentNames[averagePerformance.indexOf(Math.max(...averagePerformance))]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview; 