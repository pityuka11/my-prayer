import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionGroups from '@/components/DiscussionGroups';
import StructuredData from '@/components/StructuredData';
import {useTranslations} from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Join Our Prayer Community | My Prayer',
  description: 'Join our supportive prayer community. Connect with prayer circles, attend events, and grow in faith together. Find spiritual fellowship and support in our global prayer community.',
  keywords: 'prayer community, prayer circles, Christian community, spiritual fellowship, prayer events, faith community, online prayer groups',
  openGraph: {
    title: 'Community - Join Our Prayer Community | My Prayer',
    description: 'Join our supportive prayer community. Connect with prayer circles, attend events, and grow in faith together.',
    type: 'website',
    url: 'https://myprayer.online/community',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'Prayer Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community - Join Our Prayer Community | My Prayer',
    description: 'Join our supportive prayer community. Connect with prayer circles, attend events, and grow in faith together.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/community'
  }
};

export default function CommunityPage() {
  const t = useTranslations('community');

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Community - Join Our Prayer Community | My Prayer",
    "description": "Join our supportive prayer community. Connect with prayer circles, attend events, and grow in faith together.",
    "url": "https://myprayer.online/community",
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
          "name": "Community",
          "item": "https://myprayer.online/community"
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-4">
            {t('title')}
          </h1>
          <p className="text-[#3A504B] font-open-sans text-lg max-w-3xl mx-auto leading-relaxed">
            {t('pageDescription', { 
              default: 'Join our supportive prayer community where faith, hope, and prayer come together. Connect with others, grow in faith, and find spiritual fellowship.' 
            })}
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#8ECDCF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👥</span>
            </div>
            <h2 className="text-xl font-playfair text-[#3A504B] mb-3 text-center">
              {t('prayerCircles')}
            </h2>
            <p className="text-[#3A504B] font-open-sans text-center mb-4">
              {t('circlesDescription', {default: 'Join small groups that meet online to pray together weekly.'})}
            </p>
            <div className="text-center">
              <button className="bg-[#8ECDCF] text-white px-6 py-2 rounded-lg hover:bg-[#7BB8BA] transition-colors">
                {t('joinCircle', { default: 'Join a Circle' })}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#E8A96F] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📅</span>
            </div>
            <h2 className="text-xl font-playfair text-[#3A504B] mb-3 text-center">
              {t('events')}
            </h2>
            <p className="text-[#3A504B] font-open-sans text-center mb-4">
              {t('eventsDescription', {default: 'See upcoming gatherings, retreats and virtual prayer evenings.'})}
            </p>
            <div className="text-center">
              <button className="bg-[#E8A96F] text-white px-6 py-2 rounded-lg hover:bg-[#D4985A] transition-colors">
                {t('viewEvents', { default: 'View Events' })}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#8ECDCF] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">💬</span>
            </div>
            <h2 className="text-xl font-playfair text-[#3A504B] mb-3 text-center">
              {t('discussions', { default: 'Discussions' })}
            </h2>
            <p className="text-[#3A504B] font-open-sans text-center mb-4">
              {t('discussionsDescription', {default: 'Engage in meaningful conversations about faith, prayer, and spiritual growth.'})}
            </p>
            <div className="text-center">
              <button className="bg-[#8ECDCF] text-white px-6 py-2 rounded-lg hover:bg-[#7BB8BA] transition-colors">
                {t('joinDiscussion', { default: 'Join Discussion' })}
              </button>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="bg-gradient-to-br from-[#8ECDCF] to-[#7BB8BA] rounded-2xl p-8 mb-12 text-center text-white">
          <h2 className="text-2xl font-playfair mb-6">
            {t('communityStats', { default: 'Our Community' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">1,000+</div>
              <div className="text-lg opacity-90">
                {t('activeMembers', { default: 'Active Members' })}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">
                {t('prayerCircles', { default: 'Prayer Circles' })}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-lg opacity-90">
                {t('languages', { default: 'Languages' })}
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Groups */}
        <DiscussionGroups />

        {/* Newsletter Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto mt-8">
          <h3 className="text-2xl font-playfair text-[#3A504B] mb-4 text-center">
            {t('newsletterTitle', {default: 'Stay Connected'})}
          </h3>
          <p className="text-[#3A504B] font-open-sans mb-6 text-center">
            {t('newsletterDescription', { default: 'Get updates about community events, prayer circles, and spiritual resources.' })}
          </p>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder={t('newsletterPlaceholder', { default: 'Enter your email address' })} 
              className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg font-open-sans text-[#3A504B] focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]" 
            />
            <button className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-open-sans font-semibold hover:bg-[#7BB8BA] transition-colors">
              {t('newsletterButton', { default: 'Subscribe' })}
            </button>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-playfair text-[#3A504B] mb-6 text-center">
            {t('communityGuidelines', { default: 'Community Guidelines' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline1', { default: 'Respect all members regardless of background or beliefs' })}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline2', { default: 'Keep discussions focused on faith, prayer, and spiritual growth' })}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline3', { default: 'Maintain confidentiality of shared prayer requests' })}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline4', { default: 'Encourage and support one another in faith' })}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline5', { default: 'Share resources and insights that benefit the community' })}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <p className="text-[#3A504B] font-open-sans">
                  {t('guideline6', { default: 'Report any inappropriate behavior to moderators' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
