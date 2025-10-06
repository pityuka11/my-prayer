'use client';

import {useTranslations} from 'next-intl';

export default function PrayerRequests() {
  const t = useTranslations('prayerRequests');

  const items = t.raw('items') as {text: string; button: string}[];

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
        {t('title')}
      </h2>
      
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F7F2] rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#E8A96F] rounded-full"></div>
              <span className="font-open-sans text-[#3A504B] text-lg">
                {item.text}
              </span>
            </div>
            <button className="bg-[#8ECDCF] text-white px-6 py-2 rounded-lg font-open-sans hover:bg-[#7BB8BA] transition-colors">
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
