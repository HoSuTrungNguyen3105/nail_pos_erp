import { Card } from '../../components/ui/Card';
import { BarChart3, TrendingUp, Package, AlertCircle } from 'lucide-react';

export default function ProviderDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$124,592', change: '+12.5%', isPositive: true, icon: <TrendingUp /> },
    { title: 'Pending Orders', value: '42', change: '-2', isPositive: true, icon: <Package /> },
    { title: 'Low Stock Items', value: '15', change: '+5', isPositive: false, icon: <AlertCircle /> },
    { title: 'Distributors', value: '1,284', change: '+8.2%', isPositive: true, icon: <BarChart3 /> },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="h2">Dashboard</h1>
        <p className="text-[var(--muted-foreground)]">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)]">
                {stat.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">{stat.title}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="h3 mb-4">Recent Orders</h3>
          <div className="space-y-4">
             {/* Mock List */}
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)]">
                 <div>
                   <p className="font-medium">Order #MB-202{i}</p>
                   <p className="text-sm text-[var(--muted-foreground)]">Elite Nail Spa (Distributor A)</p>
                 </div>
                 <div className="text-right">
                   <p className="font-bold">$1,250.00</p>
                   <p className="text-xs text-orange-500">Processing</p>
                 </div>
               </div>
             ))}
          </div>
        </Card>
        
        <Card className="p-6">
            <h3 className="h3 mb-4">Low Stock Alerts</h3>
             <div className="space-y-4">
             {/* Mock List */}
             {[1, 2, 3].map((_, i) => (
               <div key={i} className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)] bg-red-500/5">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-200"></div>
                   <div>
                     <p className="font-medium">Gel Polish - Ruby Red</p>
                     <p className="text-xs text-red-500">Only 12 remaining</p>
                   </div>
                 </div>
                 <button className="text-sm text-[var(--primary)] underline">Restock</button>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
