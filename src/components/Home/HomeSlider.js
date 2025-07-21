"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import './Home.css'; // External CSS for pagination

const images = [
  '/asset/Home/1.png',
  '/asset/Home/2.png',
  '/asset/Home/3.png',
  
];

const HomeSlider = () => {
  return (
    <div className="w-full md:mt-1 relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"><span class='progress'></span></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className="w-full"
        onAutoplayTimeLeft={(swiper, time, progress) => {
          const bullets = document.querySelectorAll('.custom-pagination .custom-bullet');
          bullets.forEach((bullet, idx) => {
            const progressEl = bullet.querySelector('.progress');
            if (!progressEl) return;

            if (idx === swiper.realIndex) {
              bullet.classList.add('active');
              progressEl.style.width = `${(1 - progress) * 100}%`;
              progressEl.style.transition = 'width 0.1s linear';
            } else {
              bullet.classList.remove('active');
              progressEl.style.width = '0%';
              progressEl.style.transition = 'none';
            }
          });
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[30vh] md:h-[650px]">
              <Image
                src={img}
                fill
                className="rounded-none object-fit"
                priority={index === 0}
                alt={`banner-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="custom-pagination absolute bottom-6 right-6 flex justify-end gap-2 z-20"></div>
      </Swiper>
    </div>
  );
};

export default HomeSlider;