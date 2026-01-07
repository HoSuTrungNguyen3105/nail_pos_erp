import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
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
}

export const MetricWidget = ({
  config,
  value,
  label,
  change,
  changeValue,
  trend = 'neutral',
  icon,
  color = '#3b82f6'
}: MetricWidgetProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} className="text-green-500" />;
      case 'down': return <ArrowDown size={14} className="text-red-500" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-[var(--muted-foreground)]';
    }
  };

  return (
    <DashboardWidget config={config}>
      <div className="flex items-center justify-between h-full">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: color }}
              >
                {icon}
              </div>
            )}
            <div className="flex-1">
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
            </div>
          </div>

          {change && (
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">{change}</span>
              {changeValue && (
                <span className="text-xs opacity-75">({changeValue})</span>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardWidget>
  );
};