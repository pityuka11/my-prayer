import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AffiliateCarousel from '@/components/affiliate/AffiliateCarousel';
// import AffiliateGrid from '@/components/affiliate/AffiliateGrid';

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-[#F8F7F2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <h1 className="text-4xl font-playfair text-[#3A504B]">Products</h1>
        <AffiliateCarousel />
        {/* <AffiliateGrid /> */}
      </main>
      <Footer />
    </div>
  );
}
