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

async function fetchProducts(page: number): Promise<Product[]> {
  const res = await fetch(`/api/products?page=${page}`, { cache: 'no-store' });
  const data: { items?: Product[] } = await res.json();
  return data.items || [];
}

export default function AffiliateGrid() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const next = page + 1;
        fetchProducts(next).then(batch => {
          if (batch.length) {
            setItems(prev => [...prev, ...batch]);
            setPage(next);
          }
        }).catch(() => {});
      }
    }, { rootMargin: '200px' });
    if (sentinelRef.current) io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [page]);

  useEffect(() => {
    if (items.length === 0) {
      fetchProducts(0).then(setItems).catch(() => {});
    }
  }, [items.length]);

  return (
    <section>
      <h2 className="text-2xl font-playfair text-[#3A504B] mb-4">More recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p => (
          <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg p-3 shadow-sm hover:shadow">
            <div className="aspect-square bg-[#F8F7F2] rounded mb-2 relative">
              <Image src={p.image} alt={p.title} fill className="object-contain p-3" />
            </div>
            <div className="text-[#3A504B] font-open-sans text-sm">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="opacity-80">{p.price}</div>
            </div>
          </a>
        ))}
      </div>
      <div ref={sentinelRef} className="h-8" />
    </section>
  );
}
