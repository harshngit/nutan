import { Button } from '@material-tailwind/react'
import React from 'react'
import CountdownTimer from './CountdownTimer'
import ImageSlider from './ImageSlider'
import SimpleSlider from './SimpleSwiper'
import allProducts from '@/data/ProductData'
import Link from 'next/link'
import LargeProductData from '@/data/LargeProductData'

const Deal = () => {
	const formatPrice = (price) => `Rp ${price.toLocaleString("id-ID")}`;
	return (
		<div className='bg-white w-full lg:h-auto h-auto pt-10'>

			<div className='lg:py-1 py-5 px-5 lg:px-10 flex justify-center items-center'>
				<h2 className='font-bold lg:text-[32px] text-[#3A3A3A] text-[18px]'>Our Products</h2>
			</div>
			<div className="p-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-6">
					{LargeProductData.slice(0, 8).map((product, index) => (
						<Link href={`shop/${product.id}`}>
							<div key={index} className="relative lg:w-[285px] group border rounded-lg overflow-hidden">
								<img src={product.image} alt={product.name} className="w-full" />

								{product.discount && (
									<span className="absolute w-12 h-12 flex justify-center items-center rounded-full top-2 left-2 bg-[#E97171] text-white text-[16px] px-2 py-2">
										-{product.discount}%
									</span>
								)}

								{product.isNew && (
									<span className="absolute top-2 right-2 w-12 h-12 flex justify-center items-center bg-[#2EC1AC] text-white text-sm px-2 py-1 rounded-full">
										New
									</span>
								)}

								<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
									<button className="bg-[#fff] text-[#B88E2F] px-4 py-2 font-semibold">Add to cart</button>
								</div>

								<div className="p-2 bg-[#F4F5F7]">
									<h3 className="font-semibold text-lg">{product.name}</h3>
									<p className="text-sm text-gray-500">{product.description}</p>
									<p className="text-base font-semibold text-black">
										{formatPrice(product.price)}
										{product.originalPrice && (
											<span className="text-gray-400 line-through text-sm ml-2">
												{formatPrice(product.originalPrice)}
											</span>
										)}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="mt-6 flex justify-center">
					<button className="border border-[#B88E2F] text-[#B88E2F] px-6 py-2 hover:text-black transition">
						Show More
					</button>
				</div>
			</div>
		</div>
	)
}

export default Deal