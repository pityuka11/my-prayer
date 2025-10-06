import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PrayerRequests from '@/components/PrayerRequests';
import BiblicalMessages from '@/components/BiblicalMessages';
import Community from '@/components/Community';
import Footer from '@/components/Footer';
import AffiliateCarousel from '@/components/affiliate/AffiliateCarousel';
import DonateCard from '@/components/DonateCard';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('community');

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PrayerRequests />
            <BiblicalMessages />
          </div>
          <div>
            <Community />
            <div className="space-y-8 mt-8">
              <DonateCard title={t('donateTitle', { default: 'Donate to support our work' })} />
            </div>
          </div>
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <AffiliateCarousel />
      </div>
      <Footer />
    </div>
  );
}