import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PrayerRequests from '@/components/PrayerRequests';
import PrayerRequestsCardCarousel from '@/components/PrayerRequestsCardCarousel';
import BiblicalMessages from '@/components/BiblicalMessages';
import Community from '@/components/Community';
import Footer from '@/components/Footer';
import AffiliateCarousel from '@/components/affiliate/AffiliateCarousel';
import DonateCard from '@/components/DonateCard';
import { useTranslations } from 'next-intl';
import Gtag from '@/components/gtag';

export default function Home() {
  const t = useTranslations('community');

  return (
      <div className="min-h-screen bg-[#F8F7F2]">
        <Gtag />
        <Header />
        <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PrayerRequestsCardCarousel />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PrayerRequests />
            <BiblicalMessages />
          </div>
          <div>
            {/* <Community /> */}
            <div className="space-y-8 mt-8">
              {/* AdSense Card Above Donate */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-center mb-2 text-xs text-gray-500">Advertisement</div>
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-3327510980686562"
                  data-ad-slot="1234567890"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
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