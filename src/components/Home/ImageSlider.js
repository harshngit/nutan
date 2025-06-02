'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import img from '../../../public/asset/Home/abouthome1.png'
const slides = [
	{
		id: 1,
		img: img,
		title: '01 — Spring Sale',
		discount: '30% OFF',
	},
	{
		id: 2,
		img: img,
		title: '02 — Summer Drop',
		discount: '40% OFF',
	},
	{
		id: 3,
		img: img,
		title: '03 — Autumn Flash',
		discount: '20% OFF',
	},
	{
		id: 4,
		img: img,
		title: '04 — Winter Warmers',
		discount: '50% OFF',
	},
];

const ImageSlider = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full px-4 py-8 lg:px-12 ">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={3}
				centeredSlides={true}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				pagination={{ clickable: true }}
				navigation={true}
				breakpoints={{
					640: {
						slidesPerView: 1.2,
					},
					768: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				className="relative"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={slide.id}>
						<div
							className={`relative h-[500px] rounded-xl transition-all duration-300 ${activeIndex === index
								? 'scale-100 w-full'
								: 'scale-95 opacity-70'
								}`}
						>
							<Image
								src={slide.img}
								alt={`Slide ${index}`}
								className="w-full h-full object-cover"
							/>
							{activeIndex === index && (
								<div className="absolute bottom-6 left-6 bg-[#565449] p-4 rounded-md shadow-md z-10">
									<p className="text-xs text-white">{slide.title}</p>
									<p className="text-xl font-bold text-white">{slide.discount}</p>
								</div>
							)}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ImageSlider;
