import CartBucket from '@/components/Cart/CartBucket'
import TrendingNow from '@/components/Cart/TrendingNow'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React from 'react'

const Cart = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<CartBucket />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<TrendingNow />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Cart