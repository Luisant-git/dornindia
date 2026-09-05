import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, LogOut, Globe } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Therapists Master', path: '/therapists', icon: <Users size={20} /> },
    { name: 'Classes Master', path: '/classes', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="w-64 bg-white text-navy flex flex-col h-screen sticky top-0 border-r border-neutral-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <img src="/favicon.png" alt="Dorn India" className="w-10 h-10 object-contain" />
          <h2 className="text-xl font-heading font-bold tracking-wide text-navy">Dorn India</h2>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1 relative z-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'text-[#00a3e0] font-bold bg-[#00a3e0]/5' 
                  : 'text-neutral-500 hover:text-navy hover:bg-neutral-50 font-bold'
              }`}
            >
              <div className={`transition-colors duration-200 ${isActive ? 'text-[#00a3e0]' : 'text-neutral-400 group-hover:text-navy'}`}>
                {item.icon}
              </div>
              <span className="tracking-wide text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 relative z-10 bg-white">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 w-full text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
