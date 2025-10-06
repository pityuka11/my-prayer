'use client';

import {useTranslations} from 'next-intl';

export default function Community() {
  const t = useTranslations('community');

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-playfair text-[#3A504B] mb-6">
        {t('title')}
      </h2>
      
       <div className="space-y-6">
       {/* <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F8F7F2] rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <Image
                src="/prayer-circles-icon.svg"
                alt="Prayer Circles"
                width={48}
                height={48}
              />
            </div>
            <h3 className="font-open-sans text-[#3A504B] font-semibold">
              {t('prayerCircles')}
            </h3>
          </div>
          
          <div className="bg-[#F8F7F2] rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <Image
                src="/events-icon.svg"
                alt="Events"
                width={48}
                height={48}
              />
            </div>
            <h3 className="font-open-sans text-[#3A504B] font-semibold">
              {t('events')}
            </h3>
          </div>
        </div> */}
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder={t('newsletter.placeholder')}
            className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg font-open-sans text-[#3A504B] focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]"
          />
          <button className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-open-sans font-semibold hover:bg-[#7BB8BA] transition-colors">
            {t('newsletter.button')}
          </button>
        </div>
     
        <div className="flex justify-center space-x-4 pt-4">
          <div className="w-10 h-10 bg-[#8ECDCF] rounded-full flex items-center justify-center hover:bg-[#7BB8BA] transition-colors cursor-pointer">
            <span className="text-white text-sm font-bold">f</span>
          </div>
          <div className="w-10 h-10 bg-[#8ECDCF] rounded-full flex items-center justify-center hover:bg-[#7BB8BA] transition-colors cursor-pointer">
            <span className="text-white text-sm font-bold">t</span>
          </div>
          <div className="w-10 h-10 bg-[#8ECDCF] rounded-full flex items-center justify-center hover:bg-[#7BB8BA] transition-colors cursor-pointer">
            <span className="text-white text-sm font-bold">i</span>
          </div>
        </div>
      </div>
    </section>
  );
}
