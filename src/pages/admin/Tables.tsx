import React from 'react';
import SEO from './components/SEO';
import { Table as TableIcon, List, Grid, Database } from 'lucide-react';

const Tables: React.FC = () => {
  return (
    <>
      <SEO 
        title="Tables - TailAdmin"
        description="Data tables with sorting, filtering, and pagination."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Tables</h1>
          <p className="mt-2 text-slate-400">Display and manage data in tabular format</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TableIcon, label: 'Data Tables', value: '12', color: 'teal' },
            { icon: List, label: 'List Views', value: '8', color: 'blue' },
            { icon: Grid, label: 'Grid Views', value: '5', color: 'fuchsia' },
            { icon: Database, label: 'Records', value: '1.2K', color: 'purple' },
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

        <div className="p-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-purple-600/10 border border-white/10 text-center">
          <TableIcon className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Data Tables</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Feature-rich data tables with sorting, filtering, pagination, row selection, inline editing, and export capabilities.
          </p>
        </div>
      </div>
    </>
  );
};

export default Tables;
