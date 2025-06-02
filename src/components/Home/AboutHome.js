import Image from 'next/image'
import React from 'react'
import img1 from '../../../public/asset/Home/abouthome1.png'
import img2 from '../../../public/asset/Home/abouthome2.png'
import img3 from '../../../public/asset/Home/abouthome1.png'
import Link from 'next/link'
import { Button } from '@material-tailwind/react'
const AboutHome = () => {
	return (
		<section className=" w-full lg:h-[120vh] xl:h-[150vh] bg-white	lg:pt-10 pt-5">
			{/* <div className="lg:block hidden absolute left-[-100px] top-[1000px] -translate-y-1/2 w-[200px] h-[200px] bg-[#D9D9D933] rounded-full"></div>

			<div className="lg:block hidden absolute right-[-100px] top-[1200px] -translate-y-1/2 w-[200px] h-[200px] bg-[#D9D9D933] rounded-full"></div>
			<div className='flex justify-center items-center flex-col lg:flex-row'>
				<div className='flex justify-center items-start lg:w-[60%] w-full flex-col'>
					<div className='flex justify-center items-center gap-8'>
						<h2 className='lg:text-[64px] text-[20px] font-normal text-[#D8D8D8]'>Change</h2>
						<div className='w-[100px] h-2 rounded-lg bg-[#D9D9D966] hidden lg:block'></div>
					</div>
					<h1 className='lg:text-[94px] text-[30px] font-normal text-[#565449]'>Your Style</h1>
				</div>
				<div className='flex justify-start items-center lg:w-[40%] w-full'>
					<p className='lg:text-right text-[#565449] font-normal lg:text-[24px] text-[15px]'>
						Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
					</p>
				</div>
			</div>
			<div className=" hidden lg:flex flex-col md:flex-row items-center justify-center relative">

				<div className="rounded-[30px] overflow-hidden absolute left-[180px] top-[50px] ">
					<Image
						src={img1}
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden absolute z-20 top-[190px] left-[450px] ">
					<Image
						src={img2}
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden absolute top-[250px]  z-10 right-[150px] ">
					<Image
						src={img3}
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div>
			<div className='lg:hidden grid grid-flow-row grid-row-3 mt-5 gap-10'>
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src={img1}
						alt="look1"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

				
				<div className="rounded-[30px] overflow-hidden">
					<Image
						src={img2}
						alt="look2"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>

			
				<div className="rounded-[30px] overflow-hidden ">
					<Image
						src={img3}
						alt="look3"
						width={400}
						height={500}
						className="w-full object-cover"
					/>
				</div>
			</div> */}
			<div className='flex flex-col  justify-center item-center px-5'>
				<div className='flex justify-center items-center'>
					<p className='font-normal font-playfair text-center text-black lg:text-[24px]'>
						Welcome to Different Clothing , where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style.
					</p>
				</div>
				<div className='flex justify-center items-center mt-5'>
					<Link href="">
						<Button className='bg-black px-5 py-5 !rounded-none !shadow-none uppercase lg:text-[24px] font-thin'>Explore More</Button>
					</Link>
				</div>
			</div>
			<div className='pt-[5%]  flex justify-center lg:flex-row flex-col items-center'>
				<div className='lg:w-[50%] w-full relative'>
					<img
						src="/asset/Home/1.png"
						alt="look1"
						className="w-full object-cover"
					/>
					<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>For Him</h2>
					<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
				</div>
				<div className='lg:w-[50%] w-full relative'>
					<img
						src="/asset/Home/2.png"
						alt="look1"
						className="w-full object-cover"
					/>
					<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>FOR HER</h2>
					<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
				</div>
			</div>
		</section>
	)
}

export default AboutHome