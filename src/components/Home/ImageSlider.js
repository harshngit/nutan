'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const slides = [
	{
		id: 1,
		img: "/asset/slider/1.png",
		subtitle: '01 — Spring Sale',
		title: 'Inner Peace',
	},
	{
		id: 2,
		img: "/asset/slider/2.png",
		subtitle: '02 — Summer Drop',
		title: 'Inner Peace',
	},
	{
		id: 3,
		img: "/asset/slider/1.png",
		subtitle: '03 — Autumn Flash',
		title: 'Inner Peace',
	},
	{
		id: 4,
		img: "/asset/slider/2.png",
		subtitle: '04 — Winter Warmers',
		title: 'Inner Peace',
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
								: 'scale-75  opacity-70'
								}`}
						>
							<img
								src={slide.img}
								alt={`Slide ${index}`}
								className="w-full h-full object-cover"
							/>
							{activeIndex === index && (
								<div className='absolute bottom-6 left-6 z-10 flex'>
									<div className=" bg-[#FFFFFFB8] backdrop-blur-sm p-4">
										<p className="text-xs text-[#3A3A3A]">{slide.subtitle}</p>
										<p className="text-xl font-bold text-[#3A3A3A]">{slide.title}</p>
									</div>
									<div className='absolute bottom-0 -right-[32%]'>
										<img className='w-[48px] h-[48px]' src="/asset/CTA.png" alt="" />
									</div>
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
