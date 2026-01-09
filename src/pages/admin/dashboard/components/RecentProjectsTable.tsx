import React from 'react';
import { Users } from 'lucide-react';

interface Project {
  name: string;
  assignedTo: string[];
  deadline: string;
  daysLeft: number;
  progress: number;
}

const RECENT_PROJECTS: Project[] = [
  { name: 'Website Redesign', assignedTo: ['John', 'Sarah', 'Mike'], deadline: '15th July, 2018', daysLeft: 3, progress: 75 },
  { name: 'Mobile App Development', assignedTo: ['Emma', 'David'], deadline: '20th July, 2018', daysLeft: 8, progress: 45 },
  { name: 'Dashboard Analytics', assignedTo: ['Alex', 'Lisa', 'Tom', 'Jane'], deadline: '25th July, 2018', daysLeft: 13, progress: 90 },
];

export const RecentProjectsTable: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-6">Recent Projects</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">PROJECT NAME</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">ASSIGNED TO</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">DEADLINE</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_PROJECTS.map((project, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4">
                  <p className="text-white font-medium">{project.name}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.assignedTo.slice(0, 3).map((member, i) => (
                        <div 
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 border-2 border-[#2e1065] flex items-center justify-center"
                          title={member}
                        >
                          <Users size={14} className="text-white" />
                        </div>
                      ))}
                      {project.assignedTo.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#2e1065] flex items-center justify-center text-xs text-white">
                          +{project.assignedTo.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-slate-400">+{project.assignedTo.length} more</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-white">{project.deadline}</p>
                  <p className="text-sm text-slate-400">{project.daysLeft} day left</p>
                </td>
                <td className="py-4 px-4">
                  <div className="w-full max-w-[120px]">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{project.progress}%</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
