'use client'
import { useEffect } from "react";
import { motion } from "motion/react";

export default function Toast({
  message,
  show,
  onClose,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        id="toast-success"
        className="fixed top-4 right-4 flex items-center w-full max-w-sm p-4 text-accent bg-neutral-950 rounded-base shadow-xs border border-primary z-50"
        role="alert"
    >
        <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 rounded">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
              </svg>
              <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
              type="button"
              onClick={onClose}
              className="ms-auto flex items-center justify-center text-body bg-transparent box-border border border-transparent focus:ring-4 font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
              aria-label="Close"
        >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
        </button>
    </motion.div>
  );
}