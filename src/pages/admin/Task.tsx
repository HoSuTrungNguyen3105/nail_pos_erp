import React from 'react';
import SEO from './components/SEO';
import { CheckSquare, Clock, Users, AlertCircle } from 'lucide-react';

const Task: React.FC = () => {
  return (
    <>
      <SEO 
        title="Task Management - TailAdmin"
        description="Manage tasks, projects, and team collaboration efficiently."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Task Management</h1>
          <p className="mt-2 text-slate-400">Organize and track your team's tasks and projects</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: CheckSquare, label: 'Total Tasks', value: '156', color: 'teal' },
            { icon: Clock, label: 'In Progress', value: '42', color: 'blue' },
            { icon: Users, label: 'Team Members', value: '12', color: 'purple' },
            { icon: AlertCircle, label: 'Overdue', value: '8', color: 'red' },
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

        <div className="p-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-600/10 border border-white/10 text-center">
          <CheckSquare className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Task Management System</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Complete task management with kanban boards, time tracking, team collaboration, and project milestones.
          </p>
        </div>
      </div>
    </>
  );
};

export default Task;
