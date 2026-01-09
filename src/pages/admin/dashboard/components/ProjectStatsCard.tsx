import React from 'react';

interface ProjectStatsCardProps {
  projectName: string;
  dateRange: string;
  tasks: number;
  completed: string;
  pending: string;
  version: string;
  status: 'Approved' | 'In Progress' | 'Pending';
}

export const ProjectStatsCard: React.FC<ProjectStatsCardProps> = ({
  projectName,
  dateRange,
  tasks,
  completed,
  pending,
  version,
  status
}) => {
  const statusColors = {
    'Approved': 'bg-teal-500 text-white',
    'In Progress': 'bg-blue-500 text-white',
    'Pending': 'bg-amber-500 text-white'
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{projectName}</h3>
          <p className="text-sm text-slate-400">{dateRange}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-4">
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-1">Tasks</p>
          <p className="text-2xl font-bold text-white">{tasks}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-1">Completed</p>
          <p className="text-2xl font-bold text-white">{completed}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-white">{pending}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400 mb-1">Version</p>
          <p className="text-2xl font-bold text-white">{version}</p>
        </div>
      </div>
      
      <div className="text-center">
        <a href="#" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
          {projectName} Statistics
        </a>
      </div>
    </div>
  );
};
