'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  '/asset/Home/nutan-banner3.png',
  '/asset/Home/nutan-banner4.png',
  '/asset/Home/nutan-banner2.png',
  '/asset/Home/nutan-banner1.png',
];

const HomeSlider = () => {
  return (
    <div className="w-full md:mt-6 relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[40vh] md:h-[650px]">
              <Image
                src={img}
                
                layout="fill"
                objectFit="cover"
                className="rounded-none"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
