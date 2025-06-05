import React from 'react'
import LightBox from './LightBox'
import Details from './Details'
import { IoChevronForward } from 'react-icons/io5'
import Link from 'next/link'

const ProductDetail = () => {
	return (
		<>
			<div className="bg-[#F9F1E7] py-[10px]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex items-center space-x-2 text-sm">
						<Link 
							href="/" 
							className=" text-gray-500 hover:text-gray-700 transition-colors duration-200"
						>
							Home
						</Link>
						
						<IoChevronForward className="w-4 h-4 text-gray-400" />
						
						<Link 
							href="/shop" 
							className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
						>
							Shop
						</Link>
						
						<IoChevronForward className="w-4 h-4 text-gray-400" />
						
						<span className="text-gray-900 font-medium py-8 border-l-2">
							Asgaard sofa
						</span>
					</nav>
				</div>
			</div>

			<div className='px-5 py-5'>
				<div className='grid lg:grid-cols-2 grid-cols-1'>
					{/* lightbox */}
					<div>
						<LightBox />
					</div>
					<div>
						<Details />
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductDetail