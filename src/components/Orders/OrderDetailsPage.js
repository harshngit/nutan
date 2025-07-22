'use client'
import React from 'react'
import DetailsOrder from './DetailOrder'
import CartOrder from './CartOrder'


const OrderDetailsPage = ({ orderDetails }) => {
	return (
		<div className='grid lg:grid-cols-2 gap-[50px] grid-cols-1 lg:px-10 px-5 lg:py-10 py-5'>
			<div className='border-[2px] px-5 py-5 rounded-lg border-[#000]'>
				<DetailsOrder orderDetails={orderDetails} />
			</div>
			<div className='border-[2px] px-5 py-5 rounded-lg border-[#000]'>
				<CartOrder orderDetails={orderDetails} />
			</div>
		</div>
	)
}

export default OrderDetailsPage