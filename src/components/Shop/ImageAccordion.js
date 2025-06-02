'use client';
import React, { useState } from 'react';
const panels = [
	{
		label: 'FOR HIM',
		image: '/asset/Shop/banner1.png',
	},
	{
		label: 'FOR HER',
		image: '/asset/Shop/banner2.png',
	},
	{
		label: 'ARABIC',
		image: '/asset/Shop/banner3.png',
	},
	{
		label: 'SIGNATURE',
		image: '/asset/Shop/banner4.png',
	},
];

export default function ImageAccordion() {
	const [activeIndex, setActiveIndex] = useState(null);

	return (
		<div className="w-full h-[500px] flex overflow-hidden">
			{panels.map((panel, index) => (
				<div
					key={index}
					onMouseEnter={() => setActiveIndex(index)}
					onMouseLeave={() => setActiveIndex(null)}
					className={`relative flex-1 lg:flex-row flex-col transition-all duration-500 ease-in-out cursor-pointer
            ${activeIndex === index ? 'flex-[3]' : 'flex-[1]'}
          `}
				>
					<img
						src={panel.image}
						alt={panel.label}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition duration-500"></div>
					<div className={`absolute left-5 bottom-[10%] -translate-y-1/2 rotate-[-90deg] origin-left text-white lg:text-xl text-md font-semibold tracking-widest ${activeIndex === index ? 'rotate-[0deg]' : 'rotate-[-90deg]'}`}>
						{panel.label}
					</div>
				</div>
			))}
		</div>
	);
}
