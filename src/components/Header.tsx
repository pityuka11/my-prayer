'use client';

import LanguageSwitcher from './LanguageSwitcher';
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation');

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
          <a href="#" className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('home')}
          </a>
          <a href="#" className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('prayerRequests')}
          </a>
          <a href="#" className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('biblicalMessages')}
          </a>
          <a href="#" className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
            {t('community')}
          </a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
