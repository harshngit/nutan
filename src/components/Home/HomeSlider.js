"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

const slides = [
  {
    image: '/asset/Home/0.png',
    title: 'Celebrate Gifting Moments',
    subtitle: 'Discover premium giftsets for every occasion.',
    buttonText: 'Shop Now',
    buttonLink: '/giftsets',
    textColor: '#ffffff',
    buttonTextColor: '#EAD987',
    buttonBgColor: '#3B3310',
  },
  {
    image: '/asset/Home/2.png',
    title: 'Stay Hydrated in Style',
    subtitle: 'Explore our collection of designer drinkware.',
    buttonText: 'Shop Now',
    buttonLink: '/drinkware',
    textColor: '#ffffff',
    buttonTextColor: '#EAD987',
    buttonBgColor: '#3B3310',
  },
  {
    image: '/asset/Home/3.png',
    title: 'Effortless Everyday Carry',
    subtitle: 'Versetile Backpacks for Work, Style and Everyday Use.',
    buttonText: 'Shop Now',
    buttonLink: '/technology',
    textColor: '#ffffff',
    buttonTextColor: '#EAD987',
    buttonBgColor: '#3B3310',
  },
];

const HomeSlider = () => {
  return (
    <div className="w-full md:mt-1 relative">
      {/* Navigation Buttons */}
      <div className="swiper-button-prev custom-nav z-30 w-10 h-10 rounded-full flex justify-center items-center  cursor-pointer" />
      <div className="swiper-button-next custom-nav z-30 w-10 h-10 rounded-full flex justify-center items-cente cursor-pointer" />

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"><span class='progress'></span></span>`;
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[30vh] md:h-[650px]">
              <Image
                src={slide.image}
                fill
                className="rounded-none object-cover"
                priority={index === 0}
                alt={`banner-${index}`}
              />
              {/* Overlay content */}
              <div
                className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 max-w-[80%] md:max-w-[40%]"
                style={{ color: slide.textColor }}
              >
                <h2 className="text-[18px] md:text-[36px] font-bold leading-tight">{slide.title}</h2>
                <p className="text-[14px] md:text-[18px] mt-2 md:mt-4">{slide.subtitle}</p>
                <a
                  href={slide.buttonLink}
                  className="inline-block mt-4 px-2 py-1 md:px-6 md:py-3 text-[12px] md:text-[16px] font-semibold rounded transition"
                  style={{
                    backgroundColor: slide.buttonBgColor,
                    color: slide.buttonTextColor,
                  }}
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="custom-pagination absolute bottom-6 right-6 flex justify-end gap-2 z-20"></div>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
