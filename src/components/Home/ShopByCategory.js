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

const categoriesData = [
  {
    id: "Office Supplies",
    title: "TECHNOLOGY",
    href: "/technology",
    images: [img10,],
    hasScrollUp: false,
  },
  {
    id: "Print",
    title: "OFFICE SUPPLIES",
    href: "/office",
    images: [img1],
    hasScrollUp: true,
  },
  {
    id: "Bedroom",
    title: "GIFTS",
    href: "/giftsets",
    images: [ img8   ],
    hasScrollUp: false,
  },
]

function CategoryCard({ category }) {
  const handleCardClick = () => {
    console.log(`Navigate to ${category.href}}`)
  }

  // const handleScrollUp = (e) => {
  //   e.stopPropagation()
  //   window.scrollTo({ top: 0, behavior: "smooth" })
  // }

  return (
    <div className="relative h-[350px] md:h-[600px] rounded-2xl overflow-hidden cursor-pointer group ">
        <Link href={category.href} passHref>
      {/* Image Swiper - Lower z-index */}
      <div className="absolute inset-0 z-0 ">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: true,
          // }}
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
            
              <button className="lg:w-12 w-8 lg:h-12 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg">
                <IoArrowForward className="w-5 h-5 text-gray-800" />
              </button>
          
            
          </div>
        </div>
    </Link>
    </div>
  )
}

export default function ShopByCategory() {
  return (
    <section className="py-12 md:py-16 lg:py-20 font-poppins bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Browse The Range</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
