import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {Package, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'order', title: 'New Order Received', message: 'You have a new order #2024882 from Elite Spa.', time: '2 mins ago', read: false },
    { id: 2, type: 'stock', title: 'Low Stock Alert', message: 'Gel Polish - Ruby Red is below threshold (5 remaining).', time: '1 hour ago', read: false },
    { id: 3, type: 'system', title: 'System Update', message: 'The platform will undergo maintenance at 2:00 AM.', time: '5 hours ago', read: true },
    { id: 4, type: 'success', title: 'Payment Successful', message: 'Payment for Order #2024880 was confirmed.', time: '1 day ago', read: true },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2">Notifications</h1>
          <p className="text-[var(--muted-foreground)]">Stay updated with important alerts.</p>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`p-4 flex gap-4 ${notif.read ? 'opacity-70' : 'border-l-4 border-l-[var(--primary)]'}`}>
            <div className={`p-2 rounded-full h-fit flex-shrink-0 ${
              notif.type === 'order' ? 'bg-blue-500/10 text-blue-500' :
              notif.type === 'stock' ? 'bg-red-500/10 text-red-500' :
              notif.type === 'success' ? 'bg-green-500/10 text-green-500' :
              'bg-[var(--muted)] text-[var(--muted-foreground)]'
            }`}>
              {notif.type === 'order' ? <Package size={20} /> :
               notif.type === 'stock' ? <AlertTriangle size={20} /> :
               notif.type === 'success' ? <CheckCircle size={20} /> :
               <Info size={20} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-medium ${!notif.read && 'text-[var(--foreground)]'}`}>{notif.title}</h3>
                <span className="text-xs text-[var(--muted-foreground)]">{notif.time}</span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">{notif.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
