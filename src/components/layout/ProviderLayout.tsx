import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
  Settings,
  Menu as MenuIcon,
  X,
  Plus,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { RealTimeNotifications } from '../dashboard/RealTimeNotifications';

const DRAWER_WIDTH = 280;

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle =
    NAV_ITEMS.find(i => location.pathname.startsWith(i.to))?.label || 'Overview';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 0% 0%, rgba(217, 70, 239, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Sidebar Header/Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)',
            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.3)',
            fontWeight: 800,
            fontSize: '1.25rem'
          }}
        >
          Z
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, tracking: '-0.02em' }}>
            Zota Provider
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Nail Supply Management
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ ml: 'auto', color: 'rgba(255,255,255,0.7)' }}>
            <X size={20} />
          </IconButton>
        )}
      </Box>

      {/* Sidebar Navigation */}
      <Box sx={{ flexGrow: 1, py: 3, overflowY: 'auto' }}>
        <List sx={{ px: 2, gap: 0.5, display: 'flex', flexDirection: 'column' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 2,
                    mb: 0.5,
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.65)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      '& .mui-icon': { color: '#d946ef' }
                    },
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: '#d946ef',
                      borderRadius: '0 4px 4px 0',
                      boxShadow: '0 0 12px rgba(217, 70, 239, 0.5)'
                    } : {}
                  }}
                >
                  <ListItemIcon
                    className="mui-icon"
                    sx={{
                      minWidth: 40,
                      color: isActive ? '#d946ef' : 'inherit',
                      transition: 'color 0.2s'
                    }}
                  >
                    <item.icon size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.875rem'
                    }}
                  />
                  {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Quick Actions Section */}
        <Box sx={{ mt: 4, px: 3 }}>
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', mb: 2, display: 'block' }}>
            Quick Actions
          </Typography>
          <Stack spacing={1}>
            <QuickActionButton
              icon={<Plus size={18} />}
              label="New Product"
              onClick={() => navigate('/provider/products')}
            />
            <QuickActionButton
              icon={<ShoppingCart size={18} />}
              label="Process Orders"
              badge="3"
              onClick={() => navigate('/provider/orders')}
            />
            <QuickActionButton
              icon={<AlertTriangle size={18} />}
              label="Stock Alerts"
              urgent
              onClick={() => navigate('/provider/inventory')}
            />
          </Stack>
        </Box>

        {/* System Status */}
        <Box sx={{ mt: 4, px: 3 }}>
          <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.1em', mb: 2, display: 'block' }}>
            System Status
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Server Node</Typography>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Last Refreshed</Typography>
              <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>2m ago</Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Sidebar Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.1)' }}>
        <Button
          fullWidth
          variant="text"
          startIcon={<LogOut size={18} />}
          onClick={handleLogout}
          sx={{
            justifyContent: 'flex-start',
            color: '#fca5a5',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171'
            }
          }}
        >
          Logout Session
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', h: '100vh', bgcolor: '#f8fafc', overflow: 'hidden' }}>
      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e2e8f0',
            zIndex: theme.zIndex.appBar
          }}
        >
          <Toolbar sx={{ px: { xs: 2, lg: 4 }, py: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon size={24} />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b', tracking: '-0.03em', lineHeight: 1.2 }}>
                {pageTitle}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Provider Portal
                </Typography>
                <Box sx={{ w: 4, h: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                <Typography variant="caption" sx={{ color: '#d946ef', fontWeight: 700, textTransform: 'capitalize' }}>
                  {user?.role}
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, px: 2, py: 0.75, bgcolor: '#f1f5f9', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e', animation: 'pulse 2s infinite' }} />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Real-time Link Live</Typography>
              </Box>

              <RealTimeNotifications />

              <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.65rem' }}>
                    STORE #8829
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: alpha('#d946ef', 0.1),
                    color: '#d946ef',
                    fontWeight: 700,
                    border: '1px solid rgba(217, 70, 239, 0.2)'
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </Stack>

              <IconButton
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { bgcolor: alpha('#1e1b4b', 0.05), color: '#1e1b4b' }
                }}
              >
                <Settings size={20} />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            bgcolor: '#f8fafc',
            p: { xs: 2, sm: 4, lg: 6 }
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          }
        `}
      </style>
    </Box>
  );
};

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: string;
  urgent?: boolean;
}

const QuickActionButton = ({ icon, label, onClick, badge, urgent }: QuickActionButtonProps) => (
  <Button
    fullWidth
    variant="text"
    onClick={onClick}
    sx={{
      justifyContent: 'flex-start',
      py: 1.5,
      px: 2,
      borderRadius: 2.5,
      textTransform: 'none',
      transition: 'all 0.2s',
      color: urgent ? '#fca5a5' : 'rgba(255,255,255,0.7)',
      bgcolor: urgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${urgent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
      '&:hover': {
        bgcolor: urgent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.08)',
        color: '#fff',
        borderColor: urgent ? '#ef4444' : 'rgba(255,255,255,0.2)',
        transform: 'translateX(4px)'
      }
    }}
  >
    <Box
      sx={{
        mr: 2,
        display: 'flex',
        p: 0.75,
        borderRadius: 2,
        bgcolor: urgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
        color: urgent ? '#ef4444' : 'inherit'
      }}
    >
      {icon}
    </Box>
    <Typography sx={{ flexGrow: 1, textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>
      {label}
    </Typography>
    {badge && (
      <Badge
        badgeContent={badge}
        sx={{
          ml: 1,
          '& .MuiBadge-badge': {
            bgcolor: urgent ? '#ef4444' : '#d946ef',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.65rem'
          }
        }}
      />
    )}
  </Button>
);
