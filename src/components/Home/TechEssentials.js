"use client"

import Image from "next/image"
import { IoArrowForward, IoArrowUp } from "react-icons/io5"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"


// Import Swiper styles
import "swiper/css"
import Link from "next/link"
import img1 from "../../../public/asset/browse/collection1.webp"
import img2 from "../../../public/asset/browse/collection2.webp"
import img3 from "../../../public/asset/browse/collection3.webp"
import img4 from "../../../public/asset/browse/collection4.webp"
import img5 from "../../../public/asset/browse/collection5.webp"
import img6 from "../../../public/asset/browse/collection6.webp"
import img7 from "../../../public/asset/browse/collection7.webp"
import img8 from "../../../public/asset/browse/collection8.webp"
import img10 from "../../../public/asset/browse/collection10.webp"
import img11 from "../../../public/asset/browse/collection11.png"
import img12 from "../../../public/asset/browse/collection12.png"

const TechData = [
  {
    id: "Office Supplies",
    title: "POWER BANK",
    href: "/shop",
    images: [ img11],
    hasScrollUp: false,
  },
  {
    id: "Print",
    title: "OTHERS",
    href: "/shop",
    images: [img12    ],
    hasScrollUp: true,
  },
  
]

function TechCard({ category }) {
  const handleCardClick = () => {
    console.log(`Navigate to ${category.href}}`)
  }

  // const handleScrollUp = (e) => {
  //   e.stopPropagation()
  //   window.scrollTo({ top: 0, behavior: "smooth" })
  // }

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer group">
      {/* Image Swiper - Lower z-index */}
      <div className="absolute inset-0 z-0 ">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {category.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${category.title} ${index + 1}`}
                  fill
                  className="object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Overlay - Higher z-index */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
          
          {/* Bottom Row: Title Left, Arrow Right */}
          <div className="flex items-center justify-between">
            
            {/* Title on Bottom-Left */}
            <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
              {category.title}
            </h3>

            {/* Arrow Button on Bottom-Right */}
            <Link href={category.href} passHref>
              <button className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg">
                <IoArrowForward className="w-5 h-5 text-gray-800" />
              </button>
            </Link>
            
          </div>
        </div>

    </div>
  )
}

export default function TechEssentials() {
  return (
    <section className="pb-12 md:pb-16 lg:pb-18 font-poppins bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Other Essentials</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TechData.map((category) => (
            <TechCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
