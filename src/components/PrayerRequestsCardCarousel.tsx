'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import TranslationButton from './TranslationButton';

type PrayerRequest = {
  id: number;
  content: string;
  display_name: string | null;
  category: string;
  created_at: string;
  prayers?: number;
};

export default function PrayerRequestsCardCarousel() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('prayerRequests');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/prayer-requests');
        const data: { requests: PrayerRequest[] } = await res.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error('Failed to fetch prayer requests:', error);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (requests.length > 1 && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % requests.length);
      }, 6000); // Change every 6 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [requests.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePray = async () => {
    try {
      const currentRequest = requests[currentIndex];
      if (!currentRequest) return;

      // Increment prayer count on server
      const res = await fetch('/api/prayer-increment', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prayerRequestId: currentRequest.id })
      });

      if (res.ok) {
        // Update local state
        setRequests(prev => prev.map(req => 
          req.id === currentRequest.id 
            ? { ...req, prayers: (req.prayers || 0) + 1 }
            : req
        ));
        
        alert(t('prayedFor', { default: 'Thank you for praying! 🙏' }));
      } else {
        console.error('Failed to increment prayer count');
        alert(t('prayedFor', { default: 'Thank you for praying! 🙏' }));
      }
    } catch (error) {
      console.error('Failed to record prayer:', error);
      alert(t('prayedFor', { default: 'Thank you for praying! 🙏' }));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-3xl font-playfair text-[#3A504B] mb-6 text-center">
          {t('communityPrayers', { default: 'Community Prayers' })}
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-[#3A504B] opacity-70">Loading prayers...</div>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-3xl font-playfair text-[#3A504B] mb-6 text-center">
          {t('communityPrayers', { default: 'Community Prayers' })}
        </h2>
        
        <div className="bg-gradient-to-br from-[#F8F7F2] to-[#E8F4F4] rounded-xl p-8 text-center">
          {/* Background decorative elements */}
          <div className="absolute top-4 right-4 text-[#8ECDCF] text-6xl opacity-20">✞</div>
          <div className="absolute bottom-4 left-4 text-[#E8A96F] text-4xl opacity-20">🙏</div>
          
          {/* Prayer image placeholder */}
          <div className="w-24 h-24 mx-auto mb-6 bg-[#8ECDCF] rounded-full flex items-center justify-center text-white text-3xl">
            ✞
          </div>
          
          {/* Empty state message */}
          <div className="text-[#3A504B] font-open-sans text-xl mb-6 leading-relaxed">
            {t('noPrayersYet', { default: 'No prayers have been shared yet.' })}
          </div>
          
          <div className="text-[#3A504B] opacity-70 text-lg">
            {t('beFirst', { default: 'Be the first to share a prayer request!' })}
          </div>
        </div>
      </div>
    );
  }

  const currentRequest = requests[currentIndex];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-playfair text-[#3A504B]">
          {t('communityPrayers', { default: 'Community Prayers' })}
        </h2>
        
        {/* Play/Pause button */}
        {requests.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="flex items-center space-x-2 bg-[#8ECDCF] text-white px-4 py-2 rounded-lg hover:bg-[#7BB8BA] transition-colors"
            title={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            <span className="text-lg">
              {isPlaying ? '⏸️' : '▶️'}
            </span>
            <span className="text-sm font-medium">
              {isPlaying ? t('pause', { default: 'Pause' }) : t('play', { default: 'Play' })}
            </span>
          </button>
        )}
      </div>
      
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className="w-full flex-shrink-0">
            <div className="bg-gradient-to-br from-[#F8F7F2] to-[#E8F4F4] rounded-xl p-8 text-center relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-4 right-4 text-[#8ECDCF] text-6xl opacity-20">✞</div>
              <div className="absolute bottom-4 left-4 text-[#E8A96F] text-4xl opacity-20">🙏</div>
              
              {/* Prayer image placeholder */}
              <div className="w-24 h-24 mx-auto mb-6 bg-[#8ECDCF] rounded-full flex items-center justify-center text-white text-3xl">
                ✞
              </div>
              
              {/* Prayer quote */}
              <div className="flex items-start justify-between mb-4">
                <blockquote className="text-[#3A504B] font-open-sans text-xl leading-relaxed italic flex-1">
                  &ldquo;{currentRequest.content}&rdquo;
                </blockquote>
                <TranslationButton text={currentRequest.content} className="ml-4" />
              </div>
              
              {/* Category badge */}
              <div className="inline-block bg-[#8ECDCF] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {currentRequest.category}
              </div>
              
              {/* Author and actions */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm text-[#3A504B] opacity-70">
                    — {currentRequest.display_name || 'Anonymous'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(currentRequest.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Prayer count */}
                  <div className="flex items-center space-x-1 text-[#3A504B]">
                    <span className="text-lg">🙏</span>
                    <span className="text-sm font-medium">{currentRequest.prayers || 0}</span>
                  </div>
                  
                  <button
                    onClick={handlePray}
                    className="flex items-center space-x-2 bg-[#8ECDCF] text-white px-6 py-3 rounded-lg hover:bg-[#7BB8BA] transition-colors shadow-md"
                  >
                    <span className="text-lg">✞</span>
                    <span className="font-medium">{t('prayForThis', { default: 'Pray for this' })}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation dots */}
        {requests.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
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
        
        {/* Prayer counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-[#3A504B] opacity-70">
            {t('prayerCount', { default: 'Prayer' })} {currentIndex + 1} {t('of', { default: 'of' })} {requests.length}
          </span>
        </div>
      </div>
    </div>
  );
}
