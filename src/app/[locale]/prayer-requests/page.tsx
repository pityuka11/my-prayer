import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {useTranslations} from 'next-intl';

export default function PrayerRequestsPage() {
  const t = useTranslations('prayerRequests');
  const items = t.raw('items') as {text: string; button: string}[];

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-playfair text-[#3A504B] mb-6">
          {t('title')}
        </h1>
        <p className="text-[#3A504B] font-open-sans mb-8 max-w-3xl">
          {t.rich?.('intro', {
            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>
          }) ?? ''}
        </p>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <span className="font-open-sans text-[#3A504B] text-lg">{item.text}</span>
              <button className="bg-[#8ECDCF] text-white px-6 py-2 rounded-lg font-open-sans hover:bg-[#7BB8BA] transition-colors">
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
