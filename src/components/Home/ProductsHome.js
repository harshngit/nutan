'use client'
import React from 'react'
import Image from 'next/image'
import blogImg from '../../../public/asset/products/1.png' // Replace with your image path

const blogData = [
	{
		id: 1,
		title: 'Blog1',
		date: 'Date',
		author: 'Owner',
		description: 'Our designer already made a lot of beautiful prototype of rooms that inspire you',
		image: blogImg,
	},
	{
		id: 2,
		title: 'Blog2',
		date: 'Date',
		author: 'Owner',
		description: 'Our designer already made a lot of beautiful prototype of rooms that inspire you',
		image: blogImg,
	},
	{
		id: 3,
		title: 'Blog3',
		date: 'Date',
		author: 'Owner',
		description: 'Our designer already made a lot of beautiful prototype of rooms that inspire you',
		image: blogImg,
	},
	{
		id: 4,
		title: 'Blog4',
		date: 'Date',
		author: 'Owner',
		description: 'Our designer already made a lot of beautiful prototype of rooms that inspire you',
		image: blogImg,
	},
]

const ProductsHome = () => {
	return (
		<div className="w-full bg-white py-10 px-5 lg:px-20">
			<div className="text-center mb-10">
				<h2 className="text-[20px] lg:text-[40px] font-bold text-[#3A3A3A]">Our Blogs</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{blogData.map((blog) => (
					<div key={blog.id} className="bg-[#F4F5F7] rounded-md overflow-hidden shadow-sm">
						<Image
							src={blog.image}
							alt={blog.title}
							className="w-full h-[200px] object-cover"
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold text-[#3A3A3A]">{blog.title}</h3>
							<div className="flex items-center text-sm text-gray-500 gap-2 my-1">
								<span className='flex justify-center items-center gap-2'><img src="/asset/blog/date.png" alt="" />{blog.date}</span>
								<span>•</span>
								<span className='flex justify-center items-center gap-2'><img src="/asset/blog/profile.png" alt="" />{blog.date}</span>
							</div>
							<p className="text-sm text-gray-600 mt-2">{blog.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductsHome
