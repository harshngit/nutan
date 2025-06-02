import { Button } from '@material-tailwind/react'
import React from 'react'

const CTA = () => {
	return (
		<div className='lg:py-10 lg:px-20 py-5 px-5 bg-[#D9D9D9] flex justify-center flex-col items-center'>
			<h1 className='lg:text-[46px] text-[20px] text-[#484848] font-normal'>Subscribe To Our Newsletter</h1>
			<p className='text-[16px] lg:w-[50%] text-center text-[#8A8A8A]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
			<input type="text" placeholder='michael@ymail.com' className='lg:w-[30%] p-5 mt-5 shadow-lg' />
			<Button className='py-[15px] px-[20px] lg:w-[20%] mt-5 shadow-[#000] shadow-sm text-[16px]'>Subscribe Now</Button>
		</div>
	)
}

export default CTA