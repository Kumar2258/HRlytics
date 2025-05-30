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
import { motion, AnimatePresence } from 'framer-motion';

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

const chartAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const commonOptions = (darkMode: boolean) => ({
  responsive: true,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart',
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: darkMode ? '#fff' : '#000',
        font: {
          size: 12,
          weight: '500' as const,
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
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
        weight: '600' as const,
      },
      bodyFont: {
        size: 13,
      },
      displayColors: true,
      boxPadding: 4,
    },
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
});

export const PerformanceTrendChart: React.FC<ChartProps> = ({ darkMode = false }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance Score',
        data: [65, 72, 68, 75, 82, 85],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    ...commonOptions(darkMode),
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
          font: { size: 12 },
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
          font: { size: 12 },
          padding: 8,
        },
      },
    },
  };

  return (
    <motion.div
      variants={chartAnimation}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Line data={data} options={options} />
    </motion.div>
  );
};

export const DepartmentPerformanceChart: React.FC<ChartProps> = ({ darkMode = false }) => {
  const data = {
    labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        label: 'Performance Score',
        data: [85, 72, 78, 75, 82, 79],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderWidth: 2,
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(249, 115, 22)',
          'rgb(236, 72, 153)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)',
        ],
        borderRadius: 8,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    ...commonOptions(darkMode),
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
          font: { size: 12 },
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#fff' : '#000',
          font: { size: 12 },
          padding: 8,
        },
      },
    },
  };

  return (
    <motion.div
      variants={chartAnimation}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
};

export const SentimentDistributionChart: React.FC<ChartProps> = ({ darkMode = false }) => {
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
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    ...commonOptions(darkMode),
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <motion.div
      variants={chartAnimation}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Pie data={data} options={options} />
    </motion.div>
  );
};

export const AttritionRiskChart: React.FC<ChartProps> = ({ darkMode = false }) => {
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
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    ...commonOptions(darkMode),
    cutout: '75%',
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <motion.div
      variants={chartAnimation}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">70%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Low Risk</p>
        </div>
      </div>
    </motion.div>
  );
}; 
}; 