'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import img1 from '../../../public/asset/Home/collection1.png'
import img2 from '../../../public/asset/Home/collection2.png'
import img3 from '../../../public/asset/Home/collection3.png'
import img4 from '../../../public/asset/Home/collection4.png'
import img5 from '../../../public/asset/Home/collection5.png'

const simpleSlides = [
	{ id: 1, img: img1, title: 'Slide One' },
	{ id: 2, img: img2, title: 'Slide Two' },
	{ id: 3, img: img3, title: 'Slide Three' },
	{ id: 4, img: img4, title: 'Slide Four' },
	{ id: 5, img: img5, title: 'Slide Five' },
]

const SwiperMob = () => {
	return (
		<div className="w-full px-4 py-10">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				autoplay={{
					delay: 1000,
					disableOnInteraction: false,
				}}
				pagination={{ clickable: true }}
			>
				{simpleSlides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="rounded-xl overflow-hidden shadow-md relative h-[400px]">
							<Image
								src={slide.img}
								alt={slide.title}
								className="w-full h-full object-cover"
								priority
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default SwiperMob
