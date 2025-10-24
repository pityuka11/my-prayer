'use client';

import {useTranslations} from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
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
    <footer className="bg-white border-t border-[#8ECDCF]/20 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-playfair text-[#3A504B] mb-3 md:mb-4 text-center">
            {t('newsletterTitle', { default: 'Stay Connected' })}
          </h3>
          <p className="text-[#3A504B] text-center mb-4 md:mb-6 opacity-70 text-sm md:text-base px-4">
            {t('newsletterDescription', { default: 'Subscribe to our newsletter for prayer updates and spiritual guidance.' })}
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder', { default: 'Enter your email address' })}
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="px-4 md:px-6 py-2 md:py-3 bg-[#8ECDCF] text-white rounded-lg hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base whitespace-nowrap"
              >
                {isSubmitting ? t('subscribing', { default: 'Subscribing...' }) : t('subscribe', { default: 'Subscribe' })}
              </button>
            </div>
            {message && (
              <p className={`text-xs md:text-sm mt-2 text-center ${
                message.includes('Thank you') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-4 md:mb-6">
          <p className="font-open-sans text-[#3A504B] mb-3 md:mb-4 text-sm md:text-base">
            <span className="font-semibold">{t('contact')}:</span> {t('email')}
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm">
            <Link 
              href={`/${locale}/about`} 
              className="text-[#3A504B] hover:text-[#8ECDCF] transition-colors"
            >
              {t('about', { default: 'About Us' })}
            </Link>
            <Link 
              href={`/${locale}/privacy`} 
              className="text-[#3A504B] hover:text-[#8ECDCF] transition-colors"
            >
              {t('privacy', { default: 'Privacy Policy' })}
            </Link>
            <Link 
              href={`/${locale}/terms`} 
              className="text-[#3A504B] hover:text-[#8ECDCF] transition-colors"
            >
              {t('terms', { default: 'Terms of Service' })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
