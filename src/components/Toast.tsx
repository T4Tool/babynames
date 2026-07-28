import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  title: string;
  description?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, title, description, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0E1117] border border-[#5B8CFF]/40 shadow-2xl backdrop-blur-xl text-white max-w-md w-auto"
        >
          <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-sm font-semibold text-white font-heading">{title}</h4>
            {description && (
              <p className="text-xs text-[#A1A1AA] font-body line-clamp-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#A1A1AA] hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
