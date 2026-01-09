import React from 'react';
import SEO from './components/SEO';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <>
      <SEO 
        title="Settings - TailAdmin"
        description="Configure your application settings and preferences."
      />

      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="mt-2 text-slate-400">Manage your application configuration</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: User, title: 'Profile Settings', desc: 'Update your personal information', color: 'fuchsia' },
            { icon: Bell, title: 'Notifications', desc: 'Configure notification preferences', color: 'teal' },
            { icon: Shield, title: 'Security', desc: 'Manage security and privacy', color: 'purple' },
            { icon: Palette, title: 'Appearance', desc: 'Customize theme and layout', color: 'blue' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <item.icon className={`w-10 h-10 text-${item.color}-400 mb-3 group-hover:scale-110 transition-transform`} />
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-600/10 border border-white/10 text-center">
          <SettingsIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Application Settings</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Comprehensive settings panel for user preferences, system configuration, integrations, and customization options.
          </p>
        </div>
      </div>
    </>
  );
};

export default Settings;
