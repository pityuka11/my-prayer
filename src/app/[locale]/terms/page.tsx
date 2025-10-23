import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Terms of Service - My Prayer Community',
  description: 'Read the Terms of Service for My Prayer Community. Learn about your rights and responsibilities when using our prayer community platform.',
  keywords: 'terms of service, terms and conditions, user agreement, My Prayer, community guidelines',
  openGraph: {
    title: 'Terms of Service - My Prayer Community',
    description: 'Read the Terms of Service for My Prayer Community. Learn about your rights and responsibilities.',
    type: 'website',
    url: 'https://myprayer.online/terms',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'Terms of Service - My Prayer Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - My Prayer Community',
    description: 'Read the Terms of Service for My Prayer Community. Learn about your rights and responsibilities.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/terms'
  }
};

export default function TermsPage() {
  const t = useTranslations('terms');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - My Prayer Community",
    "description": "Terms of service and user agreement for My Prayer Community",
    "url": "https://myprayer.online/terms",
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
            {t('title', { default: 'Terms of Service' })}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-[#3A504B] font-open-sans mb-6 text-sm">
              {t('lastUpdated', { default: 'Last updated: October 23, 2025' })}
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('acceptanceTitle', { default: 'Acceptance of Terms' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('acceptanceText', { default: 'By accessing and using My Prayer Community ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('descriptionTitle', { default: 'Service Description' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('descriptionText', { default: 'My Prayer Community is a platform that facilitates prayer requests, spiritual discussions, and community support. Our services include:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('service1', { default: 'Prayer request submission and sharing' })}</li>
                <li>{t('service2', { default: 'Community discussion forums' })}</li>
                <li>{t('service3', { default: 'Newsletter and spiritual content' })}</li>
                <li>{t('service4', { default: 'Multi-language support' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('userResponsibilitiesTitle', { default: 'User Responsibilities' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('userResponsibilitiesText', { default: 'As a user of our service, you agree to:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('responsibility1', { default: 'Provide accurate and truthful information' })}</li>
                <li>{t('responsibility2', { default: 'Respect other community members and their beliefs' })}</li>
                <li>{t('responsibility3', { default: 'Not post harmful, offensive, or inappropriate content' })}</li>
                <li>{t('responsibility4', { default: 'Maintain the confidentiality of shared prayer requests' })}</li>
                <li>{t('responsibility5', { default: 'Use the service in accordance with applicable laws' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('prohibitedTitle', { default: 'Prohibited Activities' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('prohibitedText', { default: 'You may not use our service to:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('prohibited1', { default: 'Post spam, advertisements, or promotional content' })}</li>
                <li>{t('prohibited2', { default: 'Harass, threaten, or intimidate other users' })}</li>
                <li>{t('prohibited3', { default: 'Share false or misleading information' })}</li>
                <li>{t('prohibited4', { default: 'Violate any applicable laws or regulations' })}</li>
                <li>{t('prohibited5', { default: 'Attempt to gain unauthorized access to our systems' })}</li>
                <li>{t('prohibited6', { default: 'Distribute malware or harmful software' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('contentTitle', { default: 'User-Generated Content' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('contentText', { default: 'You retain ownership of the content you post on our platform. However, by posting content, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content in connection with our service.' })}
              </p>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('contentNote', { default: 'We reserve the right to remove any content that violates these terms or is deemed inappropriate for our community.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('privacyTitle', { default: 'Privacy and Data Protection' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('privacyText', { default: 'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our service, you consent to the collection and use of information as described in our Privacy Policy.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('disclaimersTitle', { default: 'Disclaimers' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('disclaimersText', { default: 'Our service is provided "as is" without warranties of any kind. We do not guarantee:' })}
              </p>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('disclaimer1', { default: 'The accuracy or completeness of user-generated content' })}</li>
                <li>{t('disclaimer2', { default: 'The availability or uninterrupted operation of our service' })}</li>
                <li>{t('disclaimer3', { default: 'The effectiveness of prayers or spiritual guidance' })}</li>
                <li>{t('disclaimer4', { default: 'The resolution of personal or spiritual issues' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('limitationTitle', { default: 'Limitation of Liability' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('limitationText', { default: 'To the maximum extent permitted by law, My Prayer Community shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our service.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('terminationTitle', { default: 'Termination' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('terminationText', { default: 'We reserve the right to terminate or suspend your access to our service at any time, with or without notice, for any reason, including violation of these terms. You may also terminate your use of our service at any time.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('changesTitle', { default: 'Changes to Terms' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('changesText', { default: 'We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the updated terms on our website. Your continued use of the service after such changes constitutes acceptance of the new terms.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('contactTitle', { default: 'Contact Information' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('contactText', { default: 'If you have any questions about these Terms of Service, please contact us:' })}
              </p>
              <div className="bg-[#F8F7F2] rounded-lg p-6">
                <p className="text-[#3A504B] font-open-sans">
                  <span className="font-semibold">{t('email', { default: 'Email:' })}</span> contact@myprayer.online
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('governingTitle', { default: 'Governing Law' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('governingText', { default: 'These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of our service shall be resolved through appropriate legal channels.' })}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
