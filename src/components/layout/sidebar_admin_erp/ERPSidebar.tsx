import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart2, 
  CheckSquare, 
  FileText, 
  Settings, 
  MessageSquare, 
  Lock, 
  ChevronRight, 
  Package,
  Truck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface MenuItem {
  label: string;
  link?: string;
  icon?: React.ReactNode;
  submenu?: boolean;
  submenuItems?: MenuItem[];
  activePaths?: string[];
}

interface SidebarSection {
  label: string;
  items: MenuItem[];
}

// --- Data ---
const SIDEBAR_DATA: SidebarSection[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Global Dashboard',
        link: '/admin/erp',
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: 'Logistics Center',
        link: '/admin/LogisticsDashboard',
        icon: <Truck size={20} />,
      },
      {
        label: 'Performance',
        link: '/admin/analytics',
        icon: <BarChart2 size={20} />,
      }
    ]
  },
  {
    label: 'Operations',
    items: [
      {
        label: 'Inventory',
        link: '/admin/tables',
        icon: <Package size={20} />,
      },
      {
        label: 'Forms & Workflow',
        link: '/admin/forms',
        icon: <FileText size={20} />,
        submenu: true,
        submenuItems: [
          { label: 'Form Elements', link: '/admin/forms/elements' },
          { label: 'Form Layout', link: '/admin/forms/layout' }
        ]
      },
      {
        label: 'Task Management',
        link: '/admin/task',
        icon: <CheckSquare size={20} />,
      }
    ]
  },
  {
    label: 'Management',
    items: [
      {
        label: 'System Messages',
        link: '/admin/messages',
        icon: <MessageSquare size={20} />,
      },
      {
        label: 'Authentication',
        link: '/admin/auth',
        icon: <Lock size={20} />,
        submenu: true,
        submenuItems: [
          { label: 'Sign In', link: '/admin/auth/signin' },
          { label: 'Sign Up', link: '/admin/auth/signup' }
        ]
      },
      {
        label: 'Global Settings',
        link: '/admin/settings',
        icon: <Settings size={20} />,
      }
    ]
  }
];

interface ERPSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

const ERPSidebar: React.FC<ERPSidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(['Overview']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const normalizePath = (path: string = ''): string => path.replace(/\/+$/, '');

  const isItemActive = useCallback((item: MenuItem): boolean => {
    if (!item?.link) return false;
    const currentPath = normalizePath(location.pathname);
    const itemPath = normalizePath(item.link);

    if (itemPath === '/admin-system' || itemPath === '/admin-system/erp') {
      return currentPath === '/admin-system' || currentPath === '/admin-system/erp';
    }

    if (currentPath === itemPath) return true;
    
    if (item.submenuItems?.some(sub => isItemActive(sub))) return true;

    return false;
  }, [location.pathname]);

  useEffect(() => {
    const newOpenMenus: string[] = [];
    SIDEBAR_DATA.forEach(section => {
      section.items.forEach(item => {
        if (item.submenuItems?.some(sub => isItemActive(sub))) {
          newOpenMenus.push(item.label);
        }
      });
    });
    setOpenMenus(prev => Array.from(new Set([...prev, ...newOpenMenus])));
  }, [location.pathname, isItemActive]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Aside */}
      <motion.aside 
        className={`
          fixed inset-y-0 left-0 z-[70]
          w-72 bg-white border-r border-slate-200
          flex flex-col shadow-xl lg:shadow-none
        `}
        initial={false}
        animate={{ x: isMobileOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : "-100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#3b82f6] flex items-center justify-center shadow-md">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <h1 className="font-black text-lg tracking-tighter text-slate-800 uppercase italic">COOL<span className="text-slate-400 font-bold ml-1">ADMIN</span></h1>
          </div>
          
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-md text-slate-400"
          >
            <ChevronRight className="rotate-180" size={18} />
          </button>
        </div>

        {/* Navigation Content */}
        <nav ref={scrollRef} className="flex-1 overflow-y-auto pt-6 pb-12 px-4 space-y-1 custom-scrollbar">
          {SIDEBAR_DATA.map((section, sIdx) => {
            return (
              <div key={sIdx} className="mb-6">
                <h2 className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {section.label}
                </h2>
                <ul className="space-y-0.5">
                  {section.items.map((item, iIdx) => {
                    const isActive = isItemActive(item);
                    const isExpanded = openMenus.includes(item.label);

                    return (
                      <li key={iIdx}>
                        {item.submenu ? (
                          <div className="relative">
                            <button
                              onClick={() => toggleMenu(item.label)}
                              className={`
                                w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group
                                ${isActive || isExpanded
                                  ? 'text-blue-600 font-bold bg-blue-50/50' 
                                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }
                              `}
                            >
                              <div className="flex items-center gap-4">
                                <span className={`${isActive || isExpanded ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`}>
                                  {item.icon}
                                </span>
                                <span className="text-sm tracking-tight">{item.label}</span>
                              </div>
                              <ChevronRight 
                                size={14} 
                                className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                              />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="ml-10 mt-1 space-y-0.5 overflow-hidden border-l border-slate-100"
                                >
                                  {item.submenuItems?.map((sub, subIdx) => {
                                    const isSubActive = isItemActive(sub);
                                    return (
                                      <li key={subIdx}>
                                        <Link
                                          to={sub.link || '#'}
                                          onClick={() => {
                                            if (window.innerWidth < 1024) setIsMobileOpen(false);
                                          }}
                                          className={`
                                            block px-4 py-2 text-sm font-medium transition-all duration-200
                                            ${isSubActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-blue-600'}
                                          `}
                                        >
                                          {sub.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            to={item.link || '#'}
                            onClick={() => {
                              if (window.innerWidth < 1024) setIsMobileOpen(false);
                            }}
                            className={`
                              flex items-center gap-4 px-4 py-2.5 rounded-lg transition-all duration-200 group
                              ${isActive 
                                ? 'text-blue-600 font-bold bg-blue-50/50' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                              }
                            `}
                          >
                            <span className={`${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`}>
                              {item.icon}
                            </span>
                            <span className="text-sm tracking-tight">{item.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </motion.aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.1); }
      `}</style>
    </>
  );
};

export default ERPSidebar;
