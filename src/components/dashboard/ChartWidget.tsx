import { DashboardWidget, type WidgetConfig } from './DashboardWidget';
import { ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  config: WidgetConfig;
  chartType: 'line' | 'bar' | 'area' | 'pie' | 'composed';
  data: any[];
  height?: number;
  children: React.ReactNode;
  onRemove?: () => void;
}

export const ChartWidget = ({
  config,
  height = 300,
  children,
  onRemove
}: ChartWidgetProps) => {
  return (
    <DashboardWidget config={config} onRemove={onRemove}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </DashboardWidget>
  );
};