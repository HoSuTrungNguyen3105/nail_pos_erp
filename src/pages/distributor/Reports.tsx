import { useState } from 'react';
import { Box } from '@mui/material';
import {
  DollarSign,
  Wallet,
  ShoppingCart,
  Users,
  Target,
  Activity
} from 'lucide-react';

import ReportsHeader from './ReportsHeader';
import ReportsKPIs, { type KPIProp } from './ReportsKPIs';
import ReportsCharts from './ReportsCharts';
import ReportsDetailedTable from './ReportsDetailedTable';

export default function Reports() {
  const [timeRange, setTimeRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Enhanced financial data
  const financialKPIs: KPIProp[] = [
    {
      title: 'Total Revenue',
      value: '$145,231',
      change: '+23.5%',
      changeValue: '+$27,482',
      period: 'vs last month',
      icon: <DollarSign />,
      trend: 'up',
      color: '#d946ef'
    },
    {
      title: 'Net Profit',
      value: '$42,156',
      change: '+18.2%',
      changeValue: '+$6,543',
      period: 'vs last month',
      icon: <Wallet />,
      trend: 'up',
      color: '#22c55e'
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+15.8%',
      changeValue: '+170',
      period: 'vs last month',
      icon: <ShoppingCart />,
      trend: 'up',
      color: '#3b82f6'
    },
    {
      title: 'Avg Order Value',
      value: '$116.50',
      change: '-2.1%',
      changeValue: '-$2.50',
      period: 'vs last month',
      icon: <Target />,
      trend: 'down',
      color: '#f43f5e'
    },
    {
      title: 'Customer Acquisition',
      value: '89',
      change: '+12.3%',
      changeValue: '+10',
      period: 'new customers',
      icon: <Users />,
      trend: 'up',
      color: '#8b5cf6'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      changeValue: '+0.26%',
      period: 'vs last month',
      icon: <Activity />,
      trend: 'up',
      color: '#2dd4bf'
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
    { name: 'Premium Clients', value: 35, color: '#d946ef', customers: 391 },
    { name: 'Regular Customers', value: 45, color: '#22c55e', customers: 502 },
    { name: 'New Customers', value: 12, color: '#3b82f6', customers: 134 },
    { name: 'One-time Buyers', value: 8, color: '#f43f5e', customers: 89 },
  ];

  // Sales by region
  const regionalData = [
    { region: 'North', sales: 45231, target: 40000, growth: 13.1 },
    { region: 'South', sales: 38976, target: 42000, growth: -7.2 },
    { region: 'East', sales: 35678, target: 35000, growth: 2.0 },
    { region: 'West', sales: 25346, target: 28000, growth: -9.5 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header & Controls */}
      <ReportsHeader
        reportType={reportType}
        setReportType={setReportType}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* KPI Cards */}
      <ReportsKPIs kpis={financialKPIs} />

      {/* Main & Secondary Charts */}
      <ReportsCharts
        revenueData={revenueData}
        customerSegments={customerSegments}
        productData={productData}
        regionalData={regionalData}
      />

      {/* Detailed Data Table */}
      <ReportsDetailedTable revenueData={revenueData} />
    </Box>
  );
}
