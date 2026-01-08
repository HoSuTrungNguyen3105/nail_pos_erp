import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  AppWindow,
  Mail,
  Layers,
  Box,
  FileText,
  Lock,
  Menu,
  Search,
  User,
  Settings,
  Grid,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { RealTimeNotifications } from '../dashboard/RealTimeNotifications';

// Navigation Groups for TailAdmin-style sidebar
const NAV_GROUPS = [
  {
    title: 'MENU',
    items: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { to: '/admin/apps', label: 'eCommerce', icon: AppWindow },
      { to: '/admin/mailbox', label: 'Analytics', icon: Mail, badge: 'PRO' },
    ]
  },
  {
    title: 'TASK',
    items: [
      { to: '/admin/task', label: 'Task', icon: Layers },
      { to: '/admin/forms', label: 'Forms', icon: FileText },
    ]
  },
  {
    title: 'PAGES',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: Settings },
      { to: '/admin/tables', label: 'Tables', icon: Grid },
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      { to: '/admin/messages', label: 'Messages', icon: Mail },
      { to: '/admin/auth', label: 'Authentication', icon: Lock },
    ]
  }
];

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-72 lg:hidden"
            >
               <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white flex-col border-r border-gray-200 z-10 shrink-0">
         <SidebarContent />
      </aside>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0 z-20">
           <div className="flex items-center gap-4 flex-1">
              <Button variant="ghost" size="sm" className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100" onClick={() => setOpen(true)}>
                <Menu size={24} />
              </Button>
              
              {/* Search Bar */}
              <div className="relative hidden md:block w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Type to search..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <span className="text-sm">Eng</span>
                <ChevronDown size={16} />
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 17v-3a2 2 0 00-2-2H7a2 2 0 00-2 2v3M10 9a3 3 0 100-6 3 3 0 000 6z"/>
                </svg>
              </button>
              
              <div className="relative">
                <RealTimeNotifications />
              </div>
              
              {/* User Profile */}
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Musharof</p>
                  <p className="text-xs text-gray-500">UX Designer</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
           </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 relative">
          <div className="p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = () => (
  <div className="h-full bg-white flex flex-col">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M10 2L3 7v6c0 3.5 2.5 6.5 7 8 4.5-1.5 7-4.5 7-8V7l-7-5z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">TailAdmin</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
         {NAV_GROUPS.map((group, idx) => (
           <div key={idx}>
             <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 px-3">
               {group.title}
             </h4>
             <div className="space-y-1">
               {group.items.map(item => (
                 <NavItem key={item.to} {...item} />
               ))}
             </div>
           </div>
         ))}
      </div>
      
      {/* Promo Card */}
      <div className="p-4 m-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white">
        <div className="mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
          <p className="text-xs text-blue-100 mb-3">Get 1 month free and unlock all features</p>
        </div>
        <button className="w-full bg-white text-blue-600 text-sm font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
          Upgrade Now
        </button>
      </div>
  </div>
);

const NavItem = ({ to, icon: Icon, label, exact, badge }: any) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      cn(
        'group relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200',
        isActive
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      )
    }
  >
    {({ isActive }) => (
      <>
        <div className="flex items-center gap-3">
          <Icon
            size={18}
            className={cn(
              'shrink-0 transition-colors',
              isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            )}
          />
          <span className="truncate">{label}</span>
        </div>
        
        {badge && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-blue-600 text-white rounded">
            {badge}
          </span>
        )}
        
        {isActive && (
          <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[3px] bg-blue-600 rounded-l" />
        )}
      </>
    )}
  </NavLink>
);
