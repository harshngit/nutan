'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const images = [
  '/asset/Home/bgimg.jpg',
  '/asset/Home/bgimg.jpg',
  '/asset/Home/bgimg.jpg',
];

const HeroSection = () => {
  return (
    <div className="relative h-screen z-0 overflow-hidden">

      {/* Background Image Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Center Constant Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-5 z-10">
        <div className="flex flex-col justify-center gap-5 items-center text-center max-w-[90%] lg:max-w-[30%]">
          <h2 className="font-bold text-[#B88E2F] text-[20px] lg:text-[52px]">
            Discover Our New Collection
          </h2>
          <p className="text-black mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-[#B88E2F] text-white px-8 py-3 lg:px-[75px] lg:py-[25px]">
            BUY NOW
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
