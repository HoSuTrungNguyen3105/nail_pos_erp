import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Bell, Shield } from 'lucide-react';

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="h2">Account Settings</h1>
        <p className="text-[var(--muted-foreground)]">Manage your profile and security preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <Card className="w-full md:w-64 p-2 h-fit">
          <nav className="flex flex-col space-y-1">
            <NavButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<User size={18} />} label="General" />
            <NavButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Lock size={18} />} label="Security" />
            <NavButton active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell size={18} />} label="Notifications" />
          </nav>
        </Card>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <Card className="p-6 space-y-6">
              <h3 className="h3">Profile Information</h3>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={user?.name} />
                <Input label="Email Address" defaultValue={user?.email} disabled />
                <Input label="Phone Number" defaultValue="+1 (555) 000-0000" />
                <Input label="Role" defaultValue={user?.role} disabled />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6 space-y-6">
               <h3 className="h3">Security</h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)]">
                   <div className="flex items-center gap-4">
                     <div className="p-2 bg-blue-500/10 text-blue-500 rounded">
                       <Lock size={20} />
                     </div>
                     <div>
                       <p className="font-medium">Password</p>
                       <p className="text-sm text-[var(--muted-foreground)]">Last changed 3 months ago</p>
                     </div>
                   </div>
                   <Button variant="outline" size="sm">Change</Button>
                 </div>

                 <div className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)]">
                   <div className="flex items-center gap-4">
                     <div className="p-2 bg-green-500/10 text-green-500 rounded">
                       <Shield size={20} />
                     </div>
                     <div>
                       <p className="font-medium">Two-Factor Authentication</p>
                       <p className="text-sm text-[var(--muted-foreground)]">Add an extra layer of security</p>
                     </div>
                   </div>
                   <Button variant="outline" size="sm">Enable</Button>
                 </div>
               </div>
            </Card>
          )}
          
          {activeTab === 'notifications' && (
             <Card className="p-6 text-center py-12 text-[var(--muted-foreground)]">
                Notifications settings placeholder
             </Card>
          )}
        </div>
      </div>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors w-full text-left ${
      active
        ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
        : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
    }`}
  >
    {icon}
    {label}
  </button>
);
