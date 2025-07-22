'use client'
import React from 'react'

const CartOrder = ({ orderDetails }) => {
	return (
		<>
			<div className='grid grid-cols-6 mb-5 gap-2'>
				<h4>Product Image</h4>
				<h4>Product Name</h4>
				<h4>Product Quantity</h4>
				<h4>Product Size</h4>
				<h4>Product Color</h4>
				<h4>Product Price</h4>
			</div>
			<div className='h-[20vh] overflow-y-scroll scrollbar-hide'>
				{
					orderDetails?.dimensions?.map((item, index) => (
						<div className='grid grid-cols-6 gap-1'>
							<img src={item?.p_img} className='w-[50px] ' alt="" />
							<h4>{item?.p_name}</h4>
							<h4>{item?.p_qty}</h4>
							<h4>{item?.p_size}</h4>
							<div className='w-5 h-5 rounded-full' style={{ background: item?.p_color }}></div>
							<h4>{item?.p_price}</h4>
						</div>
					))
				}
			</div>
		</>
	)
}

export default CartOrder