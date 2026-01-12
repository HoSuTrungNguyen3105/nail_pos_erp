import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Plus, Layout, Settings, Grid as GridIcon } from 'lucide-react';
import type { WidgetConfig } from './DashboardWidget';

interface CustomizableDashboardProps {
  title: string;
  description?: string;
  availableWidgets: WidgetConfig[];
  onAddWidget: (widget: WidgetConfig) => void;
  onRemoveWidget: (widgetId: string) => void;
  onUpdateWidget: (widgetId: string, config: Partial<WidgetConfig>) => void;
  children: React.ReactNode;
}

export const CustomizableDashboard = ({
  title,
  description,
  availableWidgets,
  onAddWidget,
  onRemoveWidget,
  onUpdateWidget,
  children
}: CustomizableDashboardProps) => {
  // onRemoveWidget and onUpdateWidget are used by the dashboard state manager (ProviderDashboard)
  // which controls the widgets passed via the 'children' prop.
  const [isEditMode, setIsEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const showWidgetSelector = Boolean(anchorEl);

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ spaceY: 6 }}>
      {/* Dashboard Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6, gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant={isEditMode ? 'contained' : 'outlined'}
            onClick={() => setIsEditMode(!isEditMode)}
            startIcon={isEditMode ? <Layout size={18} /> : <Settings size={18} />}
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              px: 3,
              py: 1,
              background: isEditMode ? 'linear-gradient(135deg, #d946ef, #7c3aed)' : 'transparent',
              borderColor: isEditMode ? 'transparent' : 'rgba(255,255,255,0.2)',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff',
                bgcolor: isEditMode ? undefined : 'rgba(255,255,255,0.05)'
              }
            }}
          >
            {isEditMode ? 'Exit Edit' : 'Customize'}
          </Button>

          {isEditMode && (
            <Box>
              <Button
                variant="outlined"
                onClick={handleAddClick}
                startIcon={<Plus size={18} />}
                sx={{
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                Add Widget
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={showWidgetSelector}
                onClose={handleAddClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      p: 1,
                      background: 'rgba(15, 23, 42, 0.9)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                      minWidth: 260
                    }
                  }
                }}
              >
                <Typography variant="overline" sx={{ px: 2, pt: 1, pb: 0.5, display: 'block', fontWeight: 700, color: 'text.secondary' }}>
                  Available Widgets
                </Typography>
                {availableWidgets.map((widget) => (
                  <MenuItem
                    key={widget.id}
                    onClick={() => {
                      onAddWidget(widget);
                      handleAddClose();
                    }}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      mb: 0.5,
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                    }}
                  >
                    <ListItemIcon sx={{ color: '#d946ef' }}>
                      <GridIcon size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={widget.title}
                      secondary={`${widget.type} • ${widget.size}`}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 600, color: '#fff' }}
                      secondaryTypographyProps={{ variant: 'caption', sx: { textTransform: 'capitalize' } }}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Box>
      </Box>

      {/* Dashboard Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
            '2xl': 'repeat(4, 1fr)'
          },
          gridAutoFlow: 'dense',
          gap: 3,
          position: 'relative',
          ...(isEditMode && {
            '&::after': {
              content: '""',
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none',
              zIndex: 1
            }
          })
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
