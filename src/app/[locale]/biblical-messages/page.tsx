import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useTranslations} from 'next-intl';

export default function BiblicalMessagesPage() {
  const t = useTranslations('biblicalMessages');

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-playfair text-[#3A504B] mb-6">
          {t('title')}
        </h1>
        <div className="bg-white rounded-xl p-8 shadow-sm max-w-3xl">
          <blockquote className="text-xl font-open-sans text-[#3A504B] leading-relaxed mb-4">
            &quot;{t('quote')}&quot;
          </blockquote>
          <cite className="text-sm font-open-sans text-[#3A504B] italic block mb-6">— {t('source')}</cite>
          <p className="text-[#3A504B] font-open-sans">
            {t('reflection', {default: 'These words remind us of God\'s love and invite us to trust Him daily.'})}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
