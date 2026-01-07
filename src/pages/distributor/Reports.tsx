import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Wallet,
  ShoppingCart,
  Users,

  TrendingDown, // Keep TrendingDown for Report Loss/Damage
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  Target,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line // Used in ComposedChart
} from 'recharts';

export default function Reports() {
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Enhanced financial data
  const financialKPIs = [
    {
      title: 'Total Revenue',
      value: '$145,231',
      change: '+23.5%',
      changeValue: '+$27,482',
      period: 'vs last month',
      icon: <DollarSign />,
      trend: 'up',
      color: '#22c55e'
    },
    {
      title: 'Net Profit',
      value: '$42,156',
      change: '+18.2%',
      changeValue: '+$6,543',
      period: 'vs last month',
      icon: <Wallet />,
      trend: 'up',
      color: '#3b82f6'
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+15.8%',
      changeValue: '+170',
      period: 'vs last month',
      icon: <ShoppingCart />,
      trend: 'up',
      color: '#8b5cf6'
    },
    {
      title: 'Avg Order Value',
      value: '$116.50',
      change: '-2.1%',
      changeValue: '-$2.50',
      period: 'vs last month',
      icon: <Target />,
      trend: 'down',
      color: '#ef4444'
    },
    {
      title: 'Customer Acquisition',
      value: '89',
      change: '+12.3%',
      changeValue: '+10',
      period: 'new customers',
      icon: <Users />,
      trend: 'up',
      color: '#f59e0b'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      changeValue: '+0.26%',
      period: 'vs last month',
      icon: <Activity />,
      trend: 'up',
      color: '#10b981'
    }
  ];

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 85000, profit: 24500, orders: 892, customers: 723 },
    { month: 'Feb', revenue: 92000, profit: 26800, orders: 956, customers: 789 },
    { month: 'Mar', revenue: 88000, profit: 25200, orders: 923, customers: 756 },
    { month: 'Apr', revenue: 105000, profit: 31200, orders: 1089, customers: 892 },
    { month: 'May', revenue: 118000, profit: 35600, orders: 1247, customers: 956 },
    { month: 'Jun', revenue: 145231, profit: 42156, orders: 1478, customers: 1123 },
  ];

  // Product performance data
  const productData = [
    { name: 'Gel Polish', revenue: 45231, orders: 423, growth: 15.2 },
    { name: 'Nail Tools', revenue: 32156, orders: 289, growth: 8.7 },
    { name: 'Equipment', revenue: 28765, orders: 156, growth: 22.1 },
    { name: 'Accessories', revenue: 19876, orders: 234, growth: -3.2 },
    { name: 'Supplies', revenue: 19203, orders: 145, growth: 12.8 },
  ];

  // Customer segment data
  const customerSegments = [
    { name: 'Premium Clients', value: 35, color: '#8b5cf6', customers: 391 },
    { name: 'Regular Customers', value: 45, color: '#22c55e', customers: 502 },
    { name: 'New Customers', value: 12, color: '#3b82f6', customers: 134 },
    { name: 'One-time Buyers', value: 8, color: '#ef4444', customers: 89 },
  ];

  // Sales by region
  const regionalData = [
    { region: 'North', sales: 45231, target: 40000, growth: 13.1 },
    { region: 'South', sales: 38976, target: 42000, growth: -7.2 },
    { region: 'East', sales: 35678, target: 35000, growth: 2.0 },
    { region: 'West', sales: 25346, target: 28000, growth: -9.5 },
  ];

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 /> },
    { id: 'financial', label: 'Financial', icon: <DollarSign /> },
    { id: 'sales', label: 'Sales', icon: <ShoppingCart /> },
    { id: 'customers', label: 'Customers', icon: <Users /> },
    { id: 'products', label: 'Products', icon: <Target /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Analytics Dashboard</h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Comprehensive business intelligence and performance metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Action Buttons */}
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
             <TrendingDown size={16} className="mr-2" />
             Report Loss/Damage
          </Button>

          {/* Report Type Selector */}
          <div className="flex bg-[var(--card)] rounded-lg p-1">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  reportType === type.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-md text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {financialKPIs.map((kpi, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div
                className="p-3 rounded-xl text-white"
                style={{ backgroundColor: kpi.color }}
              >
                {kpi.icon}
              </div>
              <div className="flex items-center gap-1">
                {kpi.trend === 'up' ? (
                  <ArrowUp size={14} className="text-green-500" />
                ) : (
                  <ArrowDown size={14} className="text-red-500" />
                )}
                <span className={`text-xs font-semibold ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
              <p className="text-sm font-medium text-[var(--muted-foreground)]">{kpi.title}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{kpi.period}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue & Profit Trend */}
        <Card className="xl:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Revenue & Profit Trends</h3>
              <p className="text-sm text-[var(--muted-foreground)]">Monthly performance analysis</p>
            </div>
            <Button variant="ghost" size="sm">
              <Eye size={16} />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#8b5cf6" name="Revenue" />
              <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={3} name="Profit" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Customer Segments */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Customer Segments</h3>
              <p className="text-sm text-[var(--muted-foreground)]">Distribution by type</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <RechartsPieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Product Performance</h3>
              <p className="text-sm text-[var(--muted-foreground)]">Revenue by product category</p>
            </div>
            <Button variant="ghost" size="sm">
              <FileText size={16} />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Regional Performance */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Regional Performance</h3>
              <p className="text-sm text-[var(--muted-foreground)]">Sales by region vs targets</p>
            </div>
            <Button variant="ghost" size="sm">
              <Target size={16} />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="region" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#22c55e" name="Actual Sales" />
              <Bar dataKey="target" fill="#ef4444" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Detailed Performance Metrics</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Monthly breakdown with key indicators</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 font-semibold">Period</th>
                <th className="text-right py-3 px-4 font-semibold">Revenue</th>
                <th className="text-right py-3 px-4 font-semibold">Profit</th>
                <th className="text-right py-3 px-4 font-semibold">Orders</th>
                <th className="text-right py-3 px-4 font-semibold">Customers</th>
                <th className="text-right py-3 px-4 font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((row, index) => (
                <tr key={index} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/20">
                  <td className="py-3 px-4 font-medium">{row.month} 2024</td>
                  <td className="py-3 px-4 text-right">${row.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">${row.profit.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">{row.orders}</td>
                  <td className="py-3 px-4 text-right">{row.customers}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 ${
                      index > 0 && row.revenue > revenueData[index - 1].revenue
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}>
                      {index > 0 && row.revenue > revenueData[index - 1].revenue ? (
                        <ArrowUp size={12} />
                      ) : (
                        <ArrowDown size={12} />
                      )}
                      {index > 0
                        ? `${(((row.revenue - revenueData[index - 1].revenue) / revenueData[index - 1].revenue) * 100).toFixed(1)}%`
                        : '-'
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
