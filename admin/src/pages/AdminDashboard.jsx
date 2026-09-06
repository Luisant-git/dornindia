import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, MessageSquare, Video } from 'lucide-react';
import { dashboardApi } from '../api/dashboardApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    therapists: 0,
    classes: 0,
    testimonials: 0,
    tutorials: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardApi.getStats();
        setStats({
          therapists: data.therapists || 0,
          classes: data.classes || 0,
          testimonials: data.testimonials || 0,
          tutorials: data.tutorials || 0
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Therapists Master', path: '/therapists', value: stats.therapists, icon: <Users size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'Classes Master', path: '/classes', value: stats.classes, icon: <BookOpen size={24} className="text-green-500" />, bg: 'bg-green-50' },
    { title: 'Tutorials Master', path: '/tutorials', value: stats.tutorials, icon: <Video size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
    { title: 'Feedback Master', path: '/feedback', value: stats.testimonials, icon: <MessageSquare size={24} className="text-purple-500" />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Dashboard Overview</h1>
          <p className="text-neutral-500 mt-1">Monitor your portal's key metrics at a glance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <Link key={index} to={card.path} className="group relative bg-white p-6 rounded-2xl shadow-md border border-neutral-100 flex flex-col justify-between hover:shadow-xl hover:shadow-[#00a3e0]/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} shadow-inner`}>
                {card.icon}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-navy mb-1 group-hover:text-[#00a3e0] transition-colors">{card.value}</h3>
              <p className="text-neutral-500 text-sm font-medium">{card.title}</p>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default AdminDashboard;
