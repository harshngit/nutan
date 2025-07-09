"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LightBox = ({ productDetails }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const images = productDetails?.productImages || [];

  return (
    <div className=" flex flex-col-reverse md:flex-row gap-8 items-start w-full">
      
      <div className="w-full relative">

        {/* Swiper Container */}
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={setSwiperRef}
          loop
          pagination={{ el: ".custom-pagination", clickable: true }}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          onClick={() => swiperRef?.slidePrev()}
          className=" text-gray-600 absolute left-2 top-1/2 transform -translate-y-1/2  p-2   z-10"
        >
          <FiChevronLeft size={30} />
        </button>

        <button
          onClick={() => swiperRef?.slideNext()}
          className="text-gray-600 absolute right-2 top-1/2 transform -translate-y-1/2  p-2s z-10"
        >
          <FiChevronRight size={30} />
        </button>

        {/* Center-Bottom Pagination */}
        <div className="custom-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"></div>

      </div>
    </div>
  );
};

export default LightBox;
