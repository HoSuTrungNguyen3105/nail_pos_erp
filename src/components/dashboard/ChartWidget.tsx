import { DashboardWidget, type WidgetConfig } from './DashboardWidget';
import { ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  config: WidgetConfig;
  chartType: 'line' | 'bar' | 'area' | 'pie' | 'composed';
  data: any[];
  height?: number;
  children: React.ReactNode;
}

export const ChartWidget = ({
  config,
  chartType,
  data,
  height = 300,
  children
}: ChartWidgetProps) => {
  return (
    <DashboardWidget config={config}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </DashboardWidget>
  );
};