'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface LoginGateProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export default function LoginGate({ children, fallbackMessage }: LoginGateProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('auth');

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const checkAuthStatus = () => {
      try {
        const userData = localStorage.getItem('user');
        const isAuthenticated = userData !== null && userData !== 'null';
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#3A504B] opacity-70">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="w-16 h-16 bg-[#8ECDCF] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
              {t('loginRequired', { default: 'Login Required' })}
            </h2>
            <p className="text-[#3A504B] font-open-sans text-lg leading-relaxed mb-6">
              {fallbackMessage || t('loginRequiredMessage', { default: 'Please log in to access discussions and connect with our community.' })}
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-[#8ECDCF] text-white font-semibold rounded-lg hover:bg-[#7BB8BA] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {t('loginButton', { default: 'Login' })}
            </Link>
            
            <div className="text-sm text-[#3A504B] opacity-70">
              {t('noAccount', { default: "Don't have an account?" })}{' '}
              <Link 
                href="/register" 
                className="text-[#8ECDCF] hover:text-[#7BB8BA] transition-colors font-semibold"
              >
                {t('registerLink', { default: 'Register here' })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
