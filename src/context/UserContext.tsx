import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  joinDate: string;
  avatar: string;
  bio: string;
  skills: string[];
  achievements: string[];
}

interface UserContextType {
  userInfo: UserInfo;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
}

const defaultUserInfo: UserInfo = {
  name: 'John Doe',
  role: 'Senior HR Manager',
  email: 'john.doe@hrlytics.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  department: 'Human Resources',
  joinDate: 'January 2020',
  avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  bio: 'Experienced HR professional with a passion for employee development and organizational growth.',
  skills: ['Leadership', 'Performance Management', 'Employee Relations', 'Talent Acquisition'],
  achievements: [
    'Led company-wide digital transformation initiative',
    'Reduced employee turnover by 25%',
    'Implemented successful wellness program'
  ]
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 