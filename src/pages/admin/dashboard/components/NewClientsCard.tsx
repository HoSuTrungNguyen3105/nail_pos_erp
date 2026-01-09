import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

export const NewClientsCard: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-teal-500/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold">New Clients</h3>
        <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded-full">
          +3
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-4xl font-bold text-white">18.5%</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="text-teal-400" />
            <p className="text-sm text-teal-400">23.67% increase</p>
          </div>
        </div>
        
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <Users className="w-6 h-6 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
