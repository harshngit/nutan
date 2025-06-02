'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import img from '../../../public/asset/Home/abouthome1.png';

const simpleSlides = [
	{ id: 1, img: img, title: 'Slide One' },
	{ id: 2, img: img, title: 'Slide Two' },
	{ id: 3, img: img, title: 'Slide Three' },
	{ id: 4, img: img, title: 'Slide Four' },
];

const SimpleSlider = () => {
	return (
		<div className="w-full px-4 py-10">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
			>
				{simpleSlides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="rounded-xl overflow-hidden shadow-md relative h-[400px]">
							<Image
								src={slide.img}
								alt={slide.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded shadow">
								<p className="text-sm font-semibold text-gray-700">{slide.title}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SimpleSlider;
