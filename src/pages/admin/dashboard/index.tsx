import React from 'react';
import SEO from '../components/SEO';
import { ProjectRevenueChart } from './components/ProjectRevenueChart';
import { ProjectCard } from './components/ProjectCard';
import { AnalyticsCard } from './components/AnalyticsCard';
import { NewClientsCard } from './components/NewClientsCard';
import { ProjectStatsCard } from './components/ProjectStatsCard';
import { ProjectIncomeChart } from './components/ProjectIncomeChart';
import { RecentProjectsTable } from './components/RecentProjectsTable';

const TailAdminDashboard: React.FC = () => {
  return (
    <>
      <SEO 
        title="Dashboard Overview - TailAdmin"
        description="Real-time analytics dashboard showing projects, revenue, analytics, and performance metrics for TailAdmin."
      />

      <main className="space-y-6 py-2">
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

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Revenue Chart */}
            <div className="h-[400px]">
              <ProjectRevenueChart />
            </div>

            {/* Project Statistics */}
            <ProjectStatsCard 
              projectName="Project X"
              dateRange="24 DEC 2017 - 09 APR 2019"
              tasks={26}
              completed="58%"
              pending="42%"
              version="4.5"
              status="Approved"
            />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Project Card */}
            <ProjectCard 
              title="Project X"
              status="In Progress"
              completedTasks={4}
              totalTasks={10}
              client="Xeon Inc."
              deadline="5th June, 2018"
              teamMembers={['User 1', 'User 2', 'User 3']}
            />

            {/* Analytics Card */}
            <AnalyticsCard />

            {/* New Clients Card */}
            <NewClientsCard />
          </div>
        </div>

        {/* Bottom Section - Charts and Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Income Chart */}
          <div className="h-[320px]">
            <ProjectIncomeChart />
          </div>

          {/* Recent Projects Table */}
          <div>
            <RecentProjectsTable />
          </div>
        </div>
      </main>
    </>
  );
};

export default TailAdminDashboard;