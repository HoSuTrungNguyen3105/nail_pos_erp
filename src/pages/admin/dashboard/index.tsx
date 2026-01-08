import React from 'react';
import SEO from '../components/SEO';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { MonthlySalesChart } from './components/MonthlySalesChart';
import { MonthlyTargetGauge } from './components/MonthlyTargetGauge';
import { StatisticsChart } from './components/StatisticsChart';

const TailAdminDashboard: React.FC = () => {
  return (
    <>
      <SEO 
        title="Dashboard Overview - TailAdmin"
        description="Real-time analytics dashboard showing customers, orders, revenue, sales trends, and performance metrics for TailAdmin."
      />

      <main className="space-y-8 py-2">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
            <p className="mt-2 text-slate-400">Welcome back! Here's what's happening today.</p>
          </div>
          
          <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-fuchsia-600/20">
            Download Report
          </button>
        </header>

        {/* Key Stats / KPIs Section */}
        <section aria-labelledby="kpis-heading">
          <h2 id="kpis-heading" className="sr-only">Key Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Customers"
              value="3,782"
              icon={<Users className="w-6 h-6 text-blue-400" />}
            />
            <StatsCard
              title="Orders"
              value="5,359"
              icon={<ShoppingCart className="w-6 h-6 text-fuchsia-400" />}
            />
            <StatsCard
              title="Revenue"
              value="$48,392"
              icon={<DollarSign className="w-6 h-6 text-teal-400" />}
            />
            <StatsCard
              title="Conversion Rate"
              value="3.24%"
              icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
            />
          </div>
        </section>

        {/* Mid-level Charts Section */}
        <section aria-labelledby="charts-heading">
          <h2 id="charts-heading" className="sr-only">Sales & Performance</h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Monthly Sales - Larger span */}
            <div className="xl:col-span-2 h-[420px]">
              <MonthlySalesChart />
            </div>
            
            {/* Monthly Target Gauge */}
            <div className="xl:col-span-1 h-[420px]">
              <MonthlyTargetGauge />
            </div>
          </div>
        </section>

        {/* Full-width Detailed Statistics */}
        <section aria-labelledby="statistics-heading">
          <h2 id="statistics-heading" className="sr-only">Detailed Statistics</h2>
          <div className="w-full">
            <StatisticsChart />
          </div>
        </section>
      </main>
    </>
  );
};

export default TailAdminDashboard;