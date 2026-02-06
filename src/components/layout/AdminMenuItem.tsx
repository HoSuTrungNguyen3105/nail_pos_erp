import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Box,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

export interface MenuItemData {
  label: string;
  link?: string;
  icon?: React.ReactNode;
  submenu?: boolean;
  submenuItems?: MenuItemData[];
  activePaths?: string[];
}

interface AdminMenuItemProps {
  item: MenuItemData;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  checkIsActive: (item: MenuItemData) => boolean;
}

export const AdminMenuItem = memo<AdminMenuItemProps>(({
  item,
  isActive,
  isExpanded,
  onToggle,
  onNavigate,
  checkIsActive,
}) => {
  if (item.submenu && item.submenuItems) {
    return (
      <>
        <ListItemButton
          onClick={onToggle}
          selected={isActive || isExpanded}
          sx={{ px: 2, py: 1.5 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: 500,
            }}
          />
          <ChevronDown
            size={16}
            className="transition-transform duration-300"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: isExpanded ? '#e879f9' : 'inherit',
            }}
          />
        </ListItemButton>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              mx: 1.5,
              my: 1,
              borderRadius: '12px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              p: 0.5,
            }}
          >
            {item.submenuItems.map((subItem) => {
              const isSubActive = checkIsActive(subItem);
              
              return (
                <ListItemButton
                  key={subItem.label}
                  component={Link}
                  to={subItem.link || '#'}
                  selected={isSubActive}
                  onClick={onNavigate}
                  sx={{
                    px: 2,
                    py: 1,
                    mx: 0.5,
                    borderRadius: '8px',
                    minHeight: 36,
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: isSubActive ? 'primary.light' : 'grey.600',
                      mr: 2,
                      boxShadow: isSubActive ? '0 0 6px rgba(232, 121, 249, 0.8)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                  <ListItemText
                    primary={subItem.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: isSubActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemButton
      component={Link}
      to={item.link || '#'}
      selected={isActive}
      onClick={onNavigate}
      sx={{ px: 2, py: 1.5 }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: 500,
        }}
      />
    </ListItemButton>
  );
});

AdminMenuItem.displayName = 'AdminMenuItem';
