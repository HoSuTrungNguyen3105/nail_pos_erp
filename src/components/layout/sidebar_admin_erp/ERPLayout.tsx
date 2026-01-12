import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Search, Bell, MessageSquare, Mail, Menu } from 'lucide-react';
import ERPSidebar from './ERPSidebar';

const ERPLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f7fa] overflow-hidden text-slate-800">
      {/* Sidebar - Handles its own fixed/mobile positioning */}
      <ERPSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen lg:pl-72">
        
        {/* Global Header */}
        <header className="h-20 flex items-center justify-between px-4 sm:px-8 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center w-full max-w-xl group">
              <input 
                type="text" 
                placeholder="Search for datas & reports..." 
                className="bg-[#f5f7fa] border border-slate-200 border-r-0 rounded-l-lg px-4 sm:px-5 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none w-full focus:bg-white transition-all ring-0 border-r-0"
              />
              <button className="bg-[#3b82f6] hover:bg-blue-600 p-[11px] rounded-r-lg text-white transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 ml-4">
            <div className="hidden md:flex items-center gap-3 text-slate-400">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-all">
                <MessageSquare size={20} />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">1</span>
              </button>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-all">
                <Mail size={20} />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
              </button>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-all">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block" />

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-700 leading-tight">John Doe</p>
                <button className="text-[10px] text-slate-400 font-bold uppercase hover:text-blue-500 transition-colors">Sign Out</button>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-slate-100 cursor-pointer">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f5f7fa]">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ERPLayout;
