import React, { useState, useEffect, useCallback, memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  Stack,
} from "@mui/material";
import { AdminMenuItem } from "./AdminMenuItem";
import type { MenuItemData } from "./AdminMenuItem";
import { SidebarData } from "./sidebarData";
import HorizontalSidebar from "../../pages/admin/components/HorizonalSidebar";

const DRAWER_WIDTH = 288;

// Memoized header component for better performance
const AdminHeader = memo<{ onMenuClick: () => void }>(({ onMenuClick }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid', borderColor: 'grey.200' }}>
      <Toolbar sx={{ minHeight: 80, px: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
          {!isDesktop && (
            <IconButton
              onClick={onMenuClick}
              sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(217, 70, 239, 0.04)' } }}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Dashboard
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(217, 70, 239, 0.04)' } }}
            aria-label="Notifications"
          >
            {/* <Badge
              badgeContent={3}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: 'primary.main',
                  border: '2px solid #ffffff',
                },
              }}
            >
              <Bell size={20} />
            </Badge> */}
          </IconButton>
          <Avatar
            src="https://ui-avatars.com/api/?name=Admin+User"
            alt="Admin User"
            sx={{ width: 32, height: 32, border: '1px solid', borderColor: 'grey.200' }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
});

AdminHeader.displayName = 'AdminHeader';

// Memoized sidebar content for better performance
const SidebarContent = memo<{
  openMain: string;
  setOpenMain: React.Dispatch<React.SetStateAction<string>>;
  isMenuItemActive: (item: MenuItemData) => boolean;
  onNavigate?: () => void;
}>(({ openMain, setOpenMain, isMenuItemActive, onNavigate }) => {
  const toggleMain = useCallback((label: string) => {
    setOpenMain((prevOpenMain: string) => prevOpenMain === label ? "" : label);
  }, [setOpenMain]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Area */}
      <Box
        sx={{
          height: 80,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          bgcolor: '#ffffff',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              fontSize: '1.25rem',
              background: 'linear-gradient(90deg, #4f46e5 0%, #d946ef 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Hiweb Admin
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontSize: '0.625rem',
              lineHeight: 1,
            }}
          >
            ERP System v1.0
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 3,
          px: 2,
          bgcolor: '#ffffff',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'grey.300',
            borderRadius: '10px',
            '&:hover': { background: 'grey.400' },
          },
        }}
        aria-label="Main navigation"
      >
        {SidebarData.map((section, idx) => (
          <Box key={idx} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                opacity: 0.7,
                fontWeight: 700,
                px: 1.5,
                mb: 1,
                display: 'block',
              }}
            >
              {section.label}
            </Typography>
            <List component="div" disablePadding>
              {section.submenuItems?.map((item) => {
                const isActive = isMenuItemActive(item);
                const isExpanded = openMain === item.label;

                return (
                  <AdminMenuItem
                    key={item.label}
                    item={item}
                    isActive={isActive}
                    isExpanded={isExpanded}
                    onToggle={() => toggleMain(item.label)}
                    onNavigate={onNavigate}
                    checkIsActive={isMenuItemActive}
                  />
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* User Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'grey.200',
          bgcolor: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '12px',
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Avatar
            src="https://ui-avatars.com/api/?name=Admin+User&background=random"
            alt="Admin User"
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
              Admin User
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                opacity: 0.6,
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              admin@hiweb.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

SidebarContent.displayName = 'SidebarContent';

const HiwebSidebar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [openMain, setOpenMain] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const normalizePath = useCallback((path: string = ''): string =>
    path.replace(/\/+$/, ''), []);

  const isMenuItemActive = useCallback((item: MenuItemData): boolean => {
    if (!item?.link) return false;

    const currentPath = normalizePath(location.pathname);

    // Dashboard special case to prevent matching everything
    if (item.link === '/admin') {
      return currentPath === '/admin';
    }

    if (normalizePath(item.link) === currentPath) {
      return true;
    }

    if (item.activePaths?.length) {
      return item.activePaths.some(path => {
        const normalized = normalizePath(path);
        return (
          currentPath === normalized ||
          currentPath.startsWith(normalized + '/')
        );
      });
    }

    return false;
  }, [location.pathname, normalizePath]);

  // Auto-expand parent menu based on active route
  useEffect(() => {
    SidebarData.forEach(section => {
      section.submenuItems?.forEach(item => {
        const isActive = isMenuItemActive(item) ||
          item.submenuItems?.some(sub => isMenuItemActive(sub));

        if (isActive && item.submenu) {
          setOpenMain(item.label);
        }
      });
    });
  }, [location.pathname, isMenuItemActive]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    if (isDesktop) {
      setIsMobileOpen(false);
    }
  }, [isDesktop]);

  const handleDrawerToggle = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const handleMobileNavigate = useCallback(() => {
    if (!isDesktop) {
      setIsMobileOpen(false);
    }
  }, [isDesktop]);

  const isPOSPage = location.pathname === '/admin/pos' || location.pathname.startsWith('/admin/pos/');

  if (isPOSPage) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
        <HorizontalSidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDrawerToggle}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1200,
            }}
          />
        )}
      </AnimatePresence>

      {/* Desktop Drawer */}
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <SidebarContent
            openMain={openMain}
            setOpenMain={setOpenMain}
            isMenuItemActive={isMenuItemActive}
          />
        </Drawer>
      ) : (
        // Mobile Drawer
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <SidebarContent
            openMain={openMain}
            setOpenMain={setOpenMain}
            isMenuItemActive={isMenuItemActive}
            onNavigate={handleMobileNavigate}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AdminHeader onMenuClick={handleDrawerToggle} />

        <Box sx={{ flex: 1, p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default HiwebSidebar;
