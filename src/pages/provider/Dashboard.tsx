import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { CustomizableDashboard } from '../../components/dashboard/CustomizableDashboard';
import { MetricWidget } from '../../components/dashboard/MetricWidget';
import { ChartWidget } from '../../components/dashboard/ChartWidget';
import { DashboardWidget, type WidgetConfig } from '../../components/dashboard/DashboardWidget';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  RefreshCw,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Enhanced KPI data with more metrics
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
  { month: 'Jan', revenue: 85000, orders: 120, target: 90000 },
  { month: 'Feb', revenue: 92000, orders: 135, target: 95000 },
  { month: 'Mar', revenue: 88000, orders: 118, target: 100000 },
  { month: 'Apr', revenue: 105000, orders: 142, target: 105000 },
  { month: 'May', revenue: 115000, orders: 156, target: 110000 },
  { month: 'Jun', revenue: 124592, orders: 168, target: 120000 },
];

const categoryData = [
  { name: 'Gel Systems', value: 35, color: '#8b5cf6' },
  { name: 'Polish', value: 28, color: '#f59e0b' },
  { name: 'Tools', value: 20, color: '#22c55e' },
  { name: 'Equipment', value: 12, color: '#3b82f6' },
  { name: 'Accessories', value: 5, color: '#ef4444' },
];

const activityData = [
  { time: '2 min ago', action: 'New order placed', details: 'Order #MB-2024 from Elite Spa', status: 'success' },
  { time: '15 min ago', action: 'Payment received', details: '$2,450 from Downtown Nails', status: 'success' },
  { time: '1 hour ago', action: 'Low stock alert', details: 'Ruby Red Gel - 12 units remaining', status: 'warning' },
  { time: '2 hours ago', action: 'New distributor onboarded', details: 'Luxury Nails Inc. joined platform', status: 'success' },
  { time: '3 hours ago', action: 'Order fulfilled', details: 'Order #MB-2018 shipped to customer', status: 'success' },
];

export default function ProviderDashboard() {
  const [_, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardWidgets, setDashboardWidgets] = useState<WidgetConfig[]>([
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      type: 'metric',
      size: 'medium',
      position: { x: 0, y: 0 },
      refreshable: true
    },
    {
      id: 'active-orders',
      title: 'Active Orders',
      type: 'metric',
      size: 'medium',
      position: { x: 1, y: 0 },
      refreshable: true
    },
    {
      id: 'low-stock-alerts',
      title: 'Low Stock Alerts',
      type: 'metric',
      size: 'medium',
      position: { x: 2, y: 0 },
      refreshable: true
    },
    {
      id: 'active-distributors',
      title: 'Active Distributors',
      type: 'metric',
      size: 'medium',
      position: { x: 3, y: 0 },
      refreshable: true
    },
    {
      id: 'monthly-growth',
      title: 'Monthly Growth',
      type: 'metric',
      size: 'medium',
      position: { x: 0, y: 1 },
      refreshable: true
    },
    {
      id: 'avg-order-value',
      title: 'Avg Order Value',
      type: 'metric',
      size: 'medium',
      position: { x: 1, y: 1 },
      refreshable: true
    },
    {
      id: 'revenue-chart',
      title: 'Revenue & Orders Trend',
      type: 'chart',
      size: 'large',
      position: { x: 2, y: 1 },
      refreshable: true,
      expandable: true,
      exportable: true
    },
    {
      id: 'category-pie',
      title: 'Sales by Category',
      type: 'chart',
      size: 'large',
      position: { x: 0, y: 2 },
      refreshable: true
    },
    {
      id: 'activity-feed',
      title: 'Live Activity Feed',
      type: 'list',
      size: 'large',
      position: { x: 1, y: 2 },
      refreshable: true
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions & Alerts',
      type: 'custom',
      size: 'large',
      position: { x: 2, y: 2 },
      refreshable: true
    }
  ]);

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
    },
    {
      id: 'sales-funnel',
      title: 'Sales Funnel',
      type: 'chart',
      size: 'large',
      position: { x: 0, y: 0 },
      refreshable: true
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleAddWidget = (widget: WidgetConfig) => {
    setDashboardWidgets(prev => [...prev, { ...widget, id: `${widget.id}-${Date.now()}` }]);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setDashboardWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const handleUpdateWidget = (widgetId: string, config: Partial<WidgetConfig>) => {
    setDashboardWidgets(prev =>
      prev.map(w => w.id === widgetId ? { ...w, ...config } : w)
    );
  };

  const renderWidget = (widget: WidgetConfig) => {
    switch (widget.type) {
      case 'metric':
        const kpiIndex = ['total-revenue', 'active-orders', 'low-stock-alerts', 'active-distributors', 'monthly-growth', 'avg-order-value'].indexOf(widget.id);
        if (kpiIndex >= 0) {
          const kpi = kpiData[kpiIndex];
          return (
            <MetricWidget
              key={widget.id}
              config={widget}
              value={kpi.value}
              label={kpi.title}
              change={kpi.change}
              changeValue={kpi.changeValue}
              trend={kpi.trend as 'up' | 'down' | 'neutral'}
              icon={kpi.icon}
              color={kpi.color}
            />
          );
        }
        break;

      case 'chart':
        if (widget.id === 'revenue-chart') {
          return (
            <ChartWidget
              key={widget.id}
              config={widget}
              chartType="area"
              data={revenueData}
            >
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="2"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ChartWidget>
          );
        } else if (widget.id === 'category-pie') {
          return (
            <ChartWidget
              key={widget.id}
              config={widget}
              chartType="pie"
              data={categoryData}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ChartWidget>
          );
        }
        break;

      case 'list':
        if (widget.id === 'activity-feed') {
          return (
            <DashboardWidget key={widget.id} config={widget}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity size={20} />
                    Live Activity Feed
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">Recent system activities</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye size={16} />
                </Button>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]/20">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500/20 text-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {activity.status === 'success' ? <CheckCircle size={16} /> :
                       activity.status === 'warning' ? <AlertTriangle size={16} /> :
                       <Clock size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{activity.details}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardWidget>
          );
        }
        break;

      case 'custom':
        if (widget.id === 'quick-actions') {
          return (
            <DashboardWidget key={widget.id} config={widget}>
              <h3 className="text-lg font-semibold mb-6">Quick Actions & Alerts</h3>
              <div className="space-y-4">
                {/* Critical Alerts */}
                <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-400">Critical Stock Alert</h4>
                      <p className="text-sm text-[var(--muted-foreground)] mt-1">
                        3 products are out of stock and affecting 12 active orders
                      </p>
                      <Button size="sm" className="mt-3" variant="outline">
                        View Inventory
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="space-y-3">
                  <h4 className="font-medium">Pending Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                      <div>
                        <p className="text-sm font-medium">Review 5 new distributor applications</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Due in 2 hours</p>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                      <div>
                        <p className="text-sm font-medium">Update pricing for seasonal products</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Due tomorrow</p>
                      </div>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]">
                      <div>
                        <p className="text-sm font-medium">Generate monthly financial report</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Due in 3 days</p>
                      </div>
                      <Button size="sm" variant="outline">Generate</Button>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardWidget>
          );
        }
        break;
    }
    return null;
  };

  return (
    <CustomizableDashboard
      title="Executive Dashboard"
      description="Monitor your business performance and key metrics in real-time"
      availableWidgets={availableWidgets}
      onAddWidget={handleAddWidget}
      onRemoveWidget={handleRemoveWidget}
      onUpdateWidget={handleUpdateWidget}
    >
      {/* Time Range Selector - Global Controls */}
      <div className="col-span-full mb-6">
        <div className="flex justify-between items-center">
          <div className="flex bg-[var(--card)] rounded-lg p-1">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <Button
                key={range}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Render Widgets */}
      {dashboardWidgets.map(renderWidget)}
    </CustomizableDashboard>
  );
}
