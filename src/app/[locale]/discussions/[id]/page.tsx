import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiscussionChat from '@/components/DiscussionChat';

interface DiscussionPageProps {
  params: {
    id: string;
  };
}

export default function DiscussionPage({ params }: DiscussionPageProps) {
  const groupId = parseInt(params.id);

  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <DiscussionChat groupId={groupId} />
      <Footer />
    </div>
  );
}
