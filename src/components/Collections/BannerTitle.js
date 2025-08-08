import React from 'react'

const BannerTitle = ({ title, desc }) => {
	return (
		<div className='w-full flex justify-center items-center pt-4 pb-2 flex-col'>
			<h2 className='font-bold font-playfair lg:text-[62px] text-[30px]'>{title}</h2>
			<p className='lg:w-[60%] w-[80%] text-center text-[#565449] font-normal font-playfair lg:text-[16px]'>{desc}</p>
		</div>
	)
}

export default BannerTitle