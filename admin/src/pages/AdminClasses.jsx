import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, Eye, SquarePen, ChevronLeft, ChevronRight, Search, Upload, X } from 'lucide-react';
import { useToast } from '../components/Toast';
import { classesApi } from '../api/classesApi';
import config from '../config.js';

const AdminClasses = () => {
  const toast = useToast();
  const [classesList, setClassesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    startDate: '',
    endDate: '',
    duration: '',
    description: '',
    image: null,
    imageFile: null
  });

  const formatDate = (value) => {
    if (!value) return '-';
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-');
      return `${d}/${m}/${y}`;
    }
    return value;
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await classesApi.getAll();
        setClassesList(Array.isArray(data) ? data : data.items || []);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setClassesList([]);
      }
    };
    fetchClasses();
  }, []);

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
        image: cls.image || null,
        imageFile: null
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', startDate: '', endDate: '', duration: '', description: '', image: null, imageFile: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await classesApi.delete(deleteId);
      setClassesList(prev => prev.filter(c => c.id !== deleteId));
      toast.success('Class deleted successfully');
    } catch (error) {
      console.error('Failed to delete class:', error);
      toast.error('Failed to delete class');
    }
    setDeleteId(null);
  };

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append('image', file);
    const response = await fetch(`${config.API_BASE_URL}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      body
    });
    if (!response.ok) throw new Error('Failed to upload image');
    const { url } = await response.json();
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }
      const payload = {
        title: formData.title,
        category: formData.category,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: formData.duration,
        description: formData.description,
        image: imageUrl
      };
      if (editingId) {
        const updated = await classesApi.update(editingId, payload);
        setClassesList(prev => prev.map(c => c.id === editingId ? updated : c));
        toast.success('Class updated successfully');
      } else {
        const created = await classesApi.create(payload);
        setClassesList(prev => [created, ...prev]);
        toast.success('Class added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save class:', error);
      toast.error('Failed to save class');
    }
  };

  const hasActiveFilters = searchTerm || dateFrom || dateTo;

  const clearAllFilters = () => {
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const filteredClasses = classesList.filter(c => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      (c.title || '').toLowerCase().includes(term) ||
      (c.category || '').toLowerCase().includes(term) ||
      (c.duration || '').toLowerCase().includes(term);

    const matchesFrom = !dateFrom || (c.startDate && c.startDate >= dateFrom);
    const matchesTo = !dateTo || (c.startDate && c.startDate <= dateTo);

    return matchesSearch && matchesFrom && matchesTo;
  });

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy tracking-tight">Classes Master</h1>
          <p className="text-neutral-500 mt-1">Manage training classes and seminars.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium w-full sm:w-auto"
        >
          <Plus size={18} className="mr-2" />
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search by title, category, days..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
              />
              <Search size={18} className="absolute left-3.5 top-3 text-neutral-400" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                placeholder="From date"
                className="w-full sm:w-40 px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
              />
              <span className="text-neutral-400 text-sm">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                placeholder="To date"
                className="w-full sm:w-40 px-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
              />
            </div>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium border border-red-200">
                <X size={14} /> Clear
              </button>
            )}
          </div>
          <div className="text-sm font-medium text-neutral-500 bg-white px-4 py-2 rounded-lg border border-neutral-200 shadow-sm self-start sm:self-auto">
            Total: <span className="text-navy font-bold">{filteredClasses.length}</span>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">S.No</th>
                <th className="p-4 font-medium">Class Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Start Date</th>
                <th className="p-4 font-medium">End Date</th>
                <th className="p-4 font-medium">Days</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {paginatedClasses.map((c, idx) => (
                <tr key={c.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4 text-sm text-neutral-600">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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
                  <td className="p-4 text-sm text-neutral-600 font-medium">{formatDate(c.startDate)}</td>
                  <td className="p-4 text-sm text-neutral-600">{formatDate(c.endDate)}</td>
                  <td className="p-4 text-sm text-neutral-600">{c.duration}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button onClick={() => handleOpenModal(c, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-emerald-100" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(c, false)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <SquarePen size={16} />
                      </button>
                      <button onClick={() => setDeleteId(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100" title="Delete">
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
          <div className="px-4 md:px-6 py-4 border-t border-neutral-100 bg-neutral-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
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
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Start Date:</strong> {formatDate(formData.startDate)}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">End Date:</strong> {formatDate(formData.endDate)}</div>
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
                      <input type="file" id="class-image-input" accept="image/*" className="hidden" onChange={e => { const file = e.target.files[0]; setFormData({...formData, imageFile: file || null, image: file ? URL.createObjectURL(file) : null}); }} />
                      {formData.image ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                          <label htmlFor="class-image-input" className="cursor-pointer group relative overflow-hidden rounded-xl border border-neutral-200 w-full max-h-64">
                            <img src={formData.image} alt="Class preview" className="w-full max-h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-neutral-700 text-sm font-semibold">
                                <Upload size={16} /> Change image
                              </span>
                            </div>
                          </label>
                          <button type="button" onClick={() => setFormData({...formData, image: null, imageFile: null})} className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:underline text-sm font-medium transition-colors">
                            <Trash2 size={15} /> Remove image
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="class-image-input" className="group relative flex flex-col items-center justify-center w-full py-10 px-6 overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/60 hover:border-[#00a3e0]/60 hover:bg-[#00a3e0]/5 transition-all cursor-pointer text-center">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-neutral-200 mb-3 group-hover:border-[#00a3e0]/40 group-hover:shadow-[#00a3e0]/10 transition-all">
                            <Upload size={22} className="text-[#00a3e0]" />
                          </div>
                          <p className="text-sm font-semibold text-neutral-700">Upload class image</p>
                          <p className="text-xs text-neutral-400 mt-1">JPG or PNG · Recommended 800 x 400</p>
                        </label>
                      )}
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

      {deleteId && createPortal(
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-md shadow-xl w-full max-w-sm animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Delete Class</h3>
              <p className="text-sm text-neutral-500">Are you sure you want to delete this class? This action cannot be undone.</p>
            </div>
            <div className="px-6 py-4 bg-neutral-50 flex items-center justify-center gap-3 border-t border-neutral-100">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-5 py-2.5 bg-[#4b5563] text-white rounded-xl text-sm hover:bg-[#374151] transition-colors font-semibold shadow-sm text-center">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-colors font-semibold shadow-sm text-center">
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminClasses;
