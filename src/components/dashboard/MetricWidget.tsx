import { Box, Typography, alpha, Stack } from '@mui/material';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { DashboardWidget, type WidgetConfig } from './DashboardWidget';

interface MetricWidgetProps {
  config: WidgetConfig;
  value: string | number;
  label: string;
  change?: string;
  changeValue?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
  onRemove?: () => void;
}

export const MetricWidget = ({
  config,
  value,
  label,
  change,
  changeValue,
  trend = 'neutral',
  icon,
  color = '#3b82f6',
  onRemove
}: MetricWidgetProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} />;
      case 'down': return <ArrowDown size={14} />;
      default: return null;
    }
  };

  const getTrendStyles = () => {
    switch (trend) {
      case 'up': return { color: '#22c55e', bgcolor: alpha('#22c55e', 0.1) };
      case 'down': return { color: '#ef4444', bgcolor: alpha('#ef4444', 0.1) };
      default: return { color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.05)' };
    }
  };

  const trendStyle = getTrendStyles();

  return (
    <DashboardWidget config={config} onRemove={onRemove}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', pt: 1 }}>
        <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 2.5 }}>
          {icon && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${color}, ${alpha(color, 0.7)})`,
                color: '#fff',
                boxShadow: `0 4px 12px ${alpha(color, 0.3)}`
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', lineHeight: 1.1, mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {label}
            </Typography>
          </Box>
        </Stack>

        {change && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1.5,
                fontSize: '0.75rem',
                fontWeight: 700,
                ...trendStyle
              }}
            >
              {getTrendIcon()}
              {change}
            </Box>
            {changeValue && (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                ({changeValue})
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </DashboardWidget>
  );
};
