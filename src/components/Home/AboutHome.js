import Image from 'next/image'
import React from 'react'
import img1 from '../../../public/asset/Home/abouthome1.png'
import img2 from '../../../public/asset/Home/abouthome2.png'
import img3 from '../../../public/asset/Home/abouthome1.png'
import Link from 'next/link'
import { Button } from '@material-tailwind/react'
const AboutHome = () => {
	return (
		<section className=" w-full  bg-white	lg:px-10 lg:py-10 px-5 py-5">
			<div className='flex justify-center flex-col items-center'>
				<h2 className='font-bold text-black text-[32px]'>Browse The Range</h2>
				<p className='font-light text-[#9d9898] text-[20px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</div>
			<div className='grid lg:grid-cols-3 mt-10 grid-cols-1 justify-center items-center gap-[30px]'>
				<div className='flex flex-col gap-[20px] justify-center items-center'>
					<img className='rounded-lg' src={img1} alt="" />
					<h3 className='text-black font-semibold text-[24px]'>Office Supplies</h3>
				</div>
				<div className='flex flex-col gap-[20px] justify-center items-center'>
					<img className='rounded-lg' src={img2} alt="" />
					<h3 className='text-black font-semibold text-[24px]'>Print</h3>
				</div>
				<div className='flex flex-col gap-[20px] justify-center items-center'>
					<img className='rounded-lg' src={img3} alt="" />
					<h3 className='text-black font-semibold text-[24px]'>Bedroom</h3>
				</div>
			</div>
		</section>
	)
}

export default AboutHome