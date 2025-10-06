'use client';

import {useTranslations} from 'next-intl';

export default function BiblicalMessages() {
  const t = useTranslations('biblicalMessages');

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
        {t('title')}
      </h2>
      
      <div className="bg-[#F8F7F2] rounded-xl p-6 shadow-sm">
        <blockquote className="text-lg font-open-sans text-[#3A504B] leading-relaxed mb-4">
          "{t('quote')}"
        </blockquote>
        <cite className="text-sm font-open-sans text-[#3A504B] italic">
          — {t('source')}
        </cite>
      </div>
    </section>
  );
}
