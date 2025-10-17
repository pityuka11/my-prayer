import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useTranslations} from 'next-intl';

type BiblicalMessage = {
  quote: string;
  source: string;
};

export default function BiblicalMessagesPage() {
  const t = useTranslations('biblicalMessages');

  // Get all available messages
  const allMessages: BiblicalMessage[] = [
    { quote: t('quote'), source: t('source') },
    { quote: t('quote2'), source: t('source2') },
    { quote: t('quote3'), source: t('source3') },
    { quote: t('quote4'), source: t('source4') },
    { quote: t('quote5'), source: t('source5') },
  ].filter(msg => msg.quote && msg.source); // Filter out empty translations

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-playfair text-[#3A504B] mb-8">
          {t('title')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allMessages.map((message, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-4 right-4 text-[#8ECDCF] text-4xl opacity-20">✞</div>
              <div className="absolute bottom-4 left-4 text-[#E8A96F] text-3xl opacity-20">🙏</div>
              
              <blockquote className="text-xl font-open-sans text-[#3A504B] leading-relaxed mb-4 relative z-10">
                &quot;{message.quote}&quot;
              </blockquote>
              <cite className="text-sm font-open-sans text-[#3A504B] italic block mb-6 relative z-10">
                — {message.source}
              </cite>
              
              {/* Reflection text for each message */}
              <p className="text-[#3A504B] font-open-sans relative z-10">
                {t(`reflection${index + 1}`, {
                  default: index === 0 ? 'These words remind us of God\'s love and invite us to trust Him daily.' :
                           index === 1 ? 'This verse encourages us to rely on God\'s wisdom rather than our own understanding.' :
                           index === 2 ? 'A powerful reminder that God works all things together for our good.' :
                           index === 3 ? 'Through Christ, we have the strength to overcome any challenge.' :
                           'We can find peace by giving our worries to God, who cares for us deeply.'
                })}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional inspirational section */}
        <div className="mt-12 bg-gradient-to-br from-[#8ECDCF] to-[#7BB8BA] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-playfair text-white mb-4">
            {t('inspirationTitle', { default: 'Daily Inspiration' })}
          </h2>
          <p className="text-white font-open-sans text-lg leading-relaxed">
            {t('inspirationText', { 
              default: 'Let these timeless words guide your daily walk with God. Each verse carries the power to transform your perspective and strengthen your faith.' 
            })}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
