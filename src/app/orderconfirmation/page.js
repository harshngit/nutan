'use client'
import OrderConfirmationpage from '@/components/Cart/OrderConfirmationpage'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'

import React from 'react'

const OrderConfirmation = () => {
	return (
		<div className=' font-poppins'>
			<Navbar />
			<section className="relative pt-[60px] ">
				{/* Adjust padding to avoid navbar overlap */}
				<OrderConfirmationpage />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default OrderConfirmation