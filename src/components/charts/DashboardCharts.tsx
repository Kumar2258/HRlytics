import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  darkMode?: boolean;
}

export const PerformanceTrendChart: React.FC<ChartProps> = ({ darkMode }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: [65, 72, 68, 75, 82, 85],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Performance Trends',
        color: darkMode ? '#fff' : '#000',
      },
    },
    scales: {
      y: {
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export const DepartmentPerformanceChart: React.FC<ChartProps> = ({ darkMode }) => {
  const data = {
    labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 72, 78, 75, 82, 79],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(236, 72, 153, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(245, 158, 11, 0.5)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Department Performance',
        color: darkMode ? '#fff' : '#000',
      },
    },
    scales: {
      y: {
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#000',
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const SentimentDistributionChart: React.FC<ChartProps> = ({ darkMode }) => {
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Sentiment Distribution',
        color: darkMode ? '#fff' : '#000',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export const AttritionRiskChart: React.FC<ChartProps> = ({ darkMode }) => {
  const data = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
      title: {
        display: true,
        text: 'Attrition Risk Distribution',
        color: darkMode ? '#fff' : '#000',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}; 