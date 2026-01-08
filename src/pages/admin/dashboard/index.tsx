import React from 'react';
import SEO from '../components/SEO';
import { Users, ShoppingCart } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { MonthlySalesChart } from './components/MonthlySalesChart';
import { MonthlyTargetGauge } from './components/MonthlyTargetGauge';
import { StatisticsChart } from './components/StatisticsChart';

const TailAdminDashboard: React.FC = () => {
  return (
    <>
      <SEO 
        title="Dashboard - TailAdmin" 
        description="TailAdmin Dashboard Overview" 
      />
      
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard
            title="Customers"
            value="3,782"
            change="11.01%"
            isPositive={true}
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />
          <StatsCard
            title="Orders"
            value="5,359"
            change="9.05%"
            isPositive={false}
            icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Sales - Takes 2 columns */}
          <div className="lg:col-span-2">
            <MonthlySalesChart />
          </div>
          
          {/* Monthly Target - Takes 1 column */}
          <div>
            <MonthlyTargetGauge />
          </div>
        </div>

        {/* Statistics Chart - Full Width */}
        <div>
          <StatisticsChart />
        </div>
      </div>
    </>
  );
};

export default TailAdminDashboard;
