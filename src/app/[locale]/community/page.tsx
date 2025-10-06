import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useTranslations} from 'next-intl';

export default function CommunityPage() {
  const t = useTranslations('community');

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-playfair text-[#3A504B] mb-6">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-open-sans text-[#3A504B] font-semibold mb-2">{t('prayerCircles')}</h2>
            <p className="text-[#3A504B] font-open-sans">{t('circlesDescription', {default: 'Join small groups that meet online to pray together weekly.'})}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-open-sans text-[#3A504B] font-semibold mb-2">{t('events')}</h2>
            <p className="text-[#3A504B] font-open-sans">{t('eventsDescription', {default: 'See upcoming gatherings, retreats and virtual prayer evenings.'})}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl">
          <h3 className="font-open-sans text-[#3A504B] font-semibold mb-3">{t('newsletterTitle', {default: 'Subscribe to our newsletter'})}</h3>
          <div className="space-y-3">
            <input type="email" placeholder={t('newsletter.placeholder')} className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg font-open-sans text-[#3A504B] focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]" />
            <button className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-open-sans font-semibold hover:bg-[#7BB8BA] transition-colors">{t('newsletter.button')}</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
