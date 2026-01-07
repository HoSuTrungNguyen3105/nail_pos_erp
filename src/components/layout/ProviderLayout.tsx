import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
  Settings,
  Menu,
  X,
  Plus,
  Search,
  Bell,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { RealTimeNotifications } from '../dashboard/RealTimeNotifications';

const NAV_ITEMS = [
  { to: '/provider/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/provider/products', label: 'Products', icon: Package },
  { to: '/provider/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/provider/distributors', label: 'Distributors', icon: Users },
  { to: '/provider/reports', label: 'Reports', icon: BarChart3 },
];

export const ProviderLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const pageTitle =
    NAV_ITEMS.find(i => location.pathname.startsWith(i.to))?.label || 'Overview';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Top Header - Full Width */}
      <header className="h-16 bg-[#1e1b4b] text-white flex items-center justify-between px-4 lg:px-8 shrink-0 shadow-md z-50">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-white/10" onClick={() => setOpen(true)}>
              <Menu size={24} />
            </Button>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] rounded-lg flex items-center justify-center font-bold text-lg">Z</div>
               <div>
                 <h1 className="text-lg font-bold tracking-wide leading-none">Zota Provider</h1>
                 <p className="text-[10px] text-white/60 tracking-widest uppercase">Nail Supply Management</p>
               </div>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
            <RealTimeNotifications />
            <div className="hidden lg:block text-right mr-2">
               <p className="text-sm font-bold text-white">{user?.name}</p>
               <p className="text-xs text-white/60 capitalize">{user?.role}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
               <Settings size={20} />
            </Button>
         </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-40 w-64 pt-16 lg:hidden"
            >
               <div className="h-full bg-gradient-to-b from-[#2e1065] to-[#4c1d95] shadow-2xl border-r border-white/10 flex flex-col">
                  {/* Close Button for Mobile */}
                  <div className="absolute top-4 right-4 lg:hidden">
                    <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="text-white">
                      <X size={20} />
                    </Button>
                  </div>
                  <SidebarNav />
                  <SidebarFooter onLogout={handleLogout} />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-gradient-to-b from-[#2e1065] to-[#4c1d95] flex-col border-r border-white/10 shadow-xl z-10">
           <div className="flex-1 py-6 space-y-6">
              <SidebarNav />

              {/* Quick Actions */}
              <div className="px-3">
                <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <QuickActionButton
                    icon={<Plus size={16} />}
                    label="New Product"
                    onClick={() => navigate('/provider/products')}
                  />
                  <QuickActionButton
                    icon={<ShoppingCart size={16} />}
                    label="Process Orders"
                    onClick={() => navigate('/provider/orders')}
                    badge="3"
                  />
                  <QuickActionButton
                    icon={<AlertTriangle size={16} />}
                    label="Stock Alerts"
                    onClick={() => navigate('/provider/inventory')}
                    urgent
                  />
                  <QuickActionButton
                    icon={<TrendingUp size={16} />}
                    label="View Reports"
                    onClick={() => navigate('/provider/reports')}
                  />
                </div>
              </div>

              {/* System Status */}
              <div className="px-3">
                <h4 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                  System Status
                </h4>
                <div className="bg-white/5 rounded-lg p-3 mx-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Server Status</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Last Sync</span>
                    <span className="text-white/60 text-xs">2 min ago</span>
                  </div>
                </div>
              </div>
           </div>
           <SidebarFooter onLogout={handleLogout} />
        </aside>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 relative">
          {/* Page Title - có padding riêng để đẹp */}
          <div className="px-6 lg:px-8 pt-6 mb-6">
            <h2 className="text-2xl font-bold text-[#1e1b4b]">{pageTitle}</h2>
          </div>

          {/* Outlet - full width 100%, không padding, không wrapper thừa */}
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarNav = () => (
  <nav className="px-3 space-y-1">
    {NAV_ITEMS.map(item => (
      <NavItem key={item.to} {...item} />
    ))}
  </nav>
);

const SidebarFooter = ({ onLogout }: { onLogout: () => void }) => (
  <div className="p-4 border-t border-white/10 bg-black/20">
    <Button
       variant="ghost"
       className="w-full justify-start text-red-300 hover:bg-red-500/20 hover:text-red-100"
       onClick={onLogout}
    >
      <LogOut size={18} className="mr-2" />
      Logout
    </Button>
  </div>
);

const NavItem = ({ to, icon: Icon, label }: any) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        'group relative flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors',
        isActive
          ? 'bg-white/5 text-white font-semibold'
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      )
    }
  >
    {({ isActive }) => (
      <>
        {/* ERP-style indicator */}
        {isActive && (
          <span className="absolute left-0 top-0 h-full w-[3px] bg-[#d946ef] rounded-r" />
        )}

        <Icon
          size={16}
          className={cn(
            'shrink-0',
            isActive ? 'text-[#d946ef]' : 'text-white/60'
          )}
        />

        <span className="truncate">{label}</span>
      </>
    )}
  </NavLink>
);

const QuickActionButton = ({ icon, label, onClick, badge, urgent }: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: string;
  urgent?: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
      urgent
        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30'
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    )}
  >
    <div className={cn(
      'p-1.5 rounded-md',
      urgent ? 'bg-red-500/20' : 'bg-white/10'
    )}>
      {icon}
    </div>
    <span className="truncate flex-1 text-left">{label}</span>
    {badge && (
      <span className={cn(
        'px-2 py-0.5 text-xs rounded-full',
        urgent ? 'bg-red-500 text-white' : 'bg-[#d946ef] text-white'
      )}>
        {badge}
      </span>
    )}
  </button>
);
