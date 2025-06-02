import BannerFH from '@/components/Forhim/BannerFH'
import ProductGridFH from '@/components/Forhim/ProductGridFH'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import ProductGrid from '@/components/Shop/ProductsGrid'
import React from 'react'

const ForHim = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<BannerFH />
			</section>
			<section className="relative">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductGridFH />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default ForHim