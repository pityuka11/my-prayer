'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

interface TranslationButtonProps {
  text: string;
  className?: string;
}

export default function TranslationButton({ text, className = '' }: TranslationButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const locale = useLocale();

  // Language code mapping
  const languageMap: { [key: string]: string } = {
    'en': 'en',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'pt': 'pt',
    'ru': 'ru',
    'ja': 'ja',
    'ko': 'ko',
    'zh': 'zh',
    'ro': 'ro',
    'hu': 'hu',
  };

  const targetLanguage = languageMap[locale] || 'en';

  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage,
        }),
      });

      if (response.ok) {
        const data = await response.json() as {
          translatedText: string;
          sourceLanguage?: string;
          targetLanguage: string;
        };
        setTranslatedText(data.translatedText);
        setShowTranslation(true);
      } else {
        console.error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Don't show translation button if text is already in the target language
  if (targetLanguage === 'en' && /^[a-zA-Z\s.,!?;:'"()-]+$/.test(text)) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={handleTranslate}
        disabled={isTranslating}
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs bg-[#8ECDCF] text-white rounded hover:bg-[#7BB8BA] transition-colors disabled:opacity-50 ${className}`}
        title={showTranslation ? 'Show original text' : 'Translate to current language'}
      >
        {isTranslating ? (
          <>
            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Translating...
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {showTranslation ? 'Original' : 'Translate'}
          </>
        )}
      </button>
      
      {showTranslation && translatedText && (
        <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-[#8ECDCF] rounded-lg shadow-lg z-10 max-w-sm">
          <div className="text-sm text-[#3A504B]">
            <div className="font-semibold mb-1 text-xs text-[#8ECDCF]">Translation:</div>
            <div>{translatedText}</div>
          </div>
        </div>
      )}
    </div>
  );
}
