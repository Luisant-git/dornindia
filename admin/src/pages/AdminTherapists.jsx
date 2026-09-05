import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { instructors, advancedTherapists, generalTherapists } from '../../../frontend/src/data/therapistsData';

const AdminTherapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    address: '',
    phone: '',
    email: '',
    category: 'general'
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_therapists');
    if (saved) {
      setTherapists(JSON.parse(saved));
    } else {
      const initial = [
        ...instructors.map(t => ({ ...t, category: 'instructor' })),
        ...advancedTherapists.map(t => ({ ...t, category: 'advanced' })),
        ...generalTherapists.map(t => ({ ...t, category: 'general' }))
      ];
      setTherapists(initial);
      localStorage.setItem('admin_therapists', JSON.stringify(initial));
    }
  }, []);

  const saveToStorage = (data) => {
    setTherapists(data);
    localStorage.setItem('admin_therapists', JSON.stringify(data));
  };

  const handleOpenModal = (therapist = null) => {
    if (therapist) {
      setEditingId(therapist.id);
      setFormData({
        name: therapist.name || '',
        title: therapist.title || '',
        address: therapist.address || '',
        phone: therapist.phone || '',
        email: therapist.email || '',
        category: therapist.category || 'general'
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', title: '', address: '', phone: '', email: '', category: 'general' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this therapist?')) {
      const updated = therapists.filter(t => t.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = therapists.map(t => t.id === editingId ? { ...t, ...formData } : t);
      saveToStorage(updated);
    } else {
      const newTherapist = {
        id: `t-${Date.now()}`,
        ...formData
      };
      saveToStorage([newTherapist, ...therapists]);
    }
    setIsModalOpen(false);
  };

  const filteredTherapists = therapists.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.address && t.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Therapists Master</h1>
          <p className="text-neutral-500 mt-1">Manage therapists, instructors, and practitioners.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium"
        >
          <Plus size={18} className="mr-2" />
          Add Therapist
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/30">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search therapists..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
            />
            <Search size={18} className="absolute left-3.5 top-3 text-neutral-400" />
          </div>
          <div className="text-sm font-medium text-neutral-500 bg-white px-4 py-2 rounded-lg border border-neutral-200 shadow-sm">
            Total: <span className="text-navy font-bold">{filteredTherapists.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {filteredTherapists.map(t => (
                <tr key={t.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="font-semibold text-navy group-hover:text-[#00a3e0] transition-colors">{t.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{t.title}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm border
                      ${t.category === 'instructor' ? 'bg-purple-50 text-purple-700 border-purple-200/60' : 
                        t.category === 'advanced' ? 'bg-blue-50 text-blue-700 border-blue-200/60' : 
                        'bg-emerald-50 text-emerald-700 border-emerald-200/60'}`}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-600 max-w-[12rem] truncate" title={t.address}>
                    {t.address || '-'}
                  </td>
                  <td className="p-4 text-sm text-neutral-600">
                    <div className="font-medium">{t.phone || '-'}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{t.email || ''}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTherapists.length === 0 && (
            <div className="p-8 text-center text-neutral-500">No therapists found.</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h2 className="text-xl font-heading font-bold text-navy">{editingId ? 'Edit Therapist' : 'Add New Therapist'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-navy transition-colors bg-white p-1.5 rounded-full shadow-sm hover:shadow">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm cursor-pointer">
                    <option value="general">General Therapist</option>
                    <option value="advanced">Advanced Therapist</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Professional Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Address / Location</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-neutral-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-neutral-200 bg-white rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-[#00a3e0] text-white rounded-xl hover:bg-[#0082b3] transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium">
                  {editingId ? 'Update Therapist' : 'Save Therapist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTherapists;
