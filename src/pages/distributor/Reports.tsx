import React from 'react';
import { Card } from '../../components/ui/Card';
import { ArrowDown, DollarSign, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const data = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="h2">Financial Reports</h1>
        <p className="text-[var(--muted-foreground)]">Track your revenue, profit, and growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" icon={<DollarSign />} positive />
        <StatCard title="Net Profit" value="$12,234.00" change="+15% from last month" icon={<Wallet />} positive />
        <StatCard title="Operating Costs" value="$5,231.89" change="-4% from last month" icon={<ArrowDown />} positive={false} />
      </div>

      <Card className="p-6">
        <h3 className="h3 mb-6">Revenue Growth</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

const StatCard = ({ title, value, change, icon, positive }: { title: string, value: string, change: string, icon: React.ReactNode, positive: boolean }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${positive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
        {icon}
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
        {positive ? '+' : ''}{change}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-1">{value}</h3>
    <p className="text-sm text-[var(--muted-foreground)]">{title}</p>
  </Card>
);
