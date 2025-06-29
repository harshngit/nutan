'use client'
import OrderConfirmation from '@/components/Cart/OrderConfirmation'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'

import React from 'react'

const OrderConfirmationpage = () => {
	return (
		<div className=' font-poppins'>
			<Navbar />
			<section className="relative pt-[60px] ">
				{/* Adjust padding to avoid navbar overlap */}
				<OrderConfirmation />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default OrderConfirmationpage