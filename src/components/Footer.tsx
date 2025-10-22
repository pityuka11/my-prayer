'use client';

import {useTranslations} from 'next-intl';
import { useState } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      if (res.ok) {
        setMessage(t('newsletterSuccess', { default: 'Thank you for subscribing!' }));
        setEmail('');
      } else {
        const errorData = await res.json() as { error?: string };
        setMessage(errorData.error || t('newsletterError', { default: 'Failed to subscribe' }));
      }
    } catch (error) {
      setMessage(t('newsletterError', { default: 'Failed to subscribe' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white border-t border-[#8ECDCF]/20 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="mb-8">
          <h3 className="text-xl font-playfair text-[#3A504B] mb-4 text-center">
            {t('newsletterTitle', { default: 'Stay Connected' })}
          </h3>
          <p className="text-[#3A504B] text-center mb-6 opacity-70">
            {t('newsletterDescription', { default: 'Subscribe to our newsletter for prayer updates and spiritual guidance.' })}
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder', { default: 'Enter your email address' })}
                className="flex-1 px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="px-6 py-3 bg-[#8ECDCF] text-white rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('subscribing', { default: 'Subscribing...' }) : t('subscribe', { default: 'Subscribe' })}
              </button>
            </div>
            {message && (
              <p className={`text-sm mt-2 text-center ${
                message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-center">
          <p className="font-open-sans text-[#3A504B]">
            <span className="font-semibold">{t('contact')}:</span> {t('email')}
          </p>
        </div>
      </div>
    </footer>
  );
}
