'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type PrayerRequest = {
  id: number;
  content: string;
  user_name: string;
  created_at: string;
};

export default function PrayerRequestsCarousel() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('prayerRequests');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/prayer-requests');
        const data: { requests: PrayerRequest[] } = await res.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error('Failed to fetch prayer requests:', error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % requests.length);
      }, 5000); // Change every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [requests.length]);

  const handlePray = async () => {
    // Add prayer functionality - could be a like/heart system
    try {
      // For now, just show an alert. You can implement a proper prayer count system later
      alert(t('prayedFor', { default: 'Thank you for praying! 🙏' }));
    } catch (error) {
      console.error('Failed to record prayer:', error);
    }
  };

  if (requests.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
      <h2 className="text-3xl font-playfair text-[#3A504B] mb-6 text-center">
        {t('communityRequests', { default: 'Community Prayer Requests' })}
      </h2>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {requests.map((request) => (
            <div key={request.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-[#F8F7F2] rounded-xl p-6 text-center">
                <p className="text-[#3A504B] font-open-sans text-lg mb-4 leading-relaxed">
                  &ldquo;{request.content}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#3A504B] opacity-70">
                    — {request.user_name}
                  </span>
                  <button
                    onClick={() => handlePray()}
                    className="flex items-center space-x-2 bg-[#8ECDCF] text-white px-4 py-2 rounded-lg hover:bg-[#7BB8BA] transition-colors"
                  >
                    <span>✞</span>
                    <span>{t('prayForThis', { default: 'Pray for this' })}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {requests.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {requests.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#8ECDCF]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
