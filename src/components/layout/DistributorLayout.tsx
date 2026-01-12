import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Store,
  Package,
  ScanLine,
  BarChart3,
  ShoppingCart,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Settings,
  Bell
} from 'lucide-react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container
} from '@mui/material';

export const DistributorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header / Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 72 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/distributor/marketplace')}
              >
                ZOTA DISTRIBUTOR
              </Typography>

              <Box component="nav" sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
                <NavItem to="/distributor/marketplace" icon={<Store size={18} />} label="Sourcing" />
                <NavItem to="/distributor/warehouse" icon={<Package size={18} />} label="Warehouse" />
                <NavItem to="/distributor/pos" icon={<ScanLine size={18} />} label="POS" />
                <NavItem to="/distributor/crm" icon={<UserIcon size={18} />} label="Customers" />
                <NavItem to="/distributor/reports" icon={<BarChart3 size={18} />} label="Analytics" />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#d946ef' } }}>
                <Bell size={20} />
              </IconButton>

              <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#d946ef' } }}>
                <Badge badgeContent={2} color="primary" sx={{ '& .MuiBadge-badge': { background: 'linear-gradient(135deg, #d946ef, #7c3aed)', color: '#fff' } }}>
                  <ShoppingCart size={20} />
                </Badge>
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

              <Box
                onClick={handleOpenMenu}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  cursor: 'pointer',
                  p: 0.5,
                  pr: 1.5,
                  borderRadius: 3,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                    fontSize: '0.875rem',
                    fontWeight: 700
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    {user?.role}
                  </Typography>
                </Box>
                <ChevronDown size={14} className="text-slate-400" />
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    bgcolor: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1.5,
                      fontSize: '0.875rem',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                    }
                  }
                }}
              >
                <MenuItem onClick={() => { handleCloseMenu(); navigate('/distributor/profile'); }}>
                  <UserIcon size={18} style={{ marginRight: 12 }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <Settings size={18} style={{ marginRight: 12 }} /> Settings
                </MenuItem>
                <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                <MenuItem onClick={handleLogout} sx={{ color: '#f43f5e' }}>
                  <LogOut size={18} style={{ marginRight: 12 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      component={NavLink}
      to={to}
      startIcon={icon}
      sx={{
        px: 2,
        py: 1,
        borderRadius: 2,
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: isActive ? '#fff' : 'text.secondary',
        bgcolor: isActive ? 'rgba(217, 70, 239, 0.1)' : 'transparent',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: isActive ? 'rgba(217, 70, 239, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          color: '#fff',
        },
        '& .MuiButton-startIcon': {
          color: isActive ? '#d946ef' : 'inherit',
          transition: 'color 0.2s',
        }
      }}
    >
      {label}
    </Button>
  );
};
