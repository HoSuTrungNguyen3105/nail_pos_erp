import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <span className={`text-sm font-medium flex items-center gap-1 ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        </div>
      </div>
    </div>
  );
};
