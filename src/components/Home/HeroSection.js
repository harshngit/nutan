import React from 'react'

const HeroSection = () => {
	return (
		<div className='relative z-0'>
			<div className="w-full absolute lg:h-screen xl:h-screen h-screen flex items-center justify-start bg-cover bg-center" style={{ backgroundImage: "url('/asset/Home/bgimg.jpg')" }}>
				<div className='flex absolute top-[20%] left-[36%] flex-col justify-center items-center w-[30%]'>
					<div className='flex flex-col justify-center gap-5 items-center'>
						<h2 className='font-bold text-center text-[52px] text-[#B88E2F]'>Discover Our New Collection</h2>
						<p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
						<button className='bg-[#B88E2F] px-[75px] py-[25px] text-white'>BUY NOW</button>
					</div>
				</div>
			</div>
		</div>

	)
}

export default HeroSection