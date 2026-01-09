import React from 'react';
import { TrendingDown } from 'lucide-react';

export const AnalyticsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 border border-white/10 shadow-lg shadow-pink-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">Analytics</h3>
        <button className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-full transition-all flex items-center gap-2">
          Report
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <TrendingDown className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <p className="text-4xl font-bold text-white">12,515</p>
          <p className="text-sm text-white/80 mt-1">Analytics in the last year</p>
        </div>
      </div>
    </div>
  );
};
