import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionGroups from '@/components/DiscussionGroups';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussions - Join Our Prayer Community | My Prayer',
  description: 'Join meaningful discussions about faith, prayer, and spiritual growth. Connect with our community in focused discussion groups.',
  keywords: 'prayer discussions, faith community, spiritual conversations, Christian discussions, prayer groups',
  openGraph: {
    title: 'Discussions - Join Our Prayer Community | My Prayer',
    description: 'Join meaningful discussions about faith, prayer, and spiritual growth.',
    type: 'website',
    url: 'https://myprayer.online/discussions',
  },
  alternates: {
    canonical: 'https://myprayer.online/discussions'
  }
};

export default function DiscussionsPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-4">
            Community Discussions
          </h1>
          <p className="text-[#3A504B] font-open-sans text-lg max-w-3xl mx-auto leading-relaxed">
            Join meaningful conversations about faith, prayer, and spiritual growth. Connect with others who share your journey.
          </p>
        </div>
        
        <DiscussionGroups />
      </main>
      <Footer />
    </div>
  );
}
