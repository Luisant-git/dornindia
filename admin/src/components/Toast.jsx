import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    barColor: 'bg-emerald-500',
    title: 'Success'
  },
  error: {
    icon: AlertTriangle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    barColor: 'bg-red-500',
    title: 'Error'
  },
  info: {
    icon: Info,
    iconBg: 'bg-[#00a3e0]/10',
    iconColor: 'text-[#00a3e0]',
    barColor: 'bg-[#00a3e0]',
    title: 'Info'
  }
};

const ToastCard = ({ toast, onClose }) => {
  const { icon: Icon, iconBg, iconColor, barColor, title } = VARIANTS[toast.type] || VARIANTS.info;
  const barRef = useRef(null);

  useEffect(() => {
    const duration = toast.duration;
    if (duration <= 0) return;
    const el = barRef.current;
    if (el) {
      el.style.transition = 'none';
      el.style.width = '100%';
      el.getBoundingClientRect();
      el.style.transition = `width ${duration}ms linear`;
      el.style.width = '0%';
    }
  }, []);

  return (
    <div className="group relative bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200/80 overflow-hidden toast-in">
      <div className="flex items-start gap-3 px-4 py-3.5">
        <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-navy leading-none">{toast.title || title}</p>
          {toast.message && <p className="text-[13px] text-neutral-500 mt-1.5 leading-snug break-words">{toast.message}</p>}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      {toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-100">
          <div ref={barRef} className={`h-full ${barColor}`} />
        </div>
      )}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success', title, duration = 3500) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type, title, duration }]);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [removeToast]
  );

  const toast = useCallback(
    (message, options = {}) => {
      const { type = 'success', title, duration = 3500 } = options;
      return showToast(message, type, title, duration);
    },
    [showToast]
  );

  toast.success = useCallback(
    (message, title, duration) => showToast(message, 'success', title, duration),
    [showToast]
  );
  toast.error = useCallback(
    (message, title, duration) => showToast(message, 'error', title, duration),
    [showToast]
  );
  toast.info = useCallback(
    (message, title, duration) => showToast(message, 'info', title, duration),
    [showToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-5 right-5 z-[10000] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard toast={t} onClose={() => removeToast(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;