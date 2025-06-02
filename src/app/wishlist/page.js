import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BannerCta from '@/components/Shop/BannerCta'
import Whislistdetail from '@/components/Wishlist/Whislistdetail'
import React from 'react'

const Wishlist = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<Whislistdetail />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<BannerCta />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Wishlist