'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PrayerRequestPopup from './PrayerRequestPopup';
import TranslationButton from './TranslationButton';

export default function PrayerRequests() {
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations('prayerRequests');

  const items = t.raw('items') as { text: string; button: string }[];

  const handleSubmitSuccess = () => {
    // Refresh the page or refetch data
    window.location.reload();
  };

  return (
    <>
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
          {t('title')}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[0, 1].map((col) => (
              <div key={col} className="p-4 bg-[#F8F7F2] rounded-lg space-y-2">
                {items
                  .slice(
                    col * Math.ceil(items.length / 2),
                    (col + 1) * Math.ceil(items.length / 2)
                  )
                  .map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-[#E8A96F] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <span className="font-open-sans text-[#3A504B] text-lg">
                          {item.text}
                        </span>
                        <TranslationButton text={item.text} className="mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setShowPopup(true)}
            className="bg-[#8ECDCF] w-full text-white px-6 py-3 rounded-lg font-open-sans hover:bg-[#7BB8BA] transition-colors flex items-center justify-center space-x-2"
          >
            <span>✞</span>
            <span>{t('submitRequest', { default: 'Submit Prayer Request' })}</span>
          </button>
        </div>
      </section>

      <PrayerRequestPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onSuccess={handleSubmitSuccess}
      />
    </>
  );
}
