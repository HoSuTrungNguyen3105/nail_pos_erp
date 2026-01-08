import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

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
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-lg font-bold text-white tracking-tight">Monthly Sales</h3>
           <p className="text-sm text-slate-400">Revenue overview by month</p>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="month" 
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
              cursor={{ fill: 'rgba(217, 70, 239, 0.1)' }}
              contentStyle={{ 
                backgroundColor: '#1e1b4b', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                color: '#fff'
              }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Bar 
              dataKey="value" 
              fill="#d946ef" 
              radius={[6, 6, 6, 6]} 
              barSize={24}
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
