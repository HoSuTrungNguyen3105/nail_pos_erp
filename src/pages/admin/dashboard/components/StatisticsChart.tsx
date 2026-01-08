import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const STATISTICS_DATA = [
  { date: 'Jan', value: 180 },
  { date: 'Feb', value: 190 },
  { date: 'Mar', value: 185 },
  { date: 'Apr', value: 175 },
  { date: 'May', value: 195 },
  { date: 'Jun', value: 210 },
  { date: 'Jul', value: 220 },
  { date: 'Aug', value: 215 },
  { date: 'Sep', value: 225 },
  { date: 'Oct', value: 230 },
  { date: 'Nov', value: 235 },
  { date: 'Dec', value: 220 },
];

type TabType = 'overview' | 'sales' | 'revenue';

export const StatisticsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Statistics</h3>
          <p className="text-sm text-gray-500">Target you've set for each month</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'sales'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'revenue'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Revenue
            </button>
          </div>
          <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="10" height="8" rx="1" strokeWidth="1.5"/>
              <path d="M6 2v2M10 2v2M3 7h10" strokeWidth="1.5"/>
            </svg>
            Mar 6, 2025 - Mar 12, 2025
          </button>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={STATISTICS_DATA}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
