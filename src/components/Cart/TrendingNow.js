import allProducts from '@/data/ProductData'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const TrendingNow = () => {
	return (
		<div className='w-full  '>
			<div className='flex justify-between items-center lg:px-5 px-5 py-5 lg:py-5'>
				<div className='flex justify-start items-center gap-5'>
					<h2 className='font-normal lg:text-[32px] text-[22px] text-[#484848]'> Trending Now  </h2>
				</div>
				<div>
					<Link href="/shop"><h3 className='font-bold text-[20px]'>EXPLORE MORE</h3></Link>
				</div>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] mb-10">
				{allProducts.slice(0, 4).map((product) => (
					<div key={product.id} className="bg-white overflow-hidden group">
						<div className="relative">
							{/* Primary Image */}
							<img
								src={product.image}
								alt={product.title}
								className="w-full lg:h-[408px] h-[200px] object-cover transition-opacity duration-300 group-hover:opacity-0"
							/>
							{/* Hover Image */}
							<img
								src={product.hoverImage}
								alt={`${product.title} hover`}
								className="w-full lg:h-[408px] h-[200px] object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>
						</div>

						{/* Product Info */}
						<div className="p-3 flex justify-between items-start">
							<div className='flex flex-col gap-2 justify-start items-start'>
								<div>
									<Link href={`shop/${product.id}`}>
										<h3 className="text-sm font-semibold">{product.title}</h3>
									</Link>
									<p className="text-gray-700 font-bold">{product.price}</p>
								</div>
								<div className="flex justify-center items-center gap-2">
									<div className="w-5 h-5 rounded-full bg-[#836953] border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-black border border-black"></div>
									<div className="w-5 h-5 rounded-full bg-white border border-black"></div>
								</div>
							</div>
							<button>
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

export default TrendingNow