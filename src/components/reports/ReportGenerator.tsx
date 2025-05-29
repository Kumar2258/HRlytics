import React, { useState } from 'react';
import { FileDown, FileText, Calendar, Filter } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { useData } from '../../context/DataContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

interface ReportOptions {
  startDate: string;
  endDate: string;
  department: string;
  reportType: 'performance' | 'attendance' | 'sentiment' | 'comprehensive';
  format: 'pdf' | 'excel';
}

const ReportGenerator: React.FC = () => {
  const { employees, organization } = useData();
  const { darkMode } = useTheme();
  const [options, setOptions] = useState<ReportOptions>({
    startDate: '',
    endDate: '',
    department: '',
    reportType: 'comprehensive',
    format: 'pdf'
  });

  // Calculate department performance metrics
  const departmentPerformance = employees.reduce((acc, emp) => {
    if (!acc[emp.departmentId]) {
      acc[emp.departmentId] = {
        total: 0,
        count: 0,
        metrics: { efficiency: 0, quality: 0, consistency: 0, attendance: 0 },
        salaryTotal: 0,
        employees: []
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
    acc[emp.departmentId].salaryTotal += emp.salary;
    acc[emp.departmentId].employees.push(emp);
    
    return acc;
  }, {} as Record<string, any>);

  const generateExcelReport = () => {
    const wb = XLSX.utils.book_new();

    // Employee Details Sheet
    const employeeData = employees.map(emp => ({
      'Employee ID': emp.id,
      'Name': emp.name,
      'Email': emp.email,
      'Role': emp.role,
      'Department': emp.departmentId,
      'Joining Date': emp.joiningDate,
      'Salary': emp.salary,
      'Efficiency Score': emp.performanceMetrics.efficiency,
      'Quality Score': emp.performanceMetrics.quality,
      'Consistency Score': emp.performanceMetrics.consistency,
      'Attendance Score': emp.performanceMetrics.attendance,
      'Last Review Date': emp.performanceMetrics.lastReviewDate,
      'Overall Performance': (
        emp.performanceMetrics.efficiency +
        emp.performanceMetrics.quality +
        emp.performanceMetrics.consistency +
        emp.performanceMetrics.attendance
      ) / 4
    }));
    const wsEmployees = XLSX.utils.json_to_sheet(employeeData);
    XLSX.utils.book_append_sheet(wb, wsEmployees, 'Employee Details');

    // Department Performance Sheet
    const departmentData = Object.entries(departmentPerformance).map(([deptId, data]: [string, any]) => ({
      'Department ID': deptId,
      'Total Employees': data.count,
      'Average Performance': (data.total / data.count).toFixed(2),
      'Average Efficiency': (data.metrics.efficiency / data.count).toFixed(2),
      'Average Quality': (data.metrics.quality / data.count).toFixed(2),
      'Average Consistency': (data.metrics.consistency / data.count).toFixed(2),
      'Average Attendance': (data.metrics.attendance / data.count).toFixed(2),
      'Total Salary Budget': data.salaryTotal,
      'Average Salary': (data.salaryTotal / data.count).toFixed(2)
    }));
    const wsDepartments = XLSX.utils.json_to_sheet(departmentData);
    XLSX.utils.book_append_sheet(wb, wsDepartments, 'Department Performance');

    // Organization Summary Sheet
    const orgSummary = [{
      'Total Employees': employees.length,
      'Number of Departments': Object.keys(departmentPerformance).length,
      'Average Company Performance': Object.values(departmentPerformance)
        .reduce((acc: number, dept: any) => acc + dept.total, 0) / employees.length,
      'Total Salary Budget': Object.values(departmentPerformance)
        .reduce((acc: number, dept: any) => acc + dept.salaryTotal, 0),
      'Report Generated Date': new Date().toISOString()
    }];
    const wsSummary = XLSX.utils.json_to_sheet(orgSummary);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Organization Summary');

    // Save the workbook
    XLSX.writeFile(wb, `HRlytics_Comprehensive_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const generatePDFReport = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Add title
    pdf.setFontSize(20);
    pdf.text('HRlytics Comprehensive Report', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    // Add organization summary
    pdf.text('Organization Summary', 20, 45);
    pdf.text(`Total Employees: ${employees.length}`, 25, 55);
    pdf.text(`Number of Departments: ${Object.keys(departmentPerformance).length}`, 25, 62);

    // Add department performance
    pdf.text('Department Performance', 20, 75);
    Object.entries(departmentPerformance).forEach(([deptId, data]: [string, any], index) => {
      const yPos = 85 + (index * 20);
      pdf.text(`${deptId}:`, 25, yPos);
      pdf.text(`Employees: ${data.count}`, 35, yPos + 5);
      pdf.text(`Avg Performance: ${(data.total / data.count).toFixed(2)}%`, 35, yPos + 10);
    });

    // Add charts
    const imgHeight = (canvas.height * 180) / canvas.width;
    pdf.addImage(imgData, 'PNG', 15, 200, 180, imgHeight);

    pdf.save(`HRlytics_Comprehensive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateReport = async () => {
    const filteredEmployees = employees.filter(emp => {
      if (options.department && emp.departmentId !== options.department) {
        return false;
      }
      if (options.startDate && new Date(emp.joiningDate) < new Date(options.startDate)) {
        return false;
      }
      if (options.endDate && new Date(emp.joiningDate) > new Date(options.endDate)) {
        return false;
      }
      return true;
    });

    if (options.format === 'pdf') {
      await generatePDFReport();
    } else {
      generateExcelReport();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Generate Report</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={options.startDate}
              onChange={(e) => setOptions({ ...options, startDate: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={options.endDate}
              onChange={(e) => setOptions({ ...options, endDate: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Department
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={options.department}
              onChange={(e) => setOptions({ ...options, department: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
            >
              <option value="">All Departments</option>
              {Object.keys(departmentPerformance).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Report Type
          </label>
          <select
            value={options.reportType}
            onChange={(e) => setOptions({ ...options, reportType: e.target.value as ReportOptions['reportType'] })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="comprehensive">Comprehensive Report</option>
            <option value="performance">Performance Report</option>
            <option value="attendance">Attendance Report</option>
            <option value="sentiment">Sentiment Analysis Report</option>
          </select>
        </div>

        {/* Export Format */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Export Format
          </label>
          <select
            value={options.format}
            onChange={(e) => setOptions({ ...options, format: e.target.value as ReportOptions['format'] })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="space-y-2 flex items-end">
          <button
            onClick={generateReport}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FileDown className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div id="report-content" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Report Preview</h3>
        
        {/* Organization Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400">Total Employees</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{employees.length}</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400">Departments</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {Object.keys(departmentPerformance).length}
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm text-purple-600 dark:text-purple-400">Avg Performance</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {(Object.values(departmentPerformance)
                .reduce((acc: number, dept: any) => acc + dept.total, 0) / employees.length).toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm text-orange-600 dark:text-orange-400">Total Salary Budget</p>
            <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              ${Object.values(departmentPerformance)
                .reduce((acc: number, dept: any) => acc + dept.salaryTotal, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Department Performance Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left text-gray-900 dark:text-white">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Employees</th>
                <th className="px-4 py-3">Avg Performance</th>
                <th className="px-4 py-3">Avg Salary</th>
                <th className="px-4 py-3">Efficiency</th>
                <th className="px-4 py-3">Quality</th>
                <th className="px-4 py-3">Consistency</th>
                <th className="px-4 py-3">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(departmentPerformance).map(([deptId, data]: [string, any]) => (
                <tr key={deptId} className="border-b dark:border-gray-600">
                  <td className="px-4 py-3 font-medium">{deptId}</td>
                  <td className="px-4 py-3">{data.count}</td>
                  <td className="px-4 py-3">{(data.total / data.count).toFixed(1)}%</td>
                  <td className="px-4 py-3">${(data.salaryTotal / data.count).toLocaleString()}</td>
                  <td className="px-4 py-3">{(data.metrics.efficiency / data.count).toFixed(1)}%</td>
                  <td className="px-4 py-3">{(data.metrics.quality / data.count).toFixed(1)}%</td>
                  <td className="px-4 py-3">{(data.metrics.consistency / data.count).toFixed(1)}%</td>
                  <td className="px-4 py-3">{(data.metrics.attendance / data.count).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator; 