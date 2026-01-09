import React from 'react';
import SEO from './components/SEO';
import { MessageSquare, Inbox, Send, Archive } from 'lucide-react';

const Messages: React.FC = () => {
  return (
    <>
      <SEO 
        title="Messages - TailAdmin"
        description="Manage your messages and communications."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Messages</h1>
          <p className="mt-2 text-slate-400">Communicate with your team and customers</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Inbox, label: 'Inbox', value: '24', color: 'blue' },
            { icon: Send, label: 'Sent', value: '156', color: 'teal' },
            { icon: Archive, label: 'Archived', value: '89', color: 'purple' },
            { icon: MessageSquare, label: 'Unread', value: '12', color: 'fuchsia' },
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

        <div className="p-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-fuchsia-600/10 border border-white/10 text-center">
          <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Messaging System</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Full-featured messaging with real-time chat, email integration, notifications, and conversation management.
          </p>
        </div>
      </div>
    </>
  );
};

export default Messages;
