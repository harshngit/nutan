'use client';
import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';



export default function BannerCta() {

	return (
		<>
			<div className='w-full flex justify-center items-center px-10 py-10 flex-col'>
				<h2 className='font-normal font-playfair lg:text-[32px]'>The Art of Fewer, Better Choices</h2>
				<p className='lg:w-[50%] w-[80%] text-center font-normal font-playfair lg:text-[16px]'>Opting for quality over quantity means selecting timeless, durable, and responsibly made items. This approach simplifies our lives and fosters a deeper appreciation for our surroundings. Emphasizing longevity and responsible production resonates with a more sustainable and mindful lifestyle.</p>
			</div>
		</>
	);
}
