import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MONTHLY_DATA = [
  { month: 'Jan', value: 250 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 280 },
  { month: 'Apr', value: 350 },
  { month: 'May', value: 320 },
  { month: 'Jun', value: 380 },
  { month: 'Jul', value: 400 },
  { month: 'Aug', value: 200 },
  { month: 'Sep', value: 450 },
  { month: 'Oct', value: 500 },
  { month: 'Nov', value: 480 },
  { month: 'Dec', value: 420 },
];

export const MonthlySalesChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Sales</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="month" 
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
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
