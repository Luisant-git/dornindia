import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserCircle } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#00a3e0]/20 selection:text-navy">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-100 h-20 flex items-center justify-between px-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-heading font-semibold text-navy tracking-tight">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-navy leading-none">Admin User</p>
                <p className="text-xs text-neutral-500 mt-1">user@example.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 lg:p-12 overflow-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
