import React from 'react';
import SEO from './components/SEO';
import { BarChart2, PieChart, Activity, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <>
      <SEO 
        title="Analytics - TailAdmin"
        description="Advanced analytics and insights for your business performance."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="mt-2 text-slate-400">Deep insights into your business metrics and performance</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BarChart2, label: 'Page Views', value: '45.2K', color: 'blue' },
            { icon: Activity, label: 'Active Users', value: '2,345', color: 'teal' },
            { icon: PieChart, label: 'Conversion', value: '3.24%', color: 'fuchsia' },
            { icon: TrendingUp, label: 'Revenue Growth', value: '+18.2%', color: 'purple' },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-600/10 border border-white/10 text-center">
          <BarChart2 className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Comprehensive analytics dashboard with real-time data visualization, custom reports, and predictive insights.
          </p>
        </div>
      </div>
    </>
  );
};

export default Analytics;
