import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart2, 
  CheckSquare, 
  FileText, 
  Settings, 
  Table, 
  MessageSquare, 
  Lock, 
  ChevronRight, 
  Menu,
  Bell,
  Search,
  ChevronDown,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// TypeScript interfaces
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
  submenuHdr?: boolean;
  link?: string;
  icon?: React.ReactNode;
  submenuItems?: MenuItem[];
}

// Admin sidebar data with comprehensive routes and Lucide Icons
const SidebarData: SidebarSection[] = [
  {
    label: 'MENU',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Dashboard',
        link: '/admin',
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: 'eCommerce',
        link: '/admin/ecommerce',
        icon: <ShoppingCart size={20} />,
      },
      {
        label: 'Analytics',
        link: '/admin/analytics',
        icon: <BarChart2 size={20} />,
      }
    ]
  },
  {
    label: 'TASK',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Task',
        link: '/admin/task',
        icon: <CheckSquare size={20} />,
      },
      {
        label: 'Forms',
        link: '/admin/forms',
        icon: <FileText size={20} />,
        submenu: true,
        submenuItems: [
          {
            label: 'Form Elements',
            link: '/admin/forms/elements',
          },
          {
            label: 'Form Layout',
            link: '/admin/forms/layout',
          }
        ]
      }
    ]
  },
  {
    label: 'PAGES',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Settings',
        link: '/admin/settings',
        icon: <Settings size={20} />,
      },
      {
        label: 'Tables',
        link: '/admin/tables',
        icon: <Table size={20} />,
      }
    ]
  },
  {
    label: 'SUPPORT',
    submenuHdr: true,
    submenuItems: [
      {
        label: 'Messages',
        link: '/admin/messages',
        icon: <MessageSquare size={20} />,
      },
      {
        label: 'Authentication',
        link: '/admin/auth',
        icon: <Lock size={20} />,
        submenu: true,
        submenuItems: [
          {
            label: 'Sign In',
            link: '/admin/auth/signin',
          },
          {
            label: 'Sign Up',
            link: '/admin/auth/signup',
          }
        ]
      }
    ]
  }
];

const HiwebSidebar: React.FC = () => {
  const location = useLocation();
  const [openMain, setOpenMain] = useState<string>("");
  const [openSub, setOpenSub] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const normalizePath = (path: string = ''): string =>
    path.replace(/\/+$/, '');

  const isMenuItemActive = useCallback((item: MenuItem | SidebarSection): boolean => {
    if (!item?.link) return false;

    const currentPath = normalizePath(location.pathname);

    // Dashboard special case to prevent matching everything
    if (item.link === '/admin') {
      return currentPath === '/admin';
    }

    if (normalizePath(item.link) === currentPath) {
      return true;
    }

    if ('activePaths' in item && item.activePaths?.length) {
      return item.activePaths.some(path => {
        const normalized = normalizePath(path);
        return (
          currentPath === normalized ||
          currentPath.startsWith(normalized + '/')
        );
      });
    }

    return false;
  }, [location.pathname]);

  // Determine if a parent section should be open based on children
  useEffect(() => {
    SidebarData.forEach(section => {
      section.submenuItems?.forEach(item => {
        const isActive = isMenuItemActive(item) || 
          item.submenuItems?.some(sub => isMenuItemActive(sub));
        
        if (isActive) {
          setOpenMain(item.label);
        }

        item.submenuItems?.forEach(sub => {
          if (isMenuItemActive(sub)) {
            setOpenSub(item.label);
          }
        });
      });
    });
  }, [location.pathname, isMenuItemActive]);

  const toggleMain = (label: string) => {
    setOpenMain(prev => prev === label ? "" : label);
  };
  
  const toggleSub = (label: string) => {
    setOpenSub(prev => prev === label ? "" : label);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Modern Theme Colors (matching theme.ts)
  // Primary: #d946ef (Fuchsia 500)
  // Secondary: #2dd4bf (Teal 400)
  // Bg Dark: #2e1065 (Slate 900 / Deep Purple)

  return (
    <div className="flex h-screen bg-[#2e1065] overflow-hidden font-sans text-slate-100">
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-[#2e1065] border-r border-white/10
          flex flex-col
          shadow-2xl shadow-purple-900/20
        `}
        initial={false}
        animate={{ x: isMobileOpen ? 0 : 0 }} 
        // Note: Mobile toggle logic needs to be handled via CSS media queries or width changes if we want to support fully closing on mobile
        style={{ 
          transform: isMobileOpen ? 'translateX(0)' : undefined // Handled by class on desktop
        }}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" }
        }}
        // On mobile, default to closed (need to add logic check for window width usually, but CSS hidden class helps)
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-white">Hiweb Admin</h1>
            <p className="text-xs text-fuchsia-300/80 font-medium">ERP System v1.0</p>
          </div>
        </div>

        {/* Scrollable Nav */}
        <nav ref={scrollRef} className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {SidebarData.map((section, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {section.submenuHdr && (
                <div className="px-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {section.label}
                </div>
              )}

              <ul className="space-y-1">
                {section.submenuItems?.map((item, itemIdx) => {
                  const isActive = isMenuItemActive(item) || 
                    item.submenuItems?.some(sub => isMenuItemActive(sub));
                  const isExpanded = openMain === item.label;

                  return (
                    <li key={itemIdx}>
                      {item.submenu ? (
                        // Parent Item with Submenu
                        <div className="relative">
                          <button
                            onClick={() => toggleMain(item.label)}
                            className={`
                              w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                              ${isActive || isExpanded
                                ? 'bg-white/10 text-white' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`
                                transition-colors duration-200
                                ${isActive ? 'text-fuchsia-400' : 'text-slate-400 group-hover:text-fuchsia-400'}
                              `}>
                                {item.icon}
                              </span>
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <ChevronRight 
                              size={16} 
                              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90 text-fuchsia-400' : 'text-slate-500'}`}
                            />
                          </button>

                          {/* Level 1 Submenu */}
                          <AnimatePresence>
                            {isExpanded && item.submenuItems && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="overflow-hidden pl-4 mt-1 space-y-1 border-l border-white/10 ml-5"
                              >
                                {item.submenuItems.map((sub, subIdx) => {
                                  const isSubActive = isMenuItemActive(sub);
                                  
                                  return (
                                    <li key={subIdx}>
                                      <Link
                                        to={sub.link || '#'}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`
                                          block px-3 py-2 rounded-lg text-sm transition-all duration-200 relative
                                          ${isSubActive 
                                            ? 'text-teal-400 bg-teal-400/10 font-medium' 
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                                          }
                                        `}
                                      >
                                        {sub.label}
                                        {isSubActive && (
                                          <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[17px] w-1.5 h-1.5 rounded-full bg-teal-400"
                                          />
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        // Single Link Item
                        <Link
                          to={item.link || '#'}
                          onClick={() => setIsMobileOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden
                            ${isActive 
                              ? 'bg-gradient-to-r from-fuchsia-500/20 to-transparent text-white' 
                              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                            }
                          `}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-500 rounded-full" />
                          )}
                          <span className={`
                            transition-colors duration-200
                            ${isActive ? 'text-fuchsia-400' : 'text-slate-400 group-hover:text-fuchsia-400'}
                          `}>
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User / Footer Area */}
        <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-900/20 to-purple-900/20 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white overflow-hidden ring-2 ring-white/10">
                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Admin User</p>
                    <p className="text-xs text-slate-400 truncate">admin@hiweb.com</p>
                </div>
                <Settings size={18} className="text-slate-400 hover:text-white cursor-pointer" />
            </div>
        </div>
      </motion.aside>

      {/* Main Content Wrapper (Right Side) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#2e1065] relative">
        {/* Background Gradients for Glassmorphism Effect */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0 z-10 transition-all duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white tracking-tight">Dashboard</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar (Visual) */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 focus-within:bg-white/10 focus-within:border-fuchsia-500/50 transition-all duration-300 w-64">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
              />
            </div>

            <div className="flex items-center gap-4">
               <button className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-purple-900"></span>
               </button>
               <div className="h-8 w-px bg-white/10 mx-1"></div>
               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                     <p className="text-sm font-medium text-white">Admin</p>
                     <p className="text-xs text-fuchsia-400">Super Admin</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 p-[1px] ring-2 ring-white/10">
                    <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <User size={18} className="text-white" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Tailwind & Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(217, 70, 239, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(217, 70, 239, 0.4);
        }
      `}</style>
    </div>
  );
};

export default HiwebSidebar;