'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type PrayerGoal = {
  id: number;
  title: string;
  description: string;
  category: string;
};

type PrayerRequestPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const PRAYER_CATEGORIES = [
  'Health & Healing',
  'Family & Relationships', 
  'Career & Work',
  'Spiritual Growth',
  'Peace & Guidance',
  'Community & World',
  'Financial',
  'Education',
  'Other'
];

export default function PrayerRequestPopup({ isOpen, onClose, onSuccess }: PrayerRequestPopupProps) {
  const [content, setContent] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const t = useTranslations('prayerRequests');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch('/api/prayer-goals');
      } catch (error) {
        console.error('Failed to fetch prayer goals:', error);
      }
    };

    if (isOpen) {
      fetchGoals();
      
      // Initialize AdSense ads
      try {
        if (typeof window !== 'undefined') {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        }
      } catch (error) {
        console.log('AdSense not available:', error);
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !selectedCategory) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          content: content.trim(), 
          category: selectedCategory,
          displayName: displayName.trim() || undefined
        })
      });

      if (res.ok) {
        setContent('');
        setDisplayName('');
        setSelectedCategory('');
        onSuccess();
        onClose();
      } else {
        const errorData = await res.json() as { error?: string };
        alert('Failed to submit prayer request: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error submitting prayer request: ' + error);
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
        
        <div className="overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit} className="p-6">

          {/* Optional Display Name */}
          <div className="mb-6">
            <label htmlFor="display-name" className="block text-sm font-medium text-[#3A504B] mb-2">
              {t('displayName', { default: 'Display name (optional)' })}
            </label>
            <input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] bg-white"
              placeholder={t('displayNamePlaceholder', { default: 'How should we show your name?' })}
              maxLength={60}
            />
          </div>

            {/* Category Dropdown */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-[#3A504B] mb-2">
                {t('category', { default: 'Category' })} *
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] bg-white"
                required
              >
                <option value="">{t('selectCategory', { default: 'Select a category...' })}</option>
                {PRAYER_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Prayer Request Content */}
            <div className="mb-6">
              <label htmlFor="prayer-content" className="block text-sm font-medium text-[#3A504B] mb-2">
                {t('yourRequest', { default: 'Your Prayer Request' })} *
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
                disabled={isSubmitting || !content.trim() || !selectedCategory}
                className="px-6 py-2 bg-[#8ECDCF] text-white rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>✞</span>
                <span>{isSubmitting ? t('submitting', { default: 'Submitting...' }) : t('submitButton', { default: 'Submit Prayer' })}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
