import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserCircle, LogOut, Menu } from 'lucide-react';

const AdminLayout = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/admin/login');
  };
  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-[#00a3e0]/20 selection:text-navy relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 w-full">
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-100 h-20 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 md:hidden text-navy hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-heading font-semibold text-navy tracking-tight truncate">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-6 relative">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-navy leading-none">Admin User</p>
                <p className="text-xs text-neutral-500 mt-1">user@example.com</p>
              </div>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/50"
              >
                <UserCircle size={24} />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-neutral-100 md:hidden bg-neutral-50/50">
                      <p className="text-sm font-semibold text-navy">Admin User</p>
                      <p className="text-xs text-neutral-500 truncate">user@example.com</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
