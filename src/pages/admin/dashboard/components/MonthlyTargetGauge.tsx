import React from 'react';
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

export const MonthlyTargetGauge: React.FC = () => {
  const percentage = 75.55;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Monthly Target</h3>
          <p className="text-sm text-slate-400">Revenue goal progress</p>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="relative w-52 h-52 group">
          {/* Outer glow effect */}
          <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
          
          <svg className="transform -rotate-90 w-52 h-52 relative z-10 drop-shadow-lg">
            {/* Background circle */}
            <circle
              cx="104"
              cy="104"
              r="90"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            {/* Progress circle */}
            <circle
              cx="104"
              cy="104"
              r="90"
              stroke="#2dd4bf"
              strokeWidth="16"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-4xl font-bold text-white tracking-tight">{percentage}%</span>
            <span className="text-sm text-teal-400 font-semibold bg-teal-400/10 px-2 py-0.5 rounded-full mt-1">+10% target</span>
          </div>
        </div>
        <p className="text-sm text-slate-300 text-center mt-6 max-w-xs leading-relaxed">
          You earned <span className="font-bold text-white">$3,287</span> today, higher than last month. 
          <span className="block text-teal-400 mt-1 font-medium">Keep it up! 🚀</span>
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
        <div className="text-center p-2 rounded-xl hover:bg-white/5 transition-colors">
          <p className="text-xs text-slate-400 mb-1 font-medium">Target</p>
          <p className="text-lg font-bold text-white flex items-center justify-center gap-1">
            $20K
            <TrendingDown size={14} className="text-red-400" />
          </p>
        </div>
        <div className="text-center p-2 rounded-xl hover:bg-white/5 transition-colors">
          <p className="text-xs text-slate-400 mb-1 font-medium">Revenue</p>
          <p className="text-lg font-bold text-white flex items-center justify-center gap-1">
            $18K
            <TrendingUp size={14} className="text-teal-400" />
          </p>
        </div>
        <div className="text-center p-2 rounded-xl hover:bg-white/5 transition-colors">
          <p className="text-xs text-slate-400 mb-1 font-medium">Today</p>
          <p className="text-lg font-bold text-white flex items-center justify-center gap-1">
            $3.2K
            <TrendingUp size={14} className="text-teal-400" />
          </p>
        </div>
      </div>
    </div>
  );
};
