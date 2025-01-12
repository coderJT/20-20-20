import React, { useEffect, useRef } from 'react';
import beepSound from "/beep.mp3";

interface AlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ isOpen, message, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(beepSound);
  }, []);

  useEffect(() => {
    if (isOpen) {
      audioRef.current?.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <p className="text-gray-800 dark:text-white text-lg mb-6 text-center">
          {message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            autoFocus
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert; 