import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Store, 
  Package, 
  ScanLine, 
  BarChart3, 
  ShoppingCart,
  LogOut, 
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const DistributorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Header / Navbar */}
      <header className="h-16 border-b border-[var(--border)] bg-[var(--card)] sticky top-0 z-50">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="h3 logo-text text-xl">Zota Distributor</h1>
            <nav className="hidden md:flex items-center gap-1">
              <NavItem to="/distributor/marketplace" icon={<Store size={18} />} label="Sourcing" />
              <NavItem to="/distributor/warehouse" icon={<Package size={18} />} label="My Warehouse" />
              <NavItem to="/distributor/pos" icon={<ScanLine size={18} />} label="POS" />
              <NavItem to="/distributor/crm" icon={<User size={18} />} label="CRM" />
              <NavItem to="/distributor/reports" icon={<BarChart3 size={18} />} label="Reports" />
            </nav>
          </div>

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm" className="relative">
               <ShoppingCart size={20} />
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] rounded-full flex items-center justify-center">2</span>
             </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
              <div className="text-right hidden sm:block">
                <NavLink to="/distributor/profile" className="text-sm font-medium hover:text-[var(--primary)] block">{user?.name}</NavLink>
                <p className="text-xs text-[var(--muted-foreground)] capitalize">{user?.role}</p>
              </div>
               <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive 
            ? "text-[var(--primary)] bg-[var(--primary)]/10" 
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};
