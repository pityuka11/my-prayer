import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PrayerRequests from '@/components/PrayerRequests';
import BiblicalMessages from '@/components/BiblicalMessages';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PrayerRequests />
            <BiblicalMessages />
          </div>
          <div>
            <Community />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}