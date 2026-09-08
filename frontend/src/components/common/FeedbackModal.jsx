import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, StarHalf, Upload, X, Loader2 } from 'lucide-react';
import { homeApi } from '../../api/homeApi';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    rating: 5,
    feedback: '',
    imageFile: null,
    imagePreview: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let imageUrl = null;
      if (formData.imageFile) {
        imageUrl = await homeApi.uploadImage(formData.imageFile);
      }
      
      await homeApi.createFeedback({
        name: formData.name,
        profession: formData.profession,
        rating: Number(formData.rating),
        feedback: formData.feedback,
        image: imageUrl,
        isActive: false // Requires admin approval
      });
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSuccess(false);
    setError('');
    setFormData({
      name: '',
      profession: '',
      rating: 5,
      feedback: '',
      imageFile: null,
      imagePreview: null
    });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 sm:p-6 z-[9999] animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-white shrink-0">
          <h2 className="text-xl font-bold text-navy">Submit Feedback</h2>
          <button type="button" onClick={closeModal} className="text-neutral-400 hover:text-navy transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto custom-scrollbar flex-1 p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Thank You!</h3>
              <p className="text-neutral-600 mb-6">Your feedback has been submitted successfully. It will appear on our website once approved by an admin.</p>
              <button onClick={closeModal} className="px-6 py-2.5 bg-dorn hover:bg-dorn-dark text-white rounded-lg transition-colors font-medium">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="flex flex-col items-center justify-center mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2 w-full text-left">Profile Photo (Optional)</label>
                <input type="file" id="student-profile-input" accept="image/*" className="hidden" onChange={e => { const file = e.target.files[0]; setFormData({...formData, imageFile: file || null, imagePreview: file ? URL.createObjectURL(file) : null}); }} />
                
                {formData.imagePreview ? (
                  <div className="relative group cursor-pointer">
                    <img src={formData.imagePreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border-2 border-neutral-200" />
                    <label htmlFor="student-profile-input" className="absolute inset-0 bg-black/50 text-white rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs">
                      <Upload size={16} className="mb-1" /> Change
                    </label>
                  </div>
                ) : (
                  <label htmlFor="student-profile-input" className="w-24 h-24 rounded-lg bg-neutral-100 border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-500 hover:text-dorn hover:border-dorn hover:bg-dorn/5 transition-all cursor-pointer">
                    <Upload size={20} className="mb-1" />
                    <span className="text-[10px] uppercase font-semibold">Upload</span>
                  </label>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-dorn/20 focus:border-dorn text-sm transition-all bg-white" placeholder="Your name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Profession (Optional)</label>
                <input type="text" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-dorn/20 focus:border-dorn text-sm transition-all bg-white" placeholder="e.g. Student, Physiotherapist" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-1">
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
                        className="p-1 transition-all hover:scale-110"
                      >
                        <div className="relative">
                          {isHalf ? (
                            <Star size={28} className="text-neutral-200" />
                          ) : (
                            <Star size={28} className={isFull ? "text-yellow-400 fill-current" : "text-neutral-300"} />
                          )}
                          {isHalf && (
                            <StarHalf size={28} className="absolute top-0 left-0 text-yellow-400 fill-current" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm text-neutral-500 font-medium">{formData.rating} / 5</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Your Feedback <span className="text-red-500">*</span></label>
                <textarea rows="4" required value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-dorn/20 focus:border-dorn text-sm resize-none transition-all bg-white" placeholder="Tell us about your experience..."></textarea>
              </div>
              
              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full py-3 bg-dorn hover:bg-dorn-dark text-white rounded-lg transition-colors font-medium shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin mr-2" /> Submitting...</>
                  ) : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeedbackModal;
