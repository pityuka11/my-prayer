'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrayerRequestsCardCarousel from '@/components/PrayerRequestsCardCarousel';
import {useTranslations} from 'next-intl';

export default function PrayerRequestsPage() {
  const t = useTranslations('prayerRequests');

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-playfair text-[#3A504B] mb-6">
          {t('title')}
        </h1>
        <p className="text-[#3A504B] font-open-sans mb-8 max-w-3xl">
          {t.rich?.('intro', {
            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>
          }) ?? ''}
        </p>

        {/* Use the same card carousel component as the first page */}
        <PrayerRequestsCardCarousel />
      </main>
      <Footer />
    </div>
  );
}
