'use client';

import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-white border-t border-[#8ECDCF]/20 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="font-open-sans text-[#3A504B]">
            <span className="font-semibold">{t('contact')}:</span> {t('email')}
          </p>
        </div>
      </div>
    </footer>
  );
}
