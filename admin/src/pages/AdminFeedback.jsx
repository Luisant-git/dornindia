import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Eye, SquarePen, ChevronLeft, ChevronRight, Search, Upload, Star, StarHalf, User } from 'lucide-react';
import { useToast } from '../components/Toast';
import { feedbackApi } from '../api/feedbackApi';

const AdminFeedback = () => {
  const toast = useToast();
  const [feedbacksList, setFeedbacksList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    rating: 5,
    feedback: '',
    image: null
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackApi.getAll();
        setFeedbacksList(data);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
        setFeedbacksList([]);
      }
    };
    fetchFeedback();
  }, []);

  const saveToStorage = (data) => {
    setFeedbacksList(data);
    localStorage.setItem('admin_feedbacks', JSON.stringify(data));
  };

  const handleOpenModal = (fb = null, viewMode = false) => {
    setIsViewMode(viewMode);
    if (fb) {
      setEditingId(fb.id);
      setFormData({
        name: fb.name || '',
        profession: fb.profession || '',
        rating: fb.rating || 5,
        feedback: fb.feedback || '',
        image: fb.image || null
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', profession: '', rating: 5, feedback: '', image: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      const updated = feedbacksList.filter(f => f.id !== id);
      saveToStorage(updated);
      toast.success('Feedback deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = feedbacksList.map(f => f.id === editingId ? { ...f, ...formData } : f);
      saveToStorage(updated);
      toast.success('Feedback updated successfully');
    } else {
      const newFeedback = {
        id: `fb-${Date.now()}`,
        ...formData
      };
      saveToStorage([newFeedback, ...feedbacksList]);
      toast.success('Feedback added successfully');
    }
    setIsModalOpen(false);
  };

  const filteredFeedbacks = feedbacksList.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (f.feedback && f.feedback.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rateStars = (rating) => {
    const r = Number(rating) || 0;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          const full = i + 1 <= r;
          const half = !full && i < r;
          if (full) return <Star key={i} size={14} className="text-yellow-400 fill-current" />;
          if (half) return <div key={i} className="relative"><Star size={14} className="text-neutral-200" /><StarHalf size={14} className="absolute top-0 left-0 text-yellow-400 fill-current" /></div>;
          return <Star key={i} size={14} className="text-neutral-200" />;
        })}
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy tracking-tight">Feedback Master</h1>
          <p className="text-neutral-500 mt-1">Manage testimonials and therapist feedback.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium w-full sm:w-auto"
        >
          <Plus size={18} className="mr-2" />
          Add Feedback
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50/30">
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Search feedbacks..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white"
            />
            <Search size={18} className="absolute left-3.5 top-3 text-neutral-400" />
          </div>
          <div className="text-sm font-medium text-neutral-500 bg-white px-4 py-2 rounded-lg border border-neutral-200 shadow-sm self-start sm:self-auto">
            Total: <span className="text-navy font-bold">{filteredFeedbacks.length}</span>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Profession</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Feedback</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {paginatedFeedbacks.map(f => (
                <tr key={f.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {f.image && (
                        <img src={f.image} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-neutral-200" />
                      )}
                      <div className="font-semibold text-navy">{f.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-neutral-600">{f.profession || '-'}</td>
                  <td className="p-4">{rateStars(f.rating)}</td>
                  <td className="p-4 text-sm text-neutral-600 max-w-xs truncate" title={f.feedback}>
                    {f.feedback || '-'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button onClick={() => handleOpenModal(f, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-emerald-100" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(f, false)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <SquarePen size={16} />
                      </button>
                      <button onClick={() => handleDelete(f.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-red-100" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFeedbacks.length === 0 && (
            <div className="p-8 text-center text-neutral-500">No feedbacks found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 md:px-6 py-4 border-t border-neutral-100 bg-neutral-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-neutral-500">
              Showing <span className="font-medium text-navy">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-navy">{Math.min(currentPage * itemsPerPage, filteredFeedbacks.length)}</span> of <span className="font-medium text-navy">{filteredFeedbacks.length}</span> results
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
              <h2 className="text-[22px] font-bold text-black">{isViewMode ? 'Feedback Details' : editingId ? 'Edit Feedback' : 'Add Feedback'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black text-2xl font-light leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden min-h-0">
              
              {/* Body */}
              <div className="px-8 pb-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
                {isViewMode ? (
                  <div className="space-y-4 pt-2">
                    {formData.image && (
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg border-neutral-200">
                          <img src={formData.image} alt="Profile preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Name:</strong> {formData.name || '-'}</div>
                    <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Profession:</strong> {formData.profession || '-'}</div>
                    <div className="text-[15px] text-neutral-800 flex items-center gap-2">
                      <strong className="text-black font-bold">Rating:</strong> {rateStars(formData.rating)}
                    </div>
                    <div>
                      <strong className="text-black font-bold block mb-1">Feedback:</strong>
                      <div className="text-[15px] text-neutral-800 whitespace-pre-wrap leading-relaxed">"{formData.feedback || '-'}"</div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="Therapist name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Profession</label>
                      <input type="text" placeholder="e.g., Physiotherapist" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Rating <span className="text-red-500">*</span></label>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => {
                          const halfVal = i + 0.5;
                          const fullVal = i + 1;
                          const isHalf = formData.rating === halfVal;
                          const isFull = formData.rating >= fullVal;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFormData(prev => {
                                if (prev.rating === halfVal) return { ...prev, rating: fullVal };
                                if (prev.rating === fullVal) return { ...prev, rating: halfVal };
                                return { ...prev, rating: halfVal };
                              })}
                              title={`${halfVal} or ${fullVal} stars`}
                              className="p-1 transition-all hover:scale-110"
                            >
                              <div className="relative">
                                {isHalf ? (
                                  <Star size={30} className="text-neutral-200" />
                                ) : (
                                  <Star size={30} className={isFull ? "text-yellow-400 fill-current" : "text-neutral-300"} />
                                )}
                                {isHalf && (
                                  <StarHalf size={30} className="absolute top-0 left-0 text-yellow-400 fill-current drop-shadow" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                        <span className="ml-2 text-sm text-neutral-500">{formData.rating} / 5</span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2">Tap a star once for half fill, tap again for full.</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Profile Image</label>
                      <input type="file" id="feedback-profile-input" accept="image/*" className="hidden" onChange={e => setFormData({...formData, image: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null})} />
                      {formData.image ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-6">
                          <label htmlFor="feedback-profile-input" className="cursor-pointer group relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-neutral-100 border border-neutral-200">
                              <img src={formData.image} alt="Profile preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-neutral-700 text-xs font-semibold">
                                <Upload size={14} /> Change
                              </span>
                            </div>
                          </label>
                          <button type="button" onClick={() => setFormData({...formData, image: null})} className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:underline text-sm font-medium transition-colors">
                            <Trash2 size={15} /> Remove photo
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="feedback-profile-input" className="group relative flex flex-col items-center justify-center w-full py-10 px-6 overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/60 hover:border-[#00a3e0]/60 hover:bg-[#00a3e0]/5 transition-all cursor-pointer text-center">
                          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm border border-neutral-200 mb-3 group-hover:border-[#00a3e0]/40 group-hover:shadow-[#00a3e0]/10 transition-all">
                            <Upload size={22} className="text-[#00a3e0]" />
                          </div>
                          <p className="text-sm font-semibold text-neutral-700">Upload profile image</p>
                          <p className="text-xs text-neutral-400 mt-1">JPG or PNG, max 2MB</p>
                        </label>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Feedback <span className="text-red-500">*</span></label>
                      <textarea rows="4" required placeholder="Therapist feedback" value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm resize-none transition-all shadow-sm bg-white placeholder:text-gray-400"></textarea>
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

export default AdminFeedback;