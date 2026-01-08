import React from 'react';

export const MonthlyTargetGauge: React.FC = () => {
  const percentage = 75.55;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Monthly Target</h3>
          <p className="text-sm text-gray-500">Target you've set for each month</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="#3b82f6"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
            <span className="text-sm text-green-600 font-medium">+10%</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4 max-w-xs">
          You earn $3287 today, it's higher than last month.<br />
          Keep up your good work!
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Target</p>
          <p className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
            $20K
            <span className="text-xs text-red-500">↓</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Revenue</p>
          <p className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
            $20K
            <span className="text-xs text-green-500">↑</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Today</p>
          <p className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
            $20K
            <span className="text-xs text-green-500">↑</span>
          </p>
        </div>
      </div>
    </div>
  );
};
