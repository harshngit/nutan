import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Whislistdetail from '@/components/Wishlist/Whislistdetail'
import React from 'react'

const Wishlist = () => {
	return (
		<div className=' font-poppins'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<Whislistdetail />
			</section>

			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Wishlist