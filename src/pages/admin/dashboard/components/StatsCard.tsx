import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  iconBgColor?: string; // e.g. 'bg-purple-500'
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtext, icon, iconBgColor = 'bg-fuchsia-500' }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10 flex items-center gap-6 group">
      {/* Icon Area */}
      <div className={`w-16 h-16 rounded-full ${iconBgColor} flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white/5 transition-transform group-hover:scale-110 duration-300`}>
        {React.cloneElement(icon as React.ReactElement, { 
        //   size: 32, 
        //   className: 'text-white' 
        })}
      </div>
      
      {/* Text Area */}
      <div>
        <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-1">{value}</h3>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        {subtext && <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
};
