import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { classes as initialClasses } from '../../../frontend/src/data/classes';

const AdminClasses = () => {
  const [classesList, setClassesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_classes');
    if (saved) {
      setClassesList(JSON.parse(saved));
    } else {
      setClassesList(initialClasses);
      localStorage.setItem('admin_classes', JSON.stringify(initialClasses));
    }
  }, []);

  const saveToStorage = (data) => {
    setClassesList(data);
    localStorage.setItem('admin_classes', JSON.stringify(data));
  };

  const handleOpenModal = (cls = null) => {
    if (cls) {
      setEditingId(cls.id);
      setFormData({
        title: cls.title || '',
        category: cls.category || '',
        date: cls.date || '',
        duration: cls.duration || '',
        description: cls.description || ''
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', date: '', duration: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updated = classesList.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = classesList.map(c => c.id === editingId ? { ...c, ...formData } : c);
      saveToStorage(updated);
    } else {
      const newClass = {
        id: `c-${Date.now()}`,
        ...formData
      };
      saveToStorage([newClass, ...classesList]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Classes Master</h1>
          <p className="text-neutral-500 mt-1">Manage training classes and seminars.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium"
        >
          <Plus size={18} className="mr-2" />
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">Class Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date & Duration</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {classesList.map(c => (
                <tr key={c.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4 font-semibold text-navy">{c.title}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 shadow-sm border border-neutral-200/50">
                      {c.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">
                    <div className="font-medium">{c.date}</div>
                    <div className="text-xs text-neutral-400 mt-0.5 flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#00a3e0]/50 mr-1.5"></div>{c.duration}</div>
                  </td>
                  <td className="p-4 text-sm text-neutral-600 max-w-xs truncate" title={c.description}>
                    {c.description}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {classesList.length === 0 && (
            <div className="p-8 text-center text-neutral-500">No classes found.</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
              <h2 className="text-xl font-heading font-bold text-navy">{editingId ? 'Edit Class' : 'Add New Class'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-navy transition-colors bg-white p-1.5 rounded-full shadow-sm hover:shadow">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Class Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                  <input required type="text" placeholder="e.g., Seminar, Workshop" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Date</label>
                  <input required type="text" placeholder="e.g., Oct 15 - 17, 2024" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Duration</label>
                  <input required type="text" placeholder="e.g., 3 Days" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
                  <textarea rows="3" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] outline-none transition-all shadow-sm resize-none"></textarea>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-neutral-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-neutral-200 bg-white rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-[#00a3e0] text-white rounded-xl hover:bg-[#0082b3] transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium">
                  {editingId ? 'Update Class' : 'Save Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClasses;
