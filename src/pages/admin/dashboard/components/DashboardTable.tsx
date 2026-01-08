import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  title: string;
  department: string;
  status: 'Active' | 'Offline' | 'Busy';
  role: string;
}

const USERS_DATA: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
    title: "Software Engineer",
    department: "Web dev",
    status: "Active",
    role: "Owner"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=d946ef&color=fff",
    title: "Product Manager",
    department: "Product",
    status: "Active",
    role: "Admin"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=2dd4bf&color=fff",
    title: "Designer",
    department: "UI/UX",
    status: "Offline",
    role: "Owner"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=f43f5e&color=fff",
    title: "Sales Lead",
    department: "Sales",
    status: "Active",
    role: "Admin"
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    avatar: "https://ui-avatars.com/api/?name=Tom+Brown&background=8b5cf6&color=fff",
    title: "Developer",
    department: "Backend",
    status: "Busy",
    role: "Member"
  },
];

export const DashboardTable: React.FC = () => {
  return (
    <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 font-semibold">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {USERS_DATA.map((user) => (
              <tr key={user.id} className="group hover:bg-white/5 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full ring-2 ring-white/10 group-hover:ring-fuchsia-500/50 transition-all"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-200">{user.title}</div>
                  <div className="text-xs text-slate-500">{user.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${user.status === 'Active' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : ''}
                    ${user.status === 'Offline' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : ''}
                    ${user.status === 'Busy' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-400">{user.role}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-fuchsia-400 hover:text-white font-medium text-sm transition-colors hover:underline decoration-fuchsia-500/50">
                        Edit
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
