import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: number;
  efficiency: number;
  onTimeDelivery: number;
  satisfaction: number;
  attritionRisk: 'Low' | 'Medium' | 'High';
  engagement: number;
  feedback: {
    manager: string;
    peer: string;
  };
  metrics: {
    loginHours: number;
    trainingHours: number;
    lastPromotion: string;
  };
}

const EmployeeTable: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data - In a real app, this would come from an API
  const employees: Employee[] = [
    {
      id: '001',
      name: 'John Smith',
      role: 'Senior Developer',
      department: 'Engineering',
      experience: 5,
      efficiency: 92,
      onTimeDelivery: 95,
      satisfaction: 4.5,
      attritionRisk: 'Low',
      engagement: 88,
      feedback: {
        manager: 'Excellent problem-solving skills and team collaboration',
        peer: 'Great team player, always willing to help'
      },
      metrics: {
        loginHours: 176,
        trainingHours: 12,
        lastPromotion: '2023-06-15'
      }
    },
    // Add more employee data here...
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Employee }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Performance</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => handleSort('name')} className="flex items-center space-x-1">
                    <span>Employee</span>
                    <SortIcon field="name" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => handleSort('efficiency')} className="flex items-center space-x-1">
                    <span>Efficiency</span>
                    <SortIcon field="efficiency" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => handleSort('onTimeDelivery')} className="flex items-center space-x-1">
                    <span>On-Time Delivery</span>
                    <SortIcon field="onTimeDelivery" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => handleSort('satisfaction')} className="flex items-center space-x-1">
                    <span>Satisfaction</span>
                    <SortIcon field="satisfaction" />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <button onClick={() => handleSort('attritionRisk')} className="flex items-center space-x-1">
                    <span>Risk</span>
                    <SortIcon field="attritionRisk" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {employees.map((employee) => (
                <React.Fragment key={employee.id}>
                  <tr 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === employee.id ? null : employee.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{employee.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{employee.efficiency}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{employee.onTimeDelivery}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{employee.satisfaction}/5</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.attritionRisk === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        employee.attritionRisk === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {employee.attritionRisk}
                      </span>
                    </td>
                  </tr>
                  {expandedRow === employee.id && (
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Feedback</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Manager:</span> {employee.feedback.manager}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Peer:</span> {employee.feedback.peer}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Metrics</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Login Hours:</span> {employee.metrics.loginHours}h
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Training:</span> {employee.metrics.trainingHours}h
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Last Promotion:</span> {employee.metrics.lastPromotion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable; 