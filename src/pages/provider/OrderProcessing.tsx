// import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Search, Eye, Truck, CheckCircle, Clock } from 'lucide-react';

export default function OrderProcessing() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="h2">Order Processing</h1>
        <p className="text-[var(--muted-foreground)]">Manage incoming orders and shipments.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
            <Input className="pl-10" placeholder="Search orders..." />
          </div>
          <select className="h-10 px-3 rounded-md border border-[var(--input)] bg-transparent text-sm">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center border border-[var(--border)] rounded-lg p-4 gap-4 hover:border-[var(--primary)]/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-lg">Order #ORD-{2024000+i}</span>
                  <StatusBadge status={i === 0 ? 'pending' : i === 1 ? 'processing' : 'shipped'} />
                </div>
                <div className="text-sm text-[var(--muted-foreground)] flex gap-4">
                  <span>From: <strong className="text-[var(--foreground)]">Nail Spa {i+1}</strong></span>
                  <span>Date: Oct 24, 2024</span>
                  <span>Items: 124</span>
                </div>
              </div>
              
              <div className="text-right pr-6 border-r border-[var(--border)] hidden md:block">
                <p className="text-sm text-[var(--muted-foreground)]">Total Amount</p>
                <p className="text-xl font-bold">$1,240.50</p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none">
                  <Eye size={16} className="mr-2" />
                  Details
                </Button>
                 {i === 0 && (
                    <Button className="flex-1 md:flex-none">
                        Accept Order
                    </Button>
                 )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock, label: 'Pending' },
    processing: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: Truck, label: 'Processing' },
    shipped: { bg: 'bg-purple-500/10', text: 'text-purple-500', icon: Truck, label: 'Shipped' },
    delivered: { bg: 'bg-green-500/10', text: 'text-green-500', icon: CheckCircle, label: 'Delivered' },
  }[status] || { bg: 'bg-gray-500/10', text: 'text-gray-500', icon: Clock, label: status };

  const Icon = styles.icon;

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
      <Icon size={12} />
      {styles.label}
    </span>
  );
};
