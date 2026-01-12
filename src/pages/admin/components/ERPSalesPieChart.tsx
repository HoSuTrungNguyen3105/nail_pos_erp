import React from 'react';
import { 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';

const DONUT_DATA = [
  { name: 'Products', value: 65, color: '#0ea5e9' },
  { name: 'Services', value: 35, color: '#ef4444' },
];

const ERPSalesPieChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col">
      <h2 className="text-xl font-bold text-slate-800 mb-8">Char By %</h2>
      
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DONUT_DATA}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={0}
              dataKey="value"
            >
              {DONUT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-4">
        {DONUT_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm font-semibold text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-slate-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERPSalesPieChart;
