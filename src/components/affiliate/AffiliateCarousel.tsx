"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Product = {
  id: string;
  title: string;
  image: string;
  url: string; // your Amazon affiliate URL (fill later)
  price?: string;
};

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data: { items?: Product[] } = await res.json();
    return (data.items || []).slice(0, 8);
  } catch {
    return [];
  }
}

export default function AffiliateCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setItems);
  }, []);

  const scrollBy = (dx: number) => {
    scroller.current?.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-playfair text-[#3A504B]">Featured</h2>
        <div className="space-x-2">
          <button onClick={() => scrollBy(-400)} className="px-3 py-1 bg-[#8ECDCF] text-white rounded">‹</button>
          <button onClick={() => scrollBy(400)} className="px-3 py-1 bg-[#8ECDCF] text-white rounded">›</button>
        </div>
      </div>
      <div ref={scroller} className="overflow-x-auto">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 pr-4">
          {items.map(p => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block bg-[#F8F7F2] rounded-lg p-3 hover:shadow">
              <div className="aspect-video bg-white rounded mb-2 relative overflow-hidden">
                <Image        src={p.image}
      alt={p.title}
      fill
      className="object-contain rounded"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      unoptimized/>
              </div>
              <div className="text-[#3A504B] font-open-sans text-sm">
                <div className="font-semibold truncate">{p.title}</div>
                <div className="opacity-80">{p.price}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
