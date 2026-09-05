import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit2, Trash2, Eye, SquarePen, ChevronLeft, ChevronRight, Search, Upload, Link2 } from 'lucide-react';
import { tutorials as initialTutorials } from '../../../frontend/src/data/tutorials';

const AdminTutorials = () => {
  const [tutorialsList, setTutorialsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    uploadDate: '',
    duration: '',
    description: '',
    thumbnail: null,
    videoUrl: '',
    video: null
  });

  useEffect(() => {
    const saved = localStorage.getItem('admin_tutorials');
    if (saved) {
      setTutorialsList(JSON.parse(saved));
    } else {
      setTutorialsList(initialTutorials);
      localStorage.setItem('admin_tutorials', JSON.stringify(initialTutorials));
    }
  }, []);

  const saveToStorage = (data) => {
    setTutorialsList(data);
    localStorage.setItem('admin_tutorials', JSON.stringify(data));
  };

  const handleOpenModal = (tut = null, viewMode = false) => {
    setIsViewMode(viewMode);
    if (tut) {
      setEditingId(tut.id);
      setFormData({
        title: tut.title || '',
        category: tut.category || '',
        uploadDate: tut.uploadDate || '',
        duration: tut.duration || '',
        description: tut.description || '',
        thumbnail: tut.thumbnail || null,
        videoUrl: tut.videoUrl || '',
        video: null
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', category: '', uploadDate: '', duration: '', description: '', thumbnail: null, videoUrl: '', video: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      const updated = tutorialsList.filter(t => t.id !== id);
      saveToStorage(updated);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoUpload = (file) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = objectUrl;
    video.onloadedmetadata = () => {
      const duration = formatDuration(video.duration);
      const today = new Date().toISOString().slice(0, 10);
      setFormData(prev => ({
        ...prev,
        video: objectUrl,
        videoUrl: objectUrl,
        duration: duration || prev.duration,
        uploadDate: prev.uploadDate || today
      }));
      URL.revokeObjectURL(objectUrl);
    };
    video.onerror = () => {
      const today = new Date().toISOString().slice(0, 10);
      setFormData(prev => ({
        ...prev,
        video: objectUrl,
        videoUrl: objectUrl,
        uploadDate: prev.uploadDate || today
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updated = tutorialsList.map(t => t.id === editingId ? { ...t, ...formData } : t);
      saveToStorage(updated);
    } else {
      const newTutorial = {
        id: `t-${Date.now()}`,
        ...formData
      };
      saveToStorage([newTutorial, ...tutorialsList]);
    }
    setIsModalOpen(false);
  };

  const filteredTutorials = tutorialsList.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTutorials.length / itemsPerPage);
  const paginatedTutorials = filteredTutorials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy tracking-tight">Tutorials Master</h1>
          <p className="text-neutral-500 mt-1">Manage self-help tutorials and educational videos.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#00a3e0] hover:bg-[#0082b3] text-white px-5 py-2.5 rounded-xl flex items-center transition-all shadow-[0_4px_15px_rgba(0,163,224,0.3)] hover:shadow-[0_6px_20px_rgba(0,163,224,0.4)] hover:-translate-y-0.5 font-medium"
        >
          <Plus size={18} className="mr-2" />
          Add Tutorial
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/30">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search tutorials..." 
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
            Total: <span className="text-navy font-bold">{filteredTutorials.length}</span>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-neutral-50/50 text-neutral-500 text-xs uppercase tracking-wider font-semibold border-b border-neutral-100">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100/60">
              {paginatedTutorials.map(t => (
                <tr key={t.id} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {t.thumbnail && (
                        <img src={t.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-neutral-200" />
                      )}
                      <div className="font-semibold text-navy">{t.title}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 shadow-sm border border-neutral-200/50">
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-neutral-600 font-medium">{t.uploadDate || '-'}</td>
                  <td className="p-4 text-sm text-neutral-600">{t.duration || '-'}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 transition-opacity">
                      <button onClick={() => handleOpenModal(t, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-emerald-100" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(t, false)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-transparent hover:border-blue-100" title="Edit">
                        <SquarePen size={16} />
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
          {filteredTutorials.length === 0 && (
            <div className="p-8 text-center text-neutral-500">No tutorials found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/30 flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Showing <span className="font-medium text-navy">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-navy">{Math.min(currentPage * itemsPerPage, filteredTutorials.length)}</span> of <span className="font-medium text-navy">{filteredTutorials.length}</span> results
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
              <h2 className="text-[22px] font-bold text-black">{isViewMode ? 'Tutorial Details' : editingId ? 'Edit Tutorial' : 'Add Tutorial'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-black text-2xl font-light leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden min-h-0">
              
              {/* Body */}
              <div className="px-8 pb-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
                {isViewMode ? (
                  <div className="pt-2">
                    {formData.thumbnail && (
                      <div className="mb-5 overflow-hidden -mx-8">
                        <img src={formData.thumbnail} alt="Tutorial preview" className="w-full h-48 object-contain" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Title:</strong> {formData.title || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Category:</strong> {formData.category || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Upload Date:</strong> {formData.uploadDate || '-'}</div>
                      <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Duration:</strong> {formData.duration || '-'}</div>
                      {formData.videoUrl && (
                        <div className="text-[15px] text-neutral-800"><strong className="text-black font-bold">Video URL:</strong> {formData.videoUrl}</div>
                      )}
                      <div>
                        <strong className="text-black font-bold block mb-1">Description:</strong>
                        <div className="text-[15px] text-neutral-800 whitespace-pre-wrap leading-relaxed">{formData.description || '-'}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Thumbnail Image</label>
                      <label className={`group relative flex flex-col items-center justify-center w-full overflow-hidden rounded-xl border-2 border-dashed transition-all cursor-pointer ${formData.thumbnail ? 'border-[#00a3e0]/40 bg-[#00a3e0]/5' : 'border-neutral-200 bg-neutral-50/50 hover:border-[#00a3e0]/50 hover:bg-[#00a3e0]/5'}`}>
                        <input type="file" accept="image/*" className="hidden" onChange={e => setFormData({...formData, thumbnail: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null})} />
                        {formData.thumbnail ? (
                          <>
                            <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full max-h-64 object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-neutral-700 text-sm font-semibold">
                                <Upload size={16} /> Change image
                              </span>
                            </div>
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormData({...formData, thumbnail: null}); }} className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red-600 hover:bg-red-50 text-xs font-medium transition-colors shadow-sm border border-neutral-200">
                              <Trash2 size={13} /> Remove
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-neutral-200">
                              <Upload size={20} className="text-[#00a3e0]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-700">Click to upload thumbnail</p>
                              <p className="text-xs text-neutral-400 mt-1">JPG or PNG · Recommended 800 x 400</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Video File <span className="text-red-500">*</span></label>
                      <label className={`group relative flex flex-col items-center justify-center w-full overflow-hidden rounded-xl border-2 border-dashed transition-all cursor-pointer ${formData.video ? 'border-[#00a3e0]/40 bg-[#00a3e0]/5' : 'border-neutral-200 bg-neutral-50/50 hover:border-[#00a3e0]/50 hover:bg-[#00a3e0]/5'}`}>
                        <input type="file" accept="video/*" className="hidden" onChange={e => handleVideoUpload(e.target.files[0] ? e.target.files[0] : null)} />
                        {formData.video ? (
                          <>
                            <video src={formData.video} className="w-full max-h-64 object-contain bg-black/5" controls />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/90 text-neutral-700 text-sm font-semibold">
                                <Upload size={16} /> Change video
                              </span>
                            </div>
                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFormData({...formData, video: null, videoUrl: '', duration: '', uploadDate: ''}); }} className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-red-600 hover:bg-red-50 text-xs font-medium transition-colors shadow-sm border border-neutral-200">
                              <Trash2 size={13} /> Remove
                            </button>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-neutral-200">
                              <Upload size={20} className="text-[#00a3e0]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-700">Click to upload video</p>
                              <p className="text-xs text-neutral-400 mt-1">MP4 · Duration & date auto-filled</p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Title <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="Tutorial title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Category <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="e.g., Overview, Self-Care" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Upload Date <span className="text-red-500">*</span></label>
                      <input required type="date" value={formData.uploadDate} onChange={e => setFormData({...formData, uploadDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-white placeholder:text-gray-400 cursor-pointer" />
                    </div>
                    
                    <div>
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Duration <span className="text-red-500">*</span></label>
                      <input required type="text" placeholder="e.g., 15:30" value={formData.duration} readOnly disabled onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-neutral-100 text-neutral-500 placeholder:text-gray-400 cursor-not-allowed" />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Video URL</label>
                      <div className="relative">
                        <Link2 size={16} className="absolute left-3.5 top-3 text-neutral-400" />
                        <input type="text" placeholder="https://www.youtube.com/watch?v=..." value={formData.videoUrl} readOnly onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm transition-all shadow-sm bg-neutral-100 text-neutral-500 placeholder:text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-[14px] font-medium text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                      <textarea rows="4" required placeholder="Tutorial description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#00a3e0]/20 focus:border-[#00a3e0] text-sm resize-none transition-all shadow-sm bg-white placeholder:text-gray-400"></textarea>
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

export default AdminTutorials;
