import React from 'react';
import { Users } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  status: 'In Progress' | 'Approved' | 'Pending';
  completedTasks: number;
  totalTasks: number;
  client: string;
  deadline: string;
  teamMembers?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  completedTasks,
  totalTasks,
  client,
  deadline,
  teamMembers = []
}) => {
  const statusColors = {
    'In Progress': 'bg-teal-500 text-white',
    'Approved': 'bg-blue-500 text-white',
    'Pending': 'bg-amber-500 text-white'
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-teal-500/50 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-400">Completed Task: {completedTasks}/{totalTasks}</p>
        </div>
        
        <div>
          <p className="text-sm text-slate-400">Client: <span className="text-teal-400 font-medium">{client}</span></p>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">Deadline: {deadline}</p>
          {teamMembers.length > 0 && (
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 3).map((member, idx) => (
                <div 
                  key={idx}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 border-2 border-[#2e1065] flex items-center justify-center"
                >
                  <Users size={14} className="text-white" />
                </div>
              ))}
              {teamMembers.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#2e1065] flex items-center justify-center text-xs text-white">
                  +{teamMembers.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
