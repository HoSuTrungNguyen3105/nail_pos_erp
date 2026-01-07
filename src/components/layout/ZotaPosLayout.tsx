import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { 
  Menu, Home
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const ZotaPosLayout = () => {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      {/* Header Bar matching image */}
      <header className="h-[60px] bg-[#1e1b4b] flex items-center justify-between px-4 shrink-0 shadow-lg z-50">
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
             <Menu size={24} />
           </Button>
           <div className="flex flex-col">
             <span className="font-bold text-lg tracking-wide">ZOTA</span>
             <span className="text-[10px] text-gray-400 -mt-1 tracking-widest">PAYMENT SERVICES</span>
           </div>
        </div>

        {/* Center Info */}
        <div className="flex-1 flex justify-center items-center border-x border-white/10 h-full mx-4 px-4 bg-white/5">
           <div className="text-center">
             <p className="text-sm font-medium opacity-80">FUNCTIONS</p>
             <p className="text-xs opacity-60">10:02:48 AM - #1 (QA)</p>
           </div>
        </div>

        {/* Right Actions */}
        <nav className="flex items-center h-full">
          <TopNavItem label="BALANCE" />
          <TopNavItem label="WAIT" active />
          <TopNavItem label="APPT BOOK" />
          <TopNavItem label="FAST SALE" />
          <Button variant="ghost" size="sm" className="ml-2 text-white hover:bg-white/10" onClick={() => navigate('/distributor/marketplace')}>
             <Home size={20} />
          </Button>
        </nav>
      </header>

      {/* Main Content Area (Gradient Background) */}
      <main className="flex-1 p-4 overflow-hidden relative">
        {/* Background Hexagon Graphic (Simulated with CSS/SVG) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
           <svg viewBox="0 0 200 200" width="600" height="600" xmlns="http://www.w3.org/2000/svg">
             <path fill="#ffffff" d="M100,0 L186.6,50 L186.6,150 L100,200 L13.4,150 L13.4,50 Z" />
           </svg>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

const TopNavItem = ({ label, active }: { label: string; active?: boolean }) => (
  <button className={cn(
    "h-full px-6 text-sm font-bold tracking-wider transition-colors border-r border-white/10",
    active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
  )}>
    {label}
  </button>
);
