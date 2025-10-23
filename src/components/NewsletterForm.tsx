'use client';

import {useTranslations} from 'next-intl';
import { useState } from 'react';

export default function NewsletterForm() {
  const t = useTranslations('community');
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
    } catch {
      setMessage(t('newsletterError', { default: 'Failed to subscribe' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto mt-8">
      <h3 className="text-2xl font-playfair text-[#3A504B] mb-4 text-center">
        {t('newsletterTitle', {default: 'Stay Connected'})}
      </h3>
      <p className="text-[#3A504B] font-open-sans mb-6 text-center">
        {t('newsletterDescription', { default: 'Get updates about community events, prayer circles, and spiritual resources.' })}
      </p>
      
      <form onSubmit={handleNewsletterSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletterPlaceholder', { default: 'Enter your email address' })}
          className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg font-open-sans text-[#3A504B] focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-open-sans font-semibold hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('subscribing', { default: 'Subscribing...' }) : t('newsletterButton', { default: 'Subscribe' })}
        </button>
        {message && (
          <p className={`text-sm text-center ${
            message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
