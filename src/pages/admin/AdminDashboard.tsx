import React from 'react';
import SEO from './components/SEO';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from 'lucide-react';

// Dummy Data for Charts
const AUDIENCE_DATA = [
  { name: 'OCT 15', uv: 4000, pv: 2400 },
  { name: 'OCT 16', uv: 3000, pv: 1398 },
  { name: 'OCT 17', uv: 2000, pv: 3800 },
  { name: 'OCT 18', uv: 2780, pv: 3908 },
  { name: 'OCT 19', uv: 1890, pv: 4800 },
  { name: 'OCT 20', uv: 2390, pv: 3800 },
  { name: 'OCT 21', uv: 3490, pv: 4300 },
  { name: 'OCT 22', uv: 4000, pv: 2400 },
  { name: 'OCT 23', uv: 3000, pv: 1398 },
  { name: 'OCT 24', uv: 2000, pv: 9800 },
  { name: 'OCT 25', uv: 2780, pv: 3908 },
  { name: 'OCT 26', uv: 1890, pv: 4800 },
];

const LAST_WEEK_DATA = [
  { day: 'Mon', new: 50, old: 20 },
  { day: 'Tue', new: 60, old: 30 },
  { day: 'Wed', new: 70, old: 25 },
  { day: 'Thu', new: 65, old: 15 },
  { day: 'Fri', new: 55, old: 35 },
  { day: 'Sat', new: 75, old: 40 },
  { day: 'Sun', new: 60, old: 45 },
];

const AdminDashboard: React.FC = () => {
  return (
    <>
      <SEO 
        title="Admin Dashboard" 
        description="Master Admin Overview" 
      />
      
      <div className="space-y-6">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Revenue Card - Blue */}
           <div className="bg-[#3b82f6] rounded-xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-900/20">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-medium opacity-90">Revenue</h3>
                 <button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded transition-colors">
                   View
                 </button>
              </div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-bold">$845,1258</h2>
                 <p className="text-blue-100 text-sm flex items-center gap-1 opacity-90">
                   %18 decrease from last month
                 </p>
              </div>
           </div>

           {/* Orders Card - Teal */}
           <div className="bg-[#14b8a6] rounded-xl p-6 text-white relative overflow-hidden shadow-lg shadow-teal-900/20">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-medium opacity-90">Orders</h3>
                 <button className="bg-teal-600 hover:bg-teal-700 text-xs px-3 py-1 rounded transition-colors">
                   View
                 </button>
              </div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-bold">159,1258</h2>
                 <p className="text-teal-100/90 text-sm flex items-center gap-1">
                   <ArrowDownRight size={16} className="text-red-200" />
                   %95 down
                 </p>
              </div>
           </div>

           {/* Visitors Card - Slate/BlueGrey */}
           <div className="bg-[#64748b] rounded-xl p-6 text-white relative overflow-hidden shadow-lg shadow-slate-900/20">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-medium opacity-90">Visitors</h3>
                 <button className="bg-slate-600 hover:bg-slate-700 text-xs px-3 py-1 rounded transition-colors">
                   View
                 </button>
              </div>
              <div className="space-y-1">
                 <h2 className="text-3xl font-bold">84,9658</h2>
                 <p className="text-slate-100/90 text-sm flex items-center gap-1">
                   <ArrowUpRight size={16} className="text-green-300" />
                   %54 up
                 </p>
              </div>
           </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Audience Chart (Main Area) */}
           <div className="lg:col-span-2 bg-[#1e293b] rounded-xl p-6 border border-white/5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                 <h2 className="text-white text-lg font-medium">Audience</h2>
                 <div className="flex gap-2">
                    <button className="text-xs text-gray-400 hover:text-white px-3 py-1 bg-white/5 rounded">Month</button>
                    <button className="text-xs text-blue-400 px-3 py-1 bg-blue-500/10 rounded border border-blue-500/20">Week</button>
                 </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Users</p>
                    <p className="text-xl font-bold text-white">15,125</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Bounce Rate</p>
                    <p className="text-xl font-bold text-white">25.50%</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Page Views</p>
                    <p className="text-xl font-bold text-white">75,951</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Sessions</p>
                    <p className="text-xl font-bold text-white">14,125</p>
                 </div>
              </div>

              {/* Audience Chart */}
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={AUDIENCE_DATA}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#94a3b8', fontSize: 10}} 
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#94a3b8', fontSize: 10}} 
                    />
                    <Tooltip 
                       contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}}
                       itemStyle={{color: '#fff'}}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="uv" 
                       stroke="#ec4899" 
                       strokeWidth={2}
                       fillOpacity={1} 
                       fill="url(#colorUv)" 
                    />
                    <Area 
                       type="monotone" 
                       dataKey="pv" 
                       stroke="#3b82f6" 
                       strokeWidth={2}
                       fillOpacity={1} 
                       fill="url(#colorPv)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Last Week Chart (Sidebar) */}
           <div className="bg-[#1e293b] rounded-xl p-6 border border-white/5 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-white text-lg font-medium">Last Week</h2>
                 <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={20} />
                 </button>
              </div>

              {/* Legend manually styled to match */}
              <div className="flex items-center gap-4 mb-6 text-xs">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-red-500"></div>
                    <span className="text-gray-400">New User</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-blue-500"></div>
                    <span className="text-gray-400">Old User</span>
                 </div>
              </div>

              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={LAST_WEEK_DATA} barGap={4}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis 
                         dataKey="day" 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{fill: '#94a3b8', fontSize: 10}} 
                         dy={10}
                      />
                      <YAxis 
                         axisLine={false} 
                         tickLine={false} 
                         tick={{fill: '#94a3b8', fontSize: 10}} 
                      />
                      <Tooltip 
                         cursor={{fill: 'rgba(255,255,255,0.05)'}}
                         contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}}
                      />
                      <Bar dataKey="new" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={8} />
                      <Bar dataKey="old" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={8} />
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
