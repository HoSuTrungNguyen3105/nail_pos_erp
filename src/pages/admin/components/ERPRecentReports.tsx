import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const RECENT_REPORTS_DATA = [
  { name: 'January', products: 45, services: 35 },
  { name: 'February', products: 52, services: 40 },
  { name: 'March', products: 48, services: 65 },
  { name: 'April', products: 70, services: 50 },
  { name: 'May', products: 61, services: 75 },
  { name: 'June', products: 85, services: 60 },
  { name: 'July', products: 75, services: 80 },
];

const ERPRecentReports: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Recent Reports</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#0ea5e9]" />
              <span className="text-xs font-semibold text-slate-500">Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="text-xs font-semibold text-slate-500">Services</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[#10b981] text-sm font-bold flex items-center gap-1 justify-end">
              <span className="text-[10px]">▲</span> 25%
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Products</p>
          </div>
          <div className="text-right">
            <p className="text-[#ef4444] text-sm font-bold flex items-center gap-1 justify-end">
              <span className="text-[10px]">▼</span> 10%
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Services</p>
          </div>
        </div>
      </div>
      
      <div className="p-8 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={RECENT_REPORTS_DATA}>
            <defs>
              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorServ" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 12}} 
            />
            <Tooltip />
            <Area type="monotone" dataKey="products" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
            <Area type="monotone" dataKey="services" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorServ)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ERPRecentReports;
