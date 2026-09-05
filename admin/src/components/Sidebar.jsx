import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Video, LogOut, Globe } from 'lucide-react';

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
    { name: 'Tutorials Master', path: '/tutorials', icon: <Video size={20} /> },
  ];

  return (
    <div className="w-64 bg-navy text-white flex flex-col h-screen sticky top-0 border-r border-navy/90 shadow-xl relative overflow-hidden">
      <div className="p-6">
        <div className="font-heading font-bold text-xl tracking-wider flex items-center text-white">
          <img src="/favicon.png" alt="Dorn India Logo" className="h-10 w-auto mr-3 object-contain bg-white rounded-full p-1 shadow-sm border border-neutral-100" />
          DORN INDIA
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
                  ? 'text-white font-bold bg-[#00a3e0]' 
                  : 'text-white hover:bg-white/10 font-bold'
              }`}
            >
              <div className="text-white transition-colors duration-200">
                {item.icon}
              </div>
              <span className="tracking-wide text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 relative z-10 bg-navy">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 w-full text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
