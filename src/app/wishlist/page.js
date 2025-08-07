import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import NavbarOne from '@/components/Layout/NavbarOne'
import Whislistdetail from '@/components/Wishlist/Whislistdetail'
import React from 'react'

const Wishlist = () => {
	return (
		<div className=' font-poppins'>
			<NavbarOne />
			<section className="relative pt-[0px] pb-[50px]">
				
				<Whislistdetail />
			</section>

			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Wishlist