import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { CustomizableDashboard } from '../../components/dashboard/CustomizableDashboard';
import { type WidgetConfig } from '../../components/dashboard/DashboardWidget';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';

import { DashboardHeader } from './DashboardHeader';
import { DashboardKPIs } from './DashboardKPIs';
import { DashboardTrendCharts } from './DashboardTrendCharts';
import { DashboardFeeds } from './DashboardFeeds';

// KPI Data
const kpiData = [
  {
    title: 'Total Revenue',
    value: '$124,592',
    change: '+12.5%',
    changeValue: '$13,824',
    isPositive: true,
    icon: <DollarSign />,
    trend: 'up',
    period: 'vs last month',
    color: '#22c55e'
  },
  {
    title: 'Active Orders',
    value: '42',
    change: '+8.2%',
    changeValue: '+3',
    isPositive: true,
    icon: <ShoppingCart />,
    trend: 'up',
    period: 'vs last week',
    color: '#3b82f6'
  },
  {
    title: 'Low Stock Alerts',
    value: '15',
    change: '+5',
    changeValue: '+2',
    isPositive: false,
    icon: <AlertTriangle />,
    trend: 'up',
    period: 'critical items',
    color: '#ef4444'
  },
  {
    title: 'Active Distributors',
    value: '1,284',
    change: '+8.2%',
    changeValue: '+97',
    isPositive: true,
    icon: <Users />,
    trend: 'up',
    period: 'vs last quarter',
    color: '#8b5cf6'
  },
  {
    title: 'Monthly Growth',
    value: '23.4%',
    change: '+4.1%',
    changeValue: '+2.3%',
    isPositive: true,
    icon: <TrendingUp />,
    trend: 'up',
    period: 'YoY growth',
    color: '#f59e0b'
  },
  {
    title: 'Avg Order Value',
    value: '$2,847',
    change: '-2.1%',
    changeValue: '-$61',
    isPositive: false,
    icon: <BarChart3 />,
    trend: 'down',
    period: 'vs last month',
    color: '#ef4444'
  }
];

// Chart data
const revenueData = [
  { month: 'Jan', revenue: 85000, target: 90000 },
  { month: 'Feb', revenue: 92000, target: 95000 },
  { month: 'Mar', revenue: 88000, target: 100000 },
  { month: 'Apr', revenue: 105000, target: 105000 },
  { month: 'May', revenue: 115000, target: 110000 },
  { month: 'Jun', revenue: 124592, target: 120000 },
];

const categoryData = [
  { name: 'Gel Systems', value: 35, color: '#8b5cf6' },
  { name: 'Polish', value: 28, color: '#f59e0b' },
  { name: 'Tools', value: 20, color: '#22c55e' },
  { name: 'Equipment', value: 12, color: '#3b82f6' },
  { name: 'Accessories', value: 5, color: '#ef4444' },
];

const activityData: any[] = [
  { time: '2 min ago', action: 'New order placed', details: 'Order #MB-2024 from Elite Spa', status: 'success' },
  { time: '15 min ago', action: 'Payment received', details: '$2,450 from Downtown Nails', status: 'success' },
  { time: '1 hour ago', action: 'Low stock alert', details: 'Ruby Red Gel - 12 units remaining', status: 'warning' },
  { time: '2 hours ago', action: 'New distributor onboarded', details: 'Luxury Nails Inc. joined platform', status: 'success' },
  { time: '3 hours ago', action: 'Order fulfilled', details: 'Order #MB-2018 shipped to customer', status: 'success' },
];

export default function ProviderDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const availableWidgets: WidgetConfig[] = [
    {
      id: 'profit-margin',
      title: 'Profit Margin',
      type: 'metric',
      size: 'medium',
      position: { x: 0, y: 0 },
      refreshable: true
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      type: 'metric',
      size: 'medium',
      position: { x: 0, y: 0 },
      refreshable: true
    },
    {
      id: 'inventory-turnover',
      title: 'Inventory Turnover',
      type: 'chart',
      size: 'large',
      position: { x: 0, y: 0 },
      refreshable: true,
      expandable: true
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAddWidget = (widget: WidgetConfig) => {
    console.log('Add widget', widget);
  };

  const handleRemoveWidget = (widgetId: string) => {
    console.log('Remove widget', widgetId);
  };

  const handleUpdateWidget = (widgetId: string, config: Partial<WidgetConfig>) => {
    console.log('Update widget', widgetId, config);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <CustomizableDashboard
        title="Executive Dashboard"
        description="Monitor your business performance and key metrics in real-time"
        availableWidgets={availableWidgets}
        onAddWidget={handleAddWidget}
        onRemoveWidget={handleRemoveWidget}
        onUpdateWidget={handleUpdateWidget}
      >
        <DashboardHeader
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        <DashboardKPIs kpiData={kpiData} />

        <DashboardTrendCharts revenueData={revenueData} categoryData={categoryData} />

        <Box sx={{ gridColumn: 'span 4' }}>
          <DashboardFeeds activityData={activityData} />
        </Box>
      </CustomizableDashboard>
    </Container>
  );
}
