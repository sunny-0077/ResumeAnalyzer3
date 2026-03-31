'use client';

import { useState, useEffect } from 'react';

type ToastData = {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  msg: string;
};

export default function Toasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleShowToast = (event: any) => {
      const { type, msg } = event.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, msg }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  return (
    <div className="toast-container" id="toasts">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon"><span className="mat">{icons[toast.type]}</span></div>
          <div className="toast-body">
            <p className="toast-type">{toast.type.toUpperCase()}</p>
            <p className="toast-msg">{toast.msg}</p>
          </div>
          <button className="toast-close" onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
            <span className="mat">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
