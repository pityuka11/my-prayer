'use client';

import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import UserButton from './auth/UserButton';
import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#E8A96F] rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">✞</span>
            </div>
            <h1 className="text-xl md:text-2xl font-playfair text-[#3A504B] font-bold">
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
            <Link href={`${base}/affiliate`} className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <UserButton />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#3A504B] hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link 
                href={`${base}`} 
                className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                href={`${base}/prayer-requests`} 
                className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('prayerRequests')}
              </Link>
              <Link 
                href={`${base}/biblical-messages`} 
                className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('biblicalMessages')}
              </Link>
              <Link 
                href={`${base}/community`} 
                className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('community')}
              </Link>
              <Link 
                href={`${base}/affiliate`} 
                className="text-[#3A504B] font-open-sans hover:text-[#8ECDCF] transition-colors py-2 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
            </nav>
            
            {/* Mobile Language Switcher */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <div className="px-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
