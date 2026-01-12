import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { MoreVertical, Settings, RefreshCw, Expand, Download, Trash2 } from 'lucide-react';

export interface WidgetConfig {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list' | 'custom';
  size: 'small' | 'medium' | 'large' | 'xlarge';
  position: { x: number; y: number };
  data?: any;
  refreshable?: boolean;
  expandable?: boolean;
  exportable?: boolean;
}

interface DashboardWidgetProps {
  config: WidgetConfig;
  onRefresh?: () => void;
  onExpand?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  onRemove?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const DashboardWidget = ({
  config,
  onRefresh,
  onExpand,
  onExport,
  onSettings,
  onRemove,
  isLoading = false,
  children
}: DashboardWidgetProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSizeSx = (size: string) => {
    switch (size) {
      case 'small': return { gridColumn: { xs: 'span 1' }, gridRow: 'span 1' };
      case 'medium': return { gridColumn: { xs: 'span 1', sm: 'span 2' }, gridRow: 'span 1' };
      case 'large': return { gridColumn: { xs: 'span 1', sm: 'span 2' }, gridRow: 'span 2' };
      case 'xlarge': return { gridColumn: { xs: 'span 1', sm: 'span 3' }, gridRow: 'span 2' };
      default: return { gridColumn: 'span 1', gridRow: 'span 1' };
    }
  };

  return (
    <Card
      sx={{
        ...getSizeSx(config.size),
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      {/* Widget Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          pb: 1.5,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
            {config.title}
          </Typography>
          {config.type === 'chart' && (
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Interactive visualization
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {config.refreshable && (
            <Tooltip title="Refresh">
              <IconButton
                size="small"
                onClick={onRefresh}
                disabled={isLoading}
                sx={{ color: 'text.secondary', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              </IconButton>
            </Tooltip>
          )}

          {config.expandable && (
            <Tooltip title="Expand">
              <IconButton
                size="small"
                onClick={onExpand}
                sx={{ color: 'text.secondary', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <Expand size={14} />
              </IconButton>
            </Tooltip>
          )}

          {config.exportable && (
            <Tooltip title="Export">
              <IconButton
                size="small"
                onClick={onExport}
                sx={{ color: 'text.secondary', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }}
              >
                <Download size={14} />
              </IconButton>
            </Tooltip>
          )}

          <IconButton
            size="small"
            onClick={handleClick}
            sx={{ color: 'text.secondary', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }}
          >
            <MoreVertical size={14} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  background: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  minWidth: 160
                }
              }
            }}
          >
            <MenuItem
              onClick={() => { onSettings?.(); handleClose(); }}
              sx={{ py: 1, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
            >
              <ListItemIcon sx={{ color: 'text.secondary' }}>
                <Settings size={16} />
              </ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2', fontWeight: 600, color: '#fff' }} />
            </MenuItem>
            <MenuItem
              onClick={() => { onRemove?.(); handleClose(); }}
              sx={{ py: 1, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)', '& svg': { color: '#ef4444' } } }}
            >
              <ListItemIcon sx={{ color: 'text.secondary' }}>
                <Trash2 size={16} />
              </ListItemIcon>
              <ListItemText primary="Remove Widget" primaryTypographyProps={{ variant: 'body2', fontWeight: 600, color: '#fff' }} />
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Widget Content */}
      <CardContent
        sx={{
          flex: 1,
          p: 2.5,
          pt: 1.5,
          position: 'relative',
          overflow: 'hidden',
          '&:last-child': { pb: 2.5 }
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 150 }}>
            <CircularProgress size={32} sx={{ color: '#d946ef' }} />
          </Box>
        ) : (
          children
        )}
      </CardContent>

      {/* Resize Indicator (Visual Only) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 1,
          right: 1,
          width: 8,
          height: 8,
          borderRight: '2px solid rgba(255,255,255,0.2)',
          borderBottom: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '0 0 2px 0',
          opacity: 0.5
        }}
      />
    </Card>
  );
};
