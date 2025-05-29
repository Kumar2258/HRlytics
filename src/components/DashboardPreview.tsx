import React from 'react';
import { TrendingUp, BarChart3, Users, Clock } from 'lucide-react';

const DashboardPreview = () => (
  <div className="bg-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
    <div className="bg-slate-800 text-white p-4 rounded-t-xl -m-6 mb-6 flex items-center gap-4">
      <div className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-sm">HRLYTICS</div>
      <span className="ml-auto text-sm opacity-90">Dashboard</span>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border-l-4 border-blue-600">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Performance Overview
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" 
                 style={{background: `conic-gradient(from 0deg, #4F7CFF 0deg 302deg, #e5e7eb 302deg 360deg)`}}>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">84%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border-l-4 border-green-600">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-green-600" />
          Employee Metrics
        </h3>
        <div className="flex items-end gap-1 h-12">
          {[40, 70, 55, 90, 75].map((height, i) => (
            <div key={i} className="bg-green-600 rounded-t flex-1 opacity-80" 
                 style={{height: `${height}%`}}></div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-xl border-l-4 border-purple-600">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-600" />
          Department Performance
        </h3>
        <div className="space-y-2">
          {[
            {name: 'Engineering', progress: 90},
            {name: 'Marketing', progress: 75},
            {name: 'Sales', progress: 85}
          ].map(dept => (
            <div key={dept.name} className="flex items-center gap-2 text-sm">
              <span className="text-gray-600 w-20">{dept.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" 
                     style={{width: `${dept.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-4 rounded-xl border-l-4 border-orange-600">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-600" />
          Monthly Trend
        </h3>
        <div className="h-8 flex items-center">
          <svg className="w-full h-full" viewBox="0 0 100 20">
            <path d="M0,15 Q25,5 50,10 T100,8" stroke="#ea580c" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPreview; 