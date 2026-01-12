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
  User,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import "./css/index.css";
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
      },
      {
        label: 'ERP Dashboard',
        link: '/admin/erp',
        icon: <Activity size={20} />,
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

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <Box className="admin-wrapper">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-[1200] backdrop-blur-[4px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "admin-sidebar",
          !isDesktop && !isMobileOpen && "mobile-closed"
        )}
        initial={false}
        animate={{ x: isDesktop || isMobileOpen ? 0 : -288 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      >
        {/* Logo */}
        <Box className="admin-logo-area">
          <Box>
            <Typography variant="h6" className="font-bold text-white mb-0" style={{ fontSize: '1.25rem' }}>
              Hiweb Admin
            </Typography>
            <Typography variant="caption" className="text-fuchsia-300 uppercase tracking-widest font-semibold m-0">
              ERP System v1.0
            </Typography>
          </Box>
        </Box>

        {/* Sidebar content */}
        <Box component="nav" className="admin-nav custom-scrollbar" ref={scrollRef}>
          {SidebarData.map((section, idx) => (
            <Box key={idx} className="mb-6">
              <Typography variant="subtitle2" className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2 px-3">
                {section.label}
              </Typography>
              <Box className="space-y-1">
                {section.submenuItems?.map((item) => {
                  const isActive = isMenuItemActive(item);
                  const isExpanded = openMain === item.label;

                  return (
                    <Box key={item.label}>
                      {item.submenu ? (
                        <Box>
                          <IconButton
                            onClick={() => toggleMain(item.label)}
                            disableRipple
                            className={cn(
                              "admin-menu-item w-full justify-between",
                              (isActive || isExpanded) && "active"
                            )}
                            sx={{
                              borderRadius: "12px",
                              justifyContent: "flex-start",
                              color: "inherit",
                              px: 2,
                              py: 1.5,
                            }}
                          >
                            <Box className="flex items-center gap-3">
                              <Box className="flex items-center justify-center">
                                {item.icon}
                              </Box>
                              <Typography fontSize={14} fontWeight={500}>
                                {item.label}
                              </Typography>
                            </Box>

                            <ChevronDown
                              size={14}
                              className={cn(
                                "transition-transform duration-300",
                                isExpanded && "rotate-180 text-fuchsia-400"
                              )}
                            />
                          </IconButton>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "circOut" }}
                                className="overflow-hidden mt-2"
                              >
                                <div className="mx-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-1">
                                  {item.submenuItems?.map((sub) => {
                                    const isSubActive = isMenuItemActive(sub);

                                    return (
                                      <motion.div
                                        key={sub.label}
                                        whileHover={{ x: 6 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <Box
                                          component={Link}
                                          to={sub.link || "#"}
                                          className={cn(
                                            "admin-menu-item text-sm",
                                            isSubActive && "active"
                                          )}
                                          sx={{
                                            textDecoration: "none",
                                            mx: 0.5,
                                          }}
                                        >
                                          {/* Dot indicator */}
                                          <span
                                            className={cn(
                                              "w-1.5 h-1.5 rounded-full",
                                              isSubActive
                                                ? "bg-fuchsia-400 shadow-[0_0_6px_rgba(232,121,249,0.8)]"
                                                : "bg-slate-600"
                                            )}
                                          />
                                          <span>{sub.label}</span>
                                        </Box>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </Box>
                      ) : (
                        <Box
                          component={Link}
                          to={item.link || "#"}
                          onClick={() => {
                            if (!isDesktop) setIsMobileOpen(false);
                          }}
                          className={cn(
                            "admin-menu-item",
                            isActive && "active"
                          )}
                          sx={{ textDecoration: 'none' }}
                        >
                          <Box className="flex items-center justify-center">
                            {item.icon}
                          </Box>
                          <Typography className="text-sm font-inherit">{item.label}</Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>

        {/* User footer */}
        <Box className="p-4 border-t border-white/10 bg-black/20">
          <Box className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <Avatar
              src="https://ui-avatars.com/api/?name=Admin+User&background=random"
              alt="Admin"
              sx={{ width: 40, height: 40 }}
            />
            <Box className="flex-1 min-w-0">
              <Typography className="text-sm font-semibold truncate leading-none mb-1">Admin User</Typography>
              <Typography className="text-[10px] text-slate-400 truncate uppercase tracking-tighter">admin@hiweb.com</Typography>
            </Box>
          </Box>
        </Box>
      </motion.aside>

      {/* Main Content */}
      <Box className="admin-content">
        {/* Header */}
        <AppBar position="static" className="admin-header" elevation={0} sx={{ bgcolor: 'transparent', backdropFilter: 'none' }}>
          <Toolbar disableGutters className="w-full h-full flex items-center justify-between px-0">
            <Box className="flex items-center gap-4">
              <IconButton
                className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                onClick={toggleMobileSidebar}
              >
                <Menu size={24} />
              </IconButton>
              <Typography variant="h6" className="text-lg font-bold text-white">Dashboard</Typography>
            </Box>

            <Box className="flex items-center gap-4">
              <IconButton className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <Box component="span" className="absolute top-2 right-2 w-2 h-2 bg-fuchsia-500 rounded-full border-2 border-[#2e1065]"></Box>
              </IconButton>
              <Avatar
                src="https://ui-avatars.com/api/?name=Admin+User"
                alt="Profile"
                sx={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,0.2)' }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box component="main" className="admin-main">
          <Outlet />
        </Box>
      </Box>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>
    </Box>
  );
};

export default HiwebSidebar;
