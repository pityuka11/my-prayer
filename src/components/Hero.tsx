'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="bg-gradient-to-br from-[#E6F3F4] to-[#8ECDCF] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-playfair text-[#3A504B] leading-tight">
              {t('quote')}
            </blockquote>
            <cite className="text-base md:text-lg font-open-sans text-[#3A504B] italic">
              — {t('source')}
            </cite>
          </div>
          
          <div className="relative order-first lg:order-last">
            <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
              <Image
                src="/prayer-image.png"
                alt="People praying"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
