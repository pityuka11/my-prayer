'use client';

import {useTranslations} from 'next-intl';
import {useState, useEffect} from 'react';

type BiblicalMessage = {
  quote: string;
  source: string;
};

export default function BiblicalMessages() {
  const t = useTranslations('biblicalMessages');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState<BiblicalMessage[]>([]);

  useEffect(() => {
    // Load all available messages
    const allMessages: BiblicalMessage[] = [
      { quote: t('quote'), source: t('source') },
      { quote: t('quote2'), source: t('source2') },
      { quote: t('quote3'), source: t('source3') },
      { quote: t('quote4'), source: t('source4') },
      { quote: t('quote5'), source: t('source5') },
    ].filter(msg => msg.quote && msg.source); // Filter out empty translations

    setMessages(allMessages);

    // Auto-rotate messages every 8 seconds
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % allMessages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [t]);

  if (messages.length === 0) return null;

  const currentMessage = messages[currentMessageIndex];

  return (
    <section className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#3A504B] mb-4 md:mb-6">
        {t('title')}
      </h2>
      
      <div className="bg-[#F8F7F2] rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 text-[#8ECDCF] text-2xl md:text-4xl opacity-20">✞</div>
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-[#E8A96F] text-xl md:text-3xl opacity-20">🙏</div>
        
        <blockquote className="text-base md:text-lg font-open-sans text-[#3A504B] leading-relaxed mb-3 md:mb-4 relative z-10 px-2">
          &quot;{currentMessage.quote}&quot;
        </blockquote>
        <cite className="text-xs md:text-sm font-open-sans text-[#3A504B] italic relative z-10">
          — {currentMessage.source}
        </cite>
        
        {/* Message indicators */}
        {messages.length > 1 && (
          <div className="flex justify-center space-x-2 mt-3 md:mt-4 relative z-10">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessageIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === currentMessageIndex 
                    ? 'bg-[#8ECDCF]' 
                    : 'bg-gray-300 hover:bg-[#8ECDCF]'
                }`}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
