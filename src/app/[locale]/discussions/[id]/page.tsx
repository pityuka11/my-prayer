import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionChat from '@/components/DiscussionChat';

interface DiscussionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { id } = await params;
  const groupId = parseInt(id);

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <DiscussionChat groupId={groupId} />
      <Footer />
    </div>
  );
}
