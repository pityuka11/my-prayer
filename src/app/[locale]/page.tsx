import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PrayerRequests from '@/components/PrayerRequests';
import PrayerRequestsCardCarousel from '@/components/PrayerRequestsCardCarousel';
import BiblicalMessages from '@/components/BiblicalMessages';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import AffiliateCarousel from '@/components/affiliate/AffiliateCarousel';
import Gtag from '@/components/gtag';

export default function Home() {
  return (
      <div className="min-h-screen bg-[#F8F7F2]">
        <Gtag />
        <Header />
        <Hero />
        
        {/* Prayer Requests Carousel */}
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <PrayerRequestsCardCarousel />
        </div>
        
        {/* Main Content Grid */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6 md:space-y-8">
              <PrayerRequests />
            </div>
            <div className="space-y-6 md:space-y-8">
              <BiblicalMessages />
              
              {/* AdSense Card */}
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
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
            </div>
          </div>
        </main>
        
        {/* Affiliate Products */}
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <AffiliateCarousel />
        </div>
        
        {/* FAQ Section */}
        <FAQSection />
        
        <Footer />
      </div>
  );
}