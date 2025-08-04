'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade  } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


const LightBox = ({ productDetails, selectedVariation }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const baseImages = productDetails?.productImages || [];
  const selectedImg = selectedVariation?.img;

  // ✅ Show variation image first, then rest of the base images
  const images =
    selectedImg && selectedImg.trim() !== ''
      ? [selectedImg, ...baseImages.filter(img => img !== selectedImg)]
      : baseImages;

  // ✅ Reset slider to first slide when selectedVariation changes
  useEffect(() => {
    if (swiperRef && selectedVariation) {
      swiperRef.slideTo(0, 300); // Slide to first slide with 300ms animation
    }
  }, [selectedVariation, swiperRef]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 items-start w-full">
      <div className="w-full relative">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          onSwiper={setSwiperRef}
          effect="fade"
           fadeEffect={{ crossFade: true }} // ✅ optional smooth transition
          loop
          pagination={{ el: '.custom-pagination', clickable: true }}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[600px] object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef?.slidePrev()}
          className="text-gray-600 absolute left-2 top-1/2 transform -translate-y-1/2 p-2 z-10"
        >
          <FiChevronLeft size={30} />
        </button>
        <button
          onClick={() => swiperRef?.slideNext()}
          className="text-gray-600 absolute right-2 top-1/2 transform -translate-y-1/2 p-2 z-10"
        >
          <FiChevronRight size={30} />
        </button>

        {/* <div className="custom-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"></div> */}
      </div>
    </div>
  );
};

export default LightBox;