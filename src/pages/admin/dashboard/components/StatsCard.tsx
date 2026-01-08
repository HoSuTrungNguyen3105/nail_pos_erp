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
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10 group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/10 rounded-xl group-hover:bg-fuchsia-500/20 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
          <span className={`text-sm font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full ${
            isPositive 
              ? 'text-teal-400 bg-teal-400/10' 
              : 'text-red-400 bg-red-400/10'
          }`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        </div>
      </div>
    </div>
  );
};
