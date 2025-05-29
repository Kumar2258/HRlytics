import React, { createContext, useContext, useState } from 'react';
import { Employee, Organization } from '../types/organization';

interface DataContextType {
  employees: Employee[];
  organization: Organization | null;
  setEmployeeData: (data: Employee[]) => void;
  setOrganizationData: (data: Organization) => void;
}

const DataContext = createContext<DataContextType>({
  employees: [],
  organization: null,
  setEmployeeData: () => {},
  setOrganizationData: () => {}
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [organization, setOrganization] = useState<Organization | null>(null);

  const setEmployeeData = (data: Employee[]) => {
    setEmployees(data);
  };

  const setOrganizationData = (data: Organization) => {
    setOrganization(data);
  };

  return (
    <DataContext.Provider value={{
      employees,
      organization,
      setEmployeeData,
      setOrganizationData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider; 