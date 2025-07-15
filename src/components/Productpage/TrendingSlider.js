'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '@/components/ProductCart';
import Link from 'next/link';

export default function TrendingSlider({ product = [] }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (!product?.length) return null;

  return (
    <section className="w-full px-8 py-12 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-[32px] font-bold uppercase">Trending Products</h2>
        {/* Optional: View All Link */}
        <Link href="/allproduct" className="text-[16px] underline">View All</Link>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.backpack-next',
            prevEl: '.backpack-prev',
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {product.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard
                item={{
                  id: item.id,
                  title: item.productName,
                  image: item.productImages?.[0] || '/placeholder.png',
                  price: item.variation?.[0]?.price || item.productPrice,
                  original: item.productPrice,
                }}
                isLiked={wishlist.includes(item.id)}
                toggleWishlist={toggleWishlist}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button className="backpack-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="backpack-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
