// components/CollectionSlider.js
"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const collections = [
  { name: "Mac", image: "/asset/collections/1.png", href: "/collections/mac" },
  { name: "iPhone", image: "/asset/collections/2.png", href: "/collections/iphone" },
  { name: "iPad", image: "/asset/collections/3.png", href: "/collections/ipad" },
  { name: "Apple Watch", image: "/asset/collections/5.png", href: "/collections/apple-watch" },
  { name: "AirPods", image: "/asset/collections/4.png", href: "/collections/airpods" },
  { name: "AirTag", image: "/asset/collections/6.png", href: "/collections/airtag" },
  { name: "HomePod", image: "/asset/collections/8.png", href: "/collections/homepod" },
  { name: "Accessories", image: "/asset/collections/9.png", href: "/collections/accessories" },
];

export default function CollectionSlider() {
  return (
    <div className="w-full px-4 py-12">
      <h2 className="text-center text-3xl md:text-5xl font-bold text-gray-600 mb-12">
        Newest Collection Available
      </h2>

      {/* Show Swiper on mobile only */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={2.5}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {collections.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={item.href}>
                <div className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full max-w-[80px] object-contain mb-2"
                  />
                  <span className="text-sm font-semibold text-black text-center">{item.name}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !text-black" />
          <div className="swiper-button-next !text-black" />
        </Swiper>
      </div>

      {/* Static grid layout on desktop */}
      <div className="hidden lg:flex flex-wrap justify-center gap-8">
        {collections.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
              <img
                src={item.image}
                alt={item.name}
                className="w-full max-w-[130px] object-contain mb-2"
              />
              <span className="text-base font-semibold text-black text-center">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
