import { Button } from '@material-tailwind/react'
import React from 'react'
import CountdownTimer from './CountdownTimer'
import ImageSlider from './ImageSlider'
import SimpleSlider from './SimpleSwiper'

const Photosection = () => {
	return (
		// <div className='lg:pt-[5%] pt-[20px]  flex justify-center lg:flex-row flex-col items-center'>
		// 	<div className='lg:w-[50%] w-full relative'>
		// 		<img
		// 			src="/asset/Home/3.png"
		// 			alt="look1"
		// 			className="w-full object-cover"
		// 		/>
		// 		<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>SIGNATURE</h2>
		// 		<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
		// 	</div>
		// 	<div className='lg:w-[50%] w-full relative'>
		// 		<img
		// 			src="/asset/Home/4.png"
		// 			alt="look1"
		// 			className="w-full object-cover"
		// 		/>
		// 		<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>ARABIC</h2>
		// 		<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
		// 	</div>
		// </div>
		<div className='w-full bg-[#B88E2F38] h-auto px-10 py-10'>
			<div className='flex justify-center items-center flex-col lg:flex-row'>
				<div className='lg:w-[40%] w-full flex lg:justify-start justify-center items-center lg:items-start flex-col gap-10'>
					<div className='flex lg:justify-start justify-center items-center lg:items-start flex-col gap-10'>
						<h2 className='lg:text-[46px] text-[30px] font-normal text-[#3A3A3A]'>100+ products</h2>
						<p className='font-normal text-[#616161] text-left text-[16px]'>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
					</div>
					<div className='flex lg:justify-start justify-center items-center lg:items-start w-full'>
						<Button className='bg-[#B88E2F] !rounded-none py-[10px] font-normal px-[10px] w-[40%] text-[#fff] text-[16px]'>Buy Now</Button>
					</div>
				</div>
				<div className='lg:w-[60%] w-full gap-10 lg:block hidden'>
					<ImageSlider />
				</div>
				<div className='lg:w-[60%] w-full gap-10 block lg:hidden'>
					<SimpleSlider />
				</div>
			</div>
		</div>
	)
}

export default Photosection