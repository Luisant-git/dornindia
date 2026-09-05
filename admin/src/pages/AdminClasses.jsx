import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Eye, SquarePen, ChevronLeft, ChevronRight, Search, Upload } from 'lucide-react';
import { classes as initialClasses } from '../../../frontend/src/data/classes';
import { useToast } from '../components/Toast';

const AdminClasses = () => {
  const toast = useToast();
  const [classesList, setClassesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    startDate: '',
    endDate: '',
    duration: '',
    description: '',
    image: null
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

  const handleOpenModal = (cls = null, viewMode = false) => {
    setIsViewMode(viewMode);
    if (cls) {
      setEditingId(cls.id);
      setFormData({
        title: cls.title || '',
        category: cls.category || '',
        startDate: cls.startDate || '',
        endDate: cls.endDate || '',
        duration: cls.duration || '',
        description: cls.description || '',
        image: cls.image || null
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', startDate: '', endDate: '', duration: '', description: '', image: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updated = classesList.filter(c => c.id !== id);
      saveToStorage(updated);
      toast.success('Class deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateLabel = formData.startDate || formData.endDate
      ? (formData.startDate || '') + (formData.startDate && formData.endDate ? ' - ' + formData.endDate : '')
      : '';
    const payload = { ...formData, date: dateLabel };
    if (editingId) {
      const updated = classesList.map(c => c.id === editingId ? { ...c, ...payload } : c);
      saveToStorage(updated);
      toast.success('Class updated successfully');
    } else {
      const newClass = {
        id: `c-${Date.now()}`,
        ...payload
      };
      saveToStorage([newClass, ...classesList]);
      toast.success('Class added successfully');
    }
    setIsModalOpen(false);
  };

  const filteredClasses = classesList.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/30">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search classes..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
            />
            <Search size={18} className="absolute left-3.5 top-3 text-neutral-400" />
          </div>
          <div className="text-sm font-medium text-neutral-500 bg-white px-4 py-2 rounded-lg border border-neutral-200 shadow-sm">
            Total: <span className="text-navy font-bold">{filteredClasses.length}</span>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">Class Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Start Date</th>
                <th className="p-4 font-medium">End Date</th>
                <th className="p-4 font-medium">Days</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {paginatedClasses.map(c => (
                <tr key={c.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {c.image && (
                        <img src={c.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-neutral-200" />
                      )}
                      <div className="font-semibold text-navy">{c.title}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 shadow-sm border border-neutral-200/50">
                      {c.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-600 font-medium">{c.startDate || '-'}</td>
                  <td className="p-4 text-sm text-neutral-600">{c.endDate || '-'}</td>
                  <td className="p-4 text-sm text-neutral-600">{c.duration}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button onClick={() => handleOpenModal(c, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-emerald-100" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(c, false)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <SquarePen size={16} />
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
          {filteredClasses.length === 0 && (
            <div className="p-8 text-center text-neutral-500">No classes found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/30 flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Showing <span className="font-medium text-navy">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-navy">{Math.min(currentPage * itemsPerPage, filteredClasses.length)}</span> of <span className="font-medium text-navy">{filteredClasses.length}</span> results
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-md shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-center bg-white shrink-0">
              <h2 className="text-[22px] font-bold text-black">{isViewMode ? 'Class Details' : editingId ? 'Edit Class Details' : 'Add Class'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black text-2xl font-light leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden min-h-0">
              
              {/* Body */}
              <div className="px-8 pb-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
                {isViewMode ? (
                  <div className="pt-2">
                    {formData.image && (
                      <div className="mb-5 overflow-hidden -mx-8">
                        <img src={formData.image} alt="Class preview" className="w-full h-48 object-contain" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Class Title:</strong> {formData.title || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Category:</strong> {formData.category || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Start Date:</strong> {formData.startDate || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">End Date:</strong> {formData.endDate || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Days:</strong> {formData.duration || '-'}</div>
                      <div>
                        <strong className="text-black font-bold block mb-1">Description:</strong>
                        <div className="text-[15px] text-neutral-800 whitespace-pre-wrap leading-relaxed">{formData.description || '-'}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Class Image</label>
                      <label className={`group relative flex flex-col items-center justify-center w-full overflow-hidden rounded-xl border-2 border-dashed transition-all cursor-pointer ${formData.image ? 'border-[#00a3e0]/40 bg-[#00a3e0]/5' : 'border-neutral-200 bg-neutral-50/50 hover:border-[#00a3e0]/50 hover:bg-[#00a3e0]/5'}`}>
                        <input type="file" accept="image/*" className="hidden" onChange={e => setFormData({...formData, image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null})} />
                        {formData.image ? (
                          <>
                            <img src={formData.image} alt="Class preview" className="w-full max-h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-neutral-700 text-sm font-semibold">
                                <Upload size={16} /> Change image
                              </span>
                            </div>
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormData({...formData, image: null}); }} className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red-600 hover:bg-red-50 text-xs font-medium transition-colors shadow-sm border border-neutral-200">
                              <Trash2 size={13} /> Remove
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-neutral-200">
                              <Upload size={20} className="text-[#00a3e0]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-700">Click to upload class image</p>
                              <p className="text-xs text-neutral-400 mt-1">JPG or PNG · Recommended 800 x 400</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Class Title <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="Class title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="e.g., Seminar, Workshop" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                      <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400 cursor-pointer" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">End Date <span className="text-red-500">*</span></label>
                      <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400 cursor-pointer" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Days <span className="text-red-500">*</span></label>
                      <input required type="number" min="1" placeholder="e.g., 3" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                      <textarea rows="4" required placeholder="Full class description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm resize-none transition-all shadow-sm bg-white placeholder:text-gray-400"></textarea>
                    </div>
                    
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-8 py-6 flex justify-between shrink-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 bg-[#4b5563] text-white rounded-xl text-sm hover:bg-[#374151] transition-colors font-semibold shadow-sm">
                  Close
                </button>
                {!isViewMode && (
                  <button type="submit" className="px-6 py-2.5 bg-[#00a3e0] hover:bg-[#0082b3] text-white rounded-xl text-sm transition-colors font-semibold shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)]">
                    {editingId ? 'Update' : 'Save'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminClasses;
