import React from 'react'

const Photosection = () => {
	return (
		<div className='lg:pt-[5%] pt-[20px]  flex justify-center lg:flex-row flex-col items-center'>
			<div className='lg:w-[50%] w-full relative'>
				<img
					src="/asset/Home/3.png"
					alt="look1"
					className="w-full object-cover"
				/>
				<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>SIGNATURE</h2>
				<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
			</div>
			<div className='lg:w-[50%] w-full relative'>
				<img
					src="/asset/Home/4.png"
					alt="look1"
					className="w-full object-cover"
				/>
				<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white left-[2%] bottom-3'>ARABIC</h2>
				<h2 className='font-500 font-playfair text-[18px] absolute z-10 text-white right-[2%] bottom-3'>EXPLORE</h2>
			</div>
		</div>
	)
}

export default Photosection