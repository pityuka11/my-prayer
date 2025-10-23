import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionChatRoom from '@/components/DiscussionChatRoom';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

interface DiscussionGroupPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DiscussionGroupPageProps): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Discussion Group ${id} - Join Our Prayer Community | My Prayer`,
    description: 'Join meaningful discussions about faith, prayer, and spiritual growth. Connect with our community in focused discussion groups.',
    keywords: 'prayer discussions, faith community, spiritual conversations, Christian discussions, prayer groups',
    openGraph: {
      title: `Discussion Group ${id} - Join Our Prayer Community | My Prayer`,
      description: 'Join meaningful discussions about faith, prayer, and spiritual growth.',
      type: 'website',
      url: `https://myprayer.online/en/discussions/${id}`,
      images: [
        {
          url: 'https://myprayer.online/prayer-image.png',
          width: 1200,
          height: 630,
          alt: 'Prayer Discussions Community'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Discussion Group ${id} - Join Our Prayer Community | My Prayer`,
      description: 'Join meaningful discussions about faith, prayer, and spiritual growth.',
      images: ['https://myprayer.online/prayer-image.png']
    },
    alternates: {
      canonical: `https://myprayer.online/en/discussions/${id}`
    }
  };
}

export default async function DiscussionGroupPage({ params }: DiscussionGroupPageProps) {
  const { id } = await params;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Discussion Group ${id} - Join Our Prayer Community | My Prayer`,
    "description": "Join meaningful conversations about faith, prayer, and spiritual growth. Connect with our community in focused discussion groups.",
    "url": `https://myprayer.online/en/discussions/${id}`,
    "mainEntity": {
      "@type": "Organization",
      "name": "My Prayer Community",
      "url": "https://myprayer.online",
      "description": "A supportive prayer community where faith, hope, and prayer come together"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://myprayer.online"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Discussions",
          "item": "https://myprayer.online/en/discussions"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Group ${id}`,
          "item": `https://myprayer.online/en/discussions/${id}`
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      {/* Structured Data */}
      <StructuredData data={structuredData} />

      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair text-[#3A504B] mb-4">
            Discussion Group {id}
          </h1>
          <p className="text-[#3A504B] font-open-sans text-lg max-w-3xl mx-auto leading-relaxed">
            Join meaningful conversations about faith, prayer, and spiritual growth. Connect with others who share your journey.
          </p>
        </div>
        
        <DiscussionChatRoom defaultGroupId={parseInt(id)} />
      </main>
      <Footer />
    </div>
  );
}