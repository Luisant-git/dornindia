import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Search, Eye, SquarePen, ChevronLeft, ChevronRight, Upload, User, X } from 'lucide-react';
import { useToast } from '../components/Toast';
import { therapistsApi } from '../api/therapistsApi';
import config from '../config.js';

const AdminTherapists = () => {
  const toast = useToast();
  const [therapists, setTherapists] = useState([]);
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
    profile: null,
    profileFile: null,
    name: '',
    designation: '',
    address: '',
    batch: '',
    date: ''
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
    const fetchTherapists = async () => {
      try {
        const data = await therapistsApi.getAll();
        setTherapists(Array.isArray(data) ? data : data.items || []);
      } catch (error) {
        console.error('Failed to fetch therapists:', error);
        setTherapists([]);
      }
    };
    fetchTherapists();
  }, []);



  const handleOpenModal = (therapist = null, viewMode = false) => {
    setIsViewMode(viewMode);
    if (therapist) {
      setEditingId(therapist.id);
      setFormData({
        name: therapist.name || '',
        designation: therapist.designation || '',
        address: therapist.address || '',
        batch: therapist.batch || '',
        date: therapist.date || '',
        profile: therapist.image || null,
        profileFile: null
      });
    } else {
      setEditingId(null);
      setFormData({ profile: null, profileFile: null, name: '', designation: '', address: '', batch: '', date: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await therapistsApi.delete(deleteId);
      setTherapists(prev => prev.filter(t => t.id !== deleteId));
      toast.success('Therapist deleted successfully');
    } catch (error) {
      console.error('Failed to delete therapist:', error);
      toast.error('Failed to delete therapist');
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
    if (!editingId && !formData.profile) {
      toast.error('', 'Profile image is required');
      return;
    }
    try {
      let imageUrl = formData.profile;
      if (formData.profileFile) {
        imageUrl = await uploadImage(formData.profileFile);
      }
      const payload = {
        name: formData.name,
        designation: formData.designation,
        address: formData.address,
        batch: formData.batch,
        date: formData.date,
        image: imageUrl
      };
      if (editingId) {
        const updated = await therapistsApi.update(editingId, payload);
        setTherapists(prev => prev.map(t => t.id === editingId ? updated : t));
        toast.success('Therapist updated successfully');
      } else {
        const created = await therapistsApi.create(payload);
        setTherapists(prev => [created, ...prev]);
        toast.success('Therapist added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save therapist:', error);
      toast.error('Failed to save therapist');
    }
  };

  const hasActiveFilters = searchTerm || dateFrom || dateTo;

  const clearAllFilters = () => {
    setSearchTerm('');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const filteredTherapists = therapists.filter(t => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      (t.name || '').toLowerCase().includes(term) ||
      (t.designation || '').toLowerCase().includes(term) ||
      (t.batch || '').toLowerCase().includes(term);

    const matchesFrom = !dateFrom || (t.date && t.date >= dateFrom);
    const matchesTo = !dateTo || (t.date && t.date <= dateTo);

    return matchesSearch && matchesFrom && matchesTo;
  });

  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage);
  const paginatedTherapists = filteredTherapists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy tracking-tight">Therapists Master</h1>
          <p className="text-neutral-500 mt-1">Manage therapists, instructors, and practitioners.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium w-full sm:w-auto"
        >
          <Plus size={18} className="mr-2" />
          Add Therapist
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search by name, designation, batch..." 
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
            Total: <span className="text-navy font-bold">{filteredTherapists.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">S.No</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Designation</th>
                <th className="p-4 font-medium">Batch</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {paginatedTherapists.map((t, idx) => (
                <tr key={t.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4 text-sm text-neutral-600">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="p-4">
                    <div className="font-semibold text-navy group-hover:text-[#00a3e0] transition-colors">{t.name}</div>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">
                    <span className="capitalize">{t.designation || '-'}</span>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">{t.batch || '-'}</td>
                  <td className="p-4 text-sm text-neutral-600">{formatDate(t.date)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button onClick={() => handleOpenModal(t, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-emerald-100" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(t, false)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <SquarePen size={16} />
                      </button>
                      <button onClick={() => setDeleteId(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100" title="Delete">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 md:px-6 py-4 border-t border-neutral-100 bg-neutral-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-neutral-500">
              Showing <span className="font-medium text-navy">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-navy">{Math.min(currentPage * itemsPerPage, filteredTherapists.length)}</span> of <span className="font-medium text-navy">{filteredTherapists.length}</span> results
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
              <h2 className="text-[22px] font-bold text-black">{isViewMode ? 'Therapist Details' : editingId ? 'Edit Therapist' : 'Add Therapist'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black text-2xl font-light leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden min-h-0">
              
              {/* Body */}
              <div className="px-8 pb-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
                {isViewMode ? (
                  <div className="space-y-4 pt-2">
                    {formData.profile && (
                      <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-neutral-100 border border-neutral-200">
                          <img src={formData.profile} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Full Name:</strong> {formData.name || '-'}</div>
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Designation:</strong> {formData.designation || '-'}</div>
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Address:</strong> {formData.address || '-'}</div>
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Batch:</strong> {formData.batch || '-'}</div>
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Completed Date:</strong> {formatDate(formData.date)}</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Profile Image <span className="text-red-500">*</span></label>
                      <input type="file" id="therapist-profile-input" accept="image/*" className="hidden" onChange={e => { const file = e.target.files[0]; setFormData({...formData, profileFile: file || null, profile: file ? URL.createObjectURL(file) : null}); }} />
                      {formData.profile ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                          <label htmlFor="therapist-profile-input" className="cursor-pointer group relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-neutral-100 border border-neutral-200">
                              <img src={formData.profile} alt="Profile preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-neutral-700 text-xs font-semibold">
                                <Upload size={14} /> Change
                              </span>
                            </div>
                          </label>
                          <button type="button" onClick={() => setFormData({...formData, profile: null, profileFile: null})} className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:underline text-sm font-medium transition-colors">
                            <Trash2 size={15} /> Remove photo
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="therapist-profile-input" className="group relative flex flex-col items-center justify-center w-full py-10 px-6 overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/60 hover:border-[#00a3e0]/60 hover:bg-[#00a3e0]/5 transition-all cursor-pointer text-center">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-neutral-200 mb-3 group-hover:border-[#00a3e0]/40 group-hover:shadow-[#00a3e0]/10 transition-all">
                            <Upload size={22} className="text-[#00a3e0]" />
                          </div>
                          <p className="text-sm font-semibold text-neutral-700">Upload profile image</p>
                          <p className="text-xs text-neutral-400 mt-1">JPG or PNG, max 2MB</p>
                        </label>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Designation</label>
                      <input type="text" placeholder="Designation" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Address</label>
                      <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>

                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Batch</label>
                      <input type="text" placeholder="Batch (e.g. Chennai)" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Completed Date</label>
                      <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400 cursor-pointer" />
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
              <h3 className="text-lg font-bold text-black mb-2">Delete Therapist</h3>
              <p className="text-sm text-neutral-500">Are you sure you want to delete this therapist? This action cannot be undone.</p>
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

export default AdminTherapists;
