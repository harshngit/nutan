"use client";

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { db } from '../../app/firebase.config'; // Adjust path as needed
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';
import LoadingScreen from '../Loader/LoaderScreen';

// Fallback slides in case no banners are available
const fallbackSlides = [
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
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, try to get all banners and log them for debugging
    const allBannersQuery = collection(db, 'banners');
    
    const unsubscribe = onSnapshot(allBannersQuery, (snapshot) => {
      console.log('Total banners in database:', snapshot.docs.length);
      
      const allBanners = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('Banner data:', { id: doc.id, status: data.status, title: data.title });
        return { id: doc.id, ...data };
      });
      
      // Filter for published banners
      const publishedBanners = allBanners.filter(banner => banner.status === 'published');
      console.log('Published banners:', publishedBanners.length);
      
      const bannerList = publishedBanners.map((data) => {
        return {
          id: data.id,
          image: data.imageUrl,
          title: data.title || 'Welcome',
          subtitle: data.subtitle || 'Discover our amazing products',
          buttonText: 'Shop Now',
          buttonLink: '/shop',
          textColor: '#ffffff',
          buttonTextColor: '#EAD987',
          buttonBgColor: '#3B3310',
        };
      });
      
      console.log('Final banner list for slider:', bannerList);
      setBanners(bannerList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching banners:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Use Firebase banners if available, otherwise use fallback
  const slides = banners.length > 0 ? banners : fallbackSlides;

// Loading screen
  if (loading) {
    return <LoadingScreen />;
  }  

  console.log('Rendering with slides:', slides.length, slides);

  return (
    <div className="w-full relative">
      {/* Navigation Buttons */}
      <div className="swiper-button-prev custom-nav z-30 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" />
      <div className="swiper-button-next custom-nav z-30 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" />

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={slides.length > 1} // Only enable loop if there are multiple slides
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
          <SwiperSlide key={slide.id || index}>
            <div className="relative w-full h-[30vh] md:h-[650px]">
              <Image
                src={slide.image}
                fill
                className="rounded-none object-cover"
                priority={index === 0}
                alt={slide.title || `banner-${index}`}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = '/asset/Home/0.png';
                }}
              />
              {/* Overlay content */}
              <div
                className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 max-w-[80%] md:max-w-[40%]"
                style={{ color: slide.textColor }}
              >
                <h2 className="text-[18px] md:text-[36px] font-bold leading-tight">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-[14px] md:text-[18px] mt-2 md:mt-4">
                    {slide.subtitle}
                  </p>
                )}
                <a
                  href={slide.buttonLink}
                  className="inline-block mt-4 px-2 py-1 md:px-6 md:py-3 text-[12px] md:text-[16px] font-semibold rounded transition hover:opacity-90"
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