export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: number;
  location: string;
  departments: Department[];
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  headCount: number;
  budget: number;
  performanceScore: number;
}

export interface OrganizationImport {
  organization: Organization;
  employees: Employee[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  joiningDate: string;
  salary: number;
  performanceMetrics: PerformanceMetrics;
}

export interface PerformanceMetrics {
  efficiency: number;
  quality: number;
  consistency: number;
  attendance: number;
  lastReviewDate: string;
} 