import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionChatRoom from '@/components/DiscussionChatRoom';
import LoginGate from '@/components/LoginGate';
import StructuredData from '@/components/StructuredData';
import {useTranslations} from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussions - Join Our Prayer Community | My Prayer',
  description: 'Join meaningful discussions about faith, prayer, and spiritual growth. Connect with our community in focused discussion groups.',
  keywords: 'prayer discussions, faith community, spiritual conversations, Christian discussions, prayer groups',
  openGraph: {
    title: 'Discussions - Join Our Prayer Community | My Prayer',
    description: 'Join meaningful discussions about faith, prayer, and spiritual growth.',
    type: 'website',
    url: 'https://myprayer.online/en/discussions',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'Prayer Discussions Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discussions - Join Our Prayer Community | My Prayer',
    description: 'Join meaningful discussions about faith, prayer, and spiritual growth.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/en/discussions'
  }
};

export default function DiscussionsPage() {
  const t = useTranslations('discussions');

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Discussions - Join Our Prayer Community | My Prayer",
    "description": "Join meaningful conversations about faith, prayer, and spiritual growth. Connect with our community in focused discussion groups.",
    "url": "https://myprayer.online/en/discussions",
    "mainEntity": {
      "@type": "Organization",
      "name": "My Prayer Community",
      "url": "https://myprayer.online",
      "description": "A supportive prayer community where faith, hope, and prayer come together"
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
          "name": "Discussions",
          "item": "https://myprayer.online/en/discussions"
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-4">
            {t('title', { default: 'Community Discussions' })}
          </h1>
          <p className="text-[#3A504B] font-open-sans text-lg max-w-3xl mx-auto leading-relaxed">
            {t('pageDescription', { default: 'Join meaningful conversations about faith, prayer, and spiritual growth. Connect with others who share your journey.' })}
          </p>
        </div>
        
        <LoginGate fallbackMessage={t('loginRequiredMessage', { default: 'Please log in to access discussions and connect with our community.' })}>
          <DiscussionChatRoom />
        </LoginGate>
      </main>
      <Footer />
    </div>
  );
}
