'use client';

import LanguageSwitcher from './LanguageSwitcher';
import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';

export default function Header() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#E8A96F] rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">✞</span>
          </div>
          <h1 className="text-2xl font-playfair text-[#3A504B] font-bold">
            my prayer
          </h1>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href={`${base}`} className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('home')}
          </Link>
          <Link href={`${base}/prayer-requests`} className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('prayerRequests')}
          </Link>
          <Link href={`${base}/biblical-messages`} className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('biblicalMessages')}
          </Link>
          <Link href={`${base}/community`} className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('community')}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
