import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy - My Prayer Community',
  description: 'Learn how My Prayer Community protects your privacy and handles your personal information. Our commitment to data protection and user privacy.',
  keywords: 'privacy policy, data protection, cookies, personal information, My Prayer',
  openGraph: {
    title: 'Privacy Policy - My Prayer Community',
    description: 'Learn how My Prayer Community protects your privacy and handles your personal information.',
    type: 'website',
    url: 'https://myprayer.online/privacy',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - My Prayer Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - My Prayer Community',
    description: 'Learn how My Prayer Community protects your privacy and handles your personal information.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/privacy'
  }
};

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - My Prayer Community",
    "description": "Privacy policy and data protection information for My Prayer Community",
    "url": "https://myprayer.online/privacy",
    "mainEntity": {
      "@type": "Organization",
      "name": "My Prayer Community",
      "url": "https://myprayer.online"
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <StructuredData data={structuredData} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-8 text-center">
            {t('title', { default: 'Privacy Policy' })}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-[#3A504B] font-open-sans mb-6 text-sm">
              {t('lastUpdated', { default: 'Last updated: October 23, 2025' })}
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('introductionTitle', { default: 'Introduction' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('introductionText', { default: 'My Prayer Community ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('informationTitle', { default: 'Information We Collect' })}
              </h2>
              <h3 className="text-xl font-playfair text-[#3A504B] mb-3">
                {t('personalInfoTitle', { default: 'Personal Information' })}
              </h3>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2 mb-4">
                <li>{t('personalInfo1', { default: 'Email addresses (for newsletter subscriptions)' })}</li>
                <li>{t('personalInfo2', { default: 'Names (when you choose to provide them)' })}</li>
                <li>{t('personalInfo3', { default: 'Prayer requests and messages (when you choose to share them)' })}</li>
              </ul>
              
              <h3 className="text-xl font-playfair text-[#3A504B] mb-3">
                {t('technicalInfoTitle', { default: 'Technical Information' })}
              </h3>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('technicalInfo1', { default: 'IP addresses and browser information' })}</li>
                <li>{t('technicalInfo2', { default: 'Cookies and similar tracking technologies' })}</li>
                <li>{t('technicalInfo3', { default: 'Usage data and analytics' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('cookiesTitle', { default: 'Cookies and Tracking' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('cookiesText', { default: 'We use cookies and similar technologies to enhance your experience on our website. These technologies help us:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2 mb-4">
                <li>{t('cookiesUse1', { default: 'Remember your preferences and settings' })}</li>
                <li>{t('cookiesUse2', { default: 'Analyze website traffic and usage patterns' })}</li>
                <li>{t('cookiesUse3', { default: 'Provide personalized content and advertisements' })}</li>
                <li>{t('cookiesUse4', { default: 'Improve our services and user experience' })}</li>
              </ul>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('cookiesNote', { default: 'You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('useTitle', { default: 'How We Use Your Information' })}
              </h2>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('use1', { default: 'To provide and maintain our prayer community services' })}</li>
                <li>{t('use2', { default: 'To send newsletters and updates (with your consent)' })}</li>
                <li>{t('use3', { default: 'To improve our website and services' })}</li>
                <li>{t('use4', { default: 'To analyze usage patterns and trends' })}</li>
                <li>{t('use5', { default: 'To ensure the security and integrity of our platform' })}</li>
                <li>{t('use6', { default: 'To comply with legal obligations' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('sharingTitle', { default: 'Information Sharing' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('sharingText', { default: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('sharing1', { default: 'With service providers who assist us in operating our website' })}</li>
                <li>{t('sharing2', { default: 'When required by law or to protect our rights' })}</li>
                <li>{t('sharing3', { default: 'In connection with a business transfer or acquisition' })}</li>
                <li>{t('sharing4', { default: 'With your explicit consent' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('securityTitle', { default: 'Data Security' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('securityText', { default: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('rightsTitle', { default: 'Your Rights' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('rightsText', { default: 'You have the right to:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('rights1', { default: 'Access your personal information' })}</li>
                <li>{t('rights2', { default: 'Correct inaccurate information' })}</li>
                <li>{t('rights3', { default: 'Delete your personal information' })}</li>
                <li>{t('rights4', { default: 'Withdraw consent for data processing' })}</li>
                <li>{t('rights5', { default: 'Object to certain types of processing' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('contactTitle', { default: 'Contact Us' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('contactText', { default: 'If you have any questions about this Privacy Policy or our data practices, please contact us:' })}
              </p>
              <div className="bg-[#F8F7F2] rounded-lg p-6">
                <p className="text-[#3A504B] font-open-sans">
                  <span className="font-semibold">{t('email', { default: 'Email:' })}</span> contact@myprayer.online
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('changesTitle', { default: 'Changes to This Policy' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('changesText', { default: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.' })}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
