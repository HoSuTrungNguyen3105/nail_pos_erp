import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

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
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Detailed Statistics</h3>
          <p className="text-sm text-slate-400">Performance metrics over time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/5">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'sales', label: 'Sales' },
              { id: 'revenue', label: 'Revenue' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="hidden sm:flex px-3 py-1.5 text-sm border border-white/10 text-slate-300 rounded-xl hover:bg-white/5 hover:text-white items-center gap-2 transition-colors">
            <Calendar size={16} />
            <span>Mar 6 - Mar 12</span>
          </button>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={STATISTICS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e1b4b', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                color: '#fff'
              }}
              cursor={{ stroke: 'rgba(217, 70, 239, 0.5)', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#d946ef" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
