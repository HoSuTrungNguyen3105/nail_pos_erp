import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Package,
  Users,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface RealTimeNotificationsProps {
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
}

export const RealTimeNotifications = ({
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead
}: RealTimeNotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Ruby Red Gel Polish is running low (12 units remaining)',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: '/inventory',
      actionLabel: 'View Inventory'
    },
    {
      id: '2',
      type: 'success',
      title: 'Order Completed',
      message: 'Order #MB-2024 has been fulfilled and shipped',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'New Distributor Application',
      message: 'Luxury Nails Inc. has submitted an application',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      actionUrl: '/distributors/applications',
      actionLabel: 'Review Application'
    }
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        {
          type: 'success' as const,
          title: 'Payment Received',
          message: `$${Math.floor(Math.random() * 500) + 100} payment received from customer`
        },
        {
          type: 'info' as const,
          title: 'New Order',
          message: 'New order placed in your marketplace'
        },
        {
          type: 'warning' as const,
          title: 'Stock Alert',
          message: 'Product stock level is below threshold'
        }
      ];

      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomEvent,
        timestamp: new Date(),
        read: false
      };

      setLiveNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setNotifications(prev => [newNotification, ...prev]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'error': return <AlertTriangle size={16} className="text-red-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    onMarkAsRead?.(id);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    onMarkAllAsRead?.();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Live Notification Toast */}
      <AnimatePresence>
        {liveNotifications.length > 0 && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <Card className="p-4 border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                {getIcon(liveNotifications[0].type)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{liveNotifications[0].title}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {liveNotifications[0].message}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    Just now
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiveNotifications([])}
                  className="w-6 h-6 p-0"
                >
                  <X size={14} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Dropdown */}
      {showDropdown && (
        <Card className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-hidden z-40">
          <div className="p-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-[var(--muted-foreground)]">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-[var(--border)] hover:bg-[var(--muted)]/20 cursor-pointer ${
                    !notification.read ? 'bg-blue-500/5' : ''
                  }`}
                  onClick={() => {
                    onNotificationClick?.(notification);
                    markAsRead(notification.id);
                  }}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[var(--muted-foreground)]">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        {notification.actionLabel && (
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            {notification.actionLabel}
                          </Button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-[var(--border)]">
            <Button variant="ghost" size="sm" className="w-full justify-center">
              View All Notifications
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};