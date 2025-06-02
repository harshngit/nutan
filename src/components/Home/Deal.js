import { Button } from '@material-tailwind/react'
import React from 'react'
import CountdownTimer from './CountdownTimer'
import ImageSlider from './ImageSlider'
import SimpleSlider from './SimpleSwiper'
import allProducts from '@/data/ProductData'
import Link from 'next/link'

const Deal = () => {
	return (
		<div className='bg-white w-full lg:h-screen h-auto pt-10'>
			{/* <div className='flex justify-start items-start flex-col lg:flex-row'>
				<div className='lg:w-[40%] w-full flex justify-start items-start flex-col gap-10'>
					<div className='flex flex-col gap-10'>
						<h2 className='lg:text-[46px] text-[30px] font-normal text-[#484848]'>Deals Of The Month</h2>
						<p className='font-normal text-[#8A8A8A] text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
					</div>
					<div className='flex justify-start items-start w-full'>
						<Button className='py-[15px] px-[20px] w-[50%] shadow-[#000] shadow-sm text-[16px]'>Buy Now</Button>
					</div>
					<div className='flex justify-start items-start flex-col gap-10'>
						<h2 className='lg:text-[28px] text-[18px] font-normal'>Hurry, Before It’s Too Late!</h2>
						<CountdownTimer />
					</div>
				</div>
				<div className='lg:w-[60%] w-full gap-10 lg:block hidden'>
					<ImageSlider />
				</div>
				<div className='lg:w-[60%] w-full gap-10 block lg:hidden'>
					<SimpleSlider />
				</div>
			</div> */}
			<div className='lg:py-14 py-5 px-5 lg:px-10 flex justify-between items-center'>
				<h2 className='font-normal font-playfair lg:text-[32px] text-[18px]'>TRENDING NOW</h2>
				<Link href="/shop" className='font-normal font-playfair lg:text-[25px] text-[15px]'>EXPLORE MORE</Link>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-4">
				{allProducts.slice(0, 4).map((product) => (
					<div key={product.id} className="bg-white overflow-hidden shadow-sm group">
						<div className="relative">
							{/* Product Image (Hover effect) */}
							<img
								src={product.image}
								alt={product.title}
								className="w-full lg:h-[408px] h-[200px] object-cover transition-opacity duration-300 group-hover:opacity-0"
							/>
							{/* <video autoPlay playsInline loop muted className="w-full">
								<source src="/asset/Shop/NormalT-shirt.mp4" type="video/mp4" />
							</video> */}
							<img
								src={product.hoverImage} // 👈 Secondary image on hover (add this key in your product object)
								alt={`${product.title} hover`}
								className="w-full lg:h-[408px] h-[200px] object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>

							{/* Heart Icon */}
							{/* <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-gray-800"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.435 6.577a5.377 5.377 0 00-7.6 0L12 8.412l-1.835-1.835a5.377 5.377 0 00-7.6 7.6l1.835 1.835L12 21.435l7.6-7.6 1.835-1.835a5.377 5.377 0 000-7.6z"
									/>
								</svg>
							</button> */}
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-start">
							<div className='flex flex-col gap-2 justify-start items-start'>
								<div>
									<Link href={`shop/${product.id}`}><h3 className="text-sm font-semibold">{product.title}</h3></Link>
									<p className="text-gray-700 font-bold">{product.price}</p>
								</div>
								<div className="flex justify-center items-center gap-2">
									<div className="w-5 h-5 rounded-full bg-[#836953] border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-black border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-white border border-black"></div>
								</div>
							</div>
							<button className="">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-gray-800"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21.435 6.577a5.377 5.377 0 00-7.6 0L12 8.412l-1.835-1.835a5.377 5.377 0 00-7.6 7.6l1.835 1.835L12 21.435l7.6-7.6 1.835-1.835a5.377 5.377 0 000-7.6z"
									/>
								</svg>
							</button>
						</div>
					</div>

				))}
			</div>
		</div>
	)
}

export default Deal