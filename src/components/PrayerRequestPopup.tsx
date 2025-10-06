'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type PrayerRequestPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PrayerRequestPopup({ isOpen, onClose, onSuccess }: PrayerRequestPopupProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('prayerRequests');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      // Get user from localStorage
      const userStr = localStorage.getItem('mp:user');
      if (!userStr) {
        alert('Please log in to submit a prayer request');
        return;
      }
      
      const user = JSON.parse(userStr);
      const userId = user.id || 1; // Fallback for demo

      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: content.trim(), userId })
      });

      if (res.ok) {
        setContent('');
        onSuccess();
        onClose();
      } else {
        alert('Failed to submit prayer request');
      }
    } catch (error) {
      alert('Error submitting prayer request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-playfair text-[#3A504B]">
              {t('submitRequest', { default: 'Submit Prayer Request' })}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="prayer-content" className="block text-sm font-medium text-[#3A504B] mb-2">
              {t('yourRequest', { default: 'Your Prayer Request' })}
            </label>
            <textarea
              id="prayer-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] resize-none"
              placeholder={t('requestPlaceholder', { default: 'Share your prayer request...' })}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-[#3A504B] rounded-lg hover:bg-gray-400 transition-colors"
            >
              {t('cancel', { default: 'Cancel' })}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-6 py-2 bg-[#8ECDCF] text-white rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <span>✞</span>
              <span>{isSubmitting ? t('submitting', { default: 'Submitting...' }) : t('submitButton', { default: 'Submit Prayer' })}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
