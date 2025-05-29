import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Employee, Organization } from '../../types/organization';

const OrganizationImport: React.FC = () => {
  const { setEmployeeData, setOrganizationData } = useData();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateData = (data: any): data is { employees: Employee[], organization: Organization } => {
    if (!data || typeof data !== 'object') return false;
    if (!Array.isArray(data.employees)) return false;
    if (!data.organization || typeof data.organization !== 'object') return false;

    // Validate each employee has required fields
    return data.employees.every((emp: any) => (
      emp.id && 
      emp.name && 
      emp.email && 
      emp.role && 
      emp.departmentId && 
      emp.joiningDate &&
      typeof emp.salary === 'number' &&
      emp.performanceMetrics
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        if (validateData(jsonData)) {
          setEmployeeData(jsonData.employees);
          setOrganizationData(jsonData.organization);
          setUploadStatus('success');
          setErrorMessage('');
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setUploadStatus('error');
        setErrorMessage('Invalid JSON format or missing required fields');
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        handleFileUpload({ target: { files: dataTransfer.files } } as any);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Import Organization Data</h2>
      
      <div 
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
        
        <div className="space-y-4">
          <Upload className="w-12 h-12 mx-auto text-gray-400" />
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose JSON File
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            or drag and drop your JSON file here
          </p>
        </div>

        {uploadStatus === 'success' && (
          <div className="mt-4 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Data imported successfully!</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expected JSON Format</h3>
        <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "employees": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "departmentId": "string",
      "joiningDate": "YYYY-MM-DD",
      "salary": number,
      "performanceMetrics": {
        "efficiency": number,
        "quality": number,
        "consistency": number,
        "attendance": number,
        "lastReviewDate": "YYYY-MM-DD"
      }
    }
  ],
  "organization": {
    "name": "string",
    "departments": [
      {
        "id": "string",
        "name": "string"
      }
    ]
  }
}`}
        </pre>
      </div>
    </div>
  );
};

export default OrganizationImport; 