import React from 'react';
import SEO from './components/SEO';
import ERPMetrics, { type MetricItem } from './components/ERPMetrics';
import ERPRecentReports from './components/ERPRecentReports';
import ERPSalesPieChart from './components/ERPSalesPieChart';

import { 
  Users, 
  ShoppingCart, 
  Calendar, 
  DollarSign
} from 'lucide-react';

const METRICS_DATA: MetricItem[] = [
  {
    title: "members online",
    value: "10368",
    subValue: "",
    gradient: "bg-gradient-to-br from-[#10b981] to-[#3b82f6]",
    icon: <Users size={32} />,
    chartType: "area-smooth",
    data: [
      { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 30 }
    ]
  },
  {
    title: "items sold",
    value: "388,688",
    subValue: "",
    gradient: "bg-gradient-to-br from-[#10b981] to-[#3b82f6]",
    icon: <ShoppingCart size={32} />,
    chartType: "area-linear",
    data: [
      { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 }
    ]
  },
  {
    title: "this week",
    value: "1,086",
    subValue: "",
    gradient: "bg-gradient-to-br from-[#f97316] to-[#e11d48]",
    icon: <Calendar size={32} />,
    chartType: "line",
     data: [
      { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 }
    ]
  },
  {
    title: "total earnings",
    value: "$1,060,386",
    subValue: "",
    gradient: "bg-gradient-to-br from-[#84cc16] to-[#3b82f6]",
    icon: <DollarSign size={32} />,
    chartType: "bar",
     data: [
      { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 },
      { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }, { v: 40 }, { v: 65 }, { v: 50 },
       { v: 30 }, { v: 45 }, { v: 35 }, { v: 55 }
    ]
  }
];

const ERPDashboard: React.FC = () => {
  return (
    <>
      <SEO 
        title="Cool Admin - Dashboard" 
        description="Modern admin dashboard with real-time analytics and reports." 
      />

      <div className="flex flex-col gap-8">
        {/* Metrics Grid */}
        <ERPMetrics items={METRICS_DATA} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <ERPRecentReports />

          {/* Char By % */}
          <ERPSalesPieChart />
        </div>
      </div>
    </>
  );
};

export default ERPDashboard;
