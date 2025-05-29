import React from 'react';
import { Filter, Calendar, ChevronDown } from 'lucide-react';

const FilterPanel = () => {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
  const roles = ['Manager', 'Senior Developer', 'Developer', 'Analyst', 'Designer'];
  const educationLevels = ["Bachelor's", "Master's", "PhD", 'High School', 'Associate'];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
      </div>

      <div className="space-y-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <div className="relative">
            <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5 appearance-none">
              <option value="1year">Last 1 Year</option>
              <option value="5years">Last 5 Years</option>
              <option value="custom">Custom Range</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Department
          </label>
          <div className="relative">
            <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5 appearance-none">
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role
          </label>
          <div className="relative">
            <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5 appearance-none">
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role.toLowerCase()}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Education Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Education Level
          </label>
          <div className="relative">
            <select className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg p-2.5 appearance-none">
              <option value="">All Levels</option>
              {educationLevels.map((level) => (
                <option key={level} value={level.toLowerCase()}>{level}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Job Satisfaction Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Job Satisfaction
          </label>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Sentiment Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sentiment Score
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded">
              Positive
            </button>
            <button className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded">
              Neutral
            </button>
            <button className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
              Negative
            </button>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel; 