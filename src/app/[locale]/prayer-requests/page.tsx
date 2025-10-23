import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrayerRequests from '@/components/PrayerRequests';
import PrayerRequestsCardCarousel from '@/components/PrayerRequestsCardCarousel';
import StructuredData from '@/components/StructuredData';
import {useTranslations} from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prayer Requests - Submit Your Prayer Needs | My Prayer',
  description: 'Share your prayer requests with our community. Submit your prayer needs and join others in prayer. Find comfort, support, and spiritual guidance through our prayer community.',
  keywords: 'prayer requests, prayer community, spiritual support, prayer needs, Christian prayers, prayer sharing, faith community',
  openGraph: {
    title: 'Prayer Requests - Submit Your Prayer Needs | My Prayer',
    description: 'Share your prayer requests with our community. Submit your prayer needs and join others in prayer.',
    type: 'website',
    url: 'https://myprayer.online/prayer-requests',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'Prayer Requests Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayer Requests - Submit Your Prayer Needs | My Prayer',
    description: 'Share your prayer requests with our community. Submit your prayer needs and join others in prayer.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/prayer-requests'
  }
};

export default function PrayerRequestsPage() {
  const t = useTranslations('prayerRequests');

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Prayer Requests - Submit Your Prayer Needs | My Prayer",
    "description": "Share your prayer requests with our community. Submit your prayer needs and join others in prayer. Find comfort, support, and spiritual guidance through our prayer community.",
    "url": "https://myprayer.online/prayer-requests",
    "mainEntity": {
      "@type": "Organization",
      "name": "My Prayer",
      "url": "https://myprayer.online",
      "description": "A supportive prayer community where faith, hope, and prayer come together",
      "sameAs": [
        "https://myprayer.online"
      ]
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://myprayer.online"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Prayer Requests",
          "item": "https://myprayer.online/prayer-requests"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      {/* Structured Data */}
      <StructuredData data={structuredData} />
      
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* SEO-optimized header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-4">
            {t('title')}
          </h1>
          <p className="text-[#3A504B] font-open-sans text-lg mb-6 max-w-3xl leading-relaxed">
            {t('pageDescription', { 
              default: 'Share your prayer requests with our supportive community. Submit your prayer needs and join others in prayer. Find comfort, support, and spiritual guidance through our prayer community.' 
            })}
          </p>
          
          {/* Additional SEO content */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
              {t('howItWorks', { default: 'How It Works' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8ECDCF] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">✞</span>
                </div>
                <h3 className="font-open-sans text-[#3A504B] font-semibold mb-2">
                  {t('step1', { default: 'Submit Your Request' })}
                </h3>
                <p className="text-[#3A504B] text-sm opacity-70">
                  {t('step1Desc', { default: 'Share your prayer needs with our community' })}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E8A96F] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">🙏</span>
                </div>
                <h3 className="font-open-sans text-[#3A504B] font-semibold mb-2">
                  {t('step2', { default: 'Community Prays' })}
                </h3>
                <p className="text-[#3A504B] text-sm opacity-70">
                  {t('step2Desc', { default: 'Our community will pray for your needs' })}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#8ECDCF] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl">❤️</span>
                </div>
                <h3 className="font-open-sans text-[#3A504B] font-semibold mb-2">
                  {t('step3', { default: 'Find Support' })}
                </h3>
                <p className="text-[#3A504B] text-sm opacity-70">
                  {t('step3Desc', { default: 'Experience comfort and spiritual support' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Request Submission Card */}
        <div className="mb-8">
          <PrayerRequests />
        </div>

        {/* Community Prayer Requests Carousel */}
        <PrayerRequestsCardCarousel />
        
        {/* Additional SEO content */}
        <div className="mt-12 bg-gradient-to-br from-[#8ECDCF] to-[#7BB8BA] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-playfair text-white mb-4">
            {t('joinCommunity', { default: 'Join Our Prayer Community' })}
          </h2>
          <p className="text-white font-open-sans text-lg leading-relaxed mb-6">
            {t('communityDesc', { 
              default: 'Be part of a supportive community where faith, hope, and prayer come together. Share your journey and support others in theirs.' 
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {t('feature1', { default: 'Anonymous & Safe' })}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {t('feature2', { default: '24/7 Support' })}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              {t('feature3', { default: 'Global Community' })}
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
