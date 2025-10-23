import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'About Us - My Prayer Community',
  description: 'Learn about My Prayer Community, our mission, and how to contact us. We are dedicated to bringing people together through faith and prayer.',
  keywords: 'about us, contact, prayer community, faith, spiritual support, My Prayer',
  openGraph: {
    title: 'About Us - My Prayer Community',
    description: 'Learn about My Prayer Community, our mission, and how to contact us.',
    type: 'website',
    url: 'https://myprayer.online/about',
    images: [
      {
        url: 'https://myprayer.online/prayer-image.png',
        width: 1200,
        height: 630,
        alt: 'My Prayer Community'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - My Prayer Community',
    description: 'Learn about My Prayer Community, our mission, and how to contact us.',
    images: ['https://myprayer.online/prayer-image.png']
  },
  alternates: {
    canonical: 'https://myprayer.online/about'
  }
};

export default function AboutPage() {
  const t = useTranslations('about');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "My Prayer Community",
    "url": "https://myprayer.online",
    "description": "A supportive prayer community where faith, hope, and prayer come together",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@myprayer.online",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://myprayer.online"
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <StructuredData data={structuredData} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-8 text-center">
            {t('title', { default: 'About Us' })}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('missionTitle', { default: 'Our Mission' })}
              </h2>
              <p className="text-[#3A504B] font-open-sans leading-relaxed mb-4">
                {t('missionText', { default: 'My Prayer Community is dedicated to bringing people together through faith, hope, and prayer. We believe that prayer has the power to unite hearts across the world and provide comfort, support, and spiritual guidance to those who need it most.' })}
              </p>
              <p className="text-[#3A504B] font-open-sans leading-relaxed">
                {t('missionText2', { default: 'Our platform serves as a safe space where individuals can share their prayer requests, join meaningful discussions about faith, and connect with a supportive community that understands the power of prayer.' })}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('valuesTitle', { default: 'Our Values' })}
              </h2>
              <ul className="list-disc list-inside text-[#3A504B] font-open-sans space-y-2">
                <li>{t('value1', { default: 'Faith: We believe in the power of faith to transform lives' })}</li>
                <li>{t('value2', { default: 'Community: We foster a supportive and inclusive environment' })}</li>
                <li>{t('value3', { default: 'Prayer: We recognize prayer as a powerful tool for healing and connection' })}</li>
                <li>{t('value4', { default: 'Respect: We honor all beliefs and backgrounds' })}</li>
                <li>{t('value5', { default: 'Privacy: We protect the confidentiality of our community members' })}</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('contactTitle', { default: 'Contact Us' })}
              </h2>
              <div className="bg-[#F8F7F2] rounded-lg p-6">
                <p className="text-[#3A504B] font-open-sans mb-4">
                  {t('contactText', { default: 'We would love to hear from you! Whether you have questions, suggestions, or need support, our team is here to help.' })}
                </p>
                <div className="space-y-2">
                  <p className="text-[#3A504B] font-open-sans">
                    <span className="font-semibold">{t('emailLabel', { default: 'Email:' })}</span> contact@myprayer.online
                  </p>
                  <p className="text-[#3A504B] font-open-sans">
                    <span className="font-semibold">{t('responseTime', { default: 'Response Time:' })}</span> {t('responseTimeValue', { default: 'We typically respond within 24-48 hours' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">
                {t('imprintTitle', { default: 'Imprint' })}
              </h2>
              <div className="bg-[#F8F7F2] rounded-lg p-6">
                <p className="text-[#3A504B] font-open-sans mb-2">
                  <span className="font-semibold">{t('operator', { default: 'Website Operator:' })}</span> My Prayer Community
                </p>
                <p className="text-[#3A504B] font-open-sans mb-2">
                  <span className="font-semibold">{t('email', { default: 'Email:' })}</span> contact@myprayer.online
                </p>
                <p className="text-[#3A504B] font-open-sans mb-2">
                  <span className="font-semibold">{t('website', { default: 'Website:' })}</span> https://myprayer.online
                </p>
                <p className="text-[#3A504B] font-open-sans text-sm mt-4">
                  {t('imprintNote', { default: 'This website is operated by My Prayer Community. For any legal inquiries or concerns, please contact us at the email address provided above.' })}
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
