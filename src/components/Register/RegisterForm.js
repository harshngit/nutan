import Link from 'next/link'
import React from 'react'

const RegisterForm = () => {
	return (
		<div className='bg-white border-[2px] border-primary px-5 py-5 rounded-lg lg:w-[30%] w-[80%] flex justify-start items-end flex-col'>
			<div className='flex justify-center items-start flex-col w-[100%] gap-5'>
				<h2 className='text-[#000] font-semibold text-[30px]'>Create an Account</h2>
				{/* <p className='text-gray-400 text-center'>Hey, Enter your details to get sign in <br /> to your account</p> */}
			</div>
			<div className='flex justify-start items-start w-[100%] mt-8 gap-5'>
				<div className='w-full flex flex-col justify-center items-start gap-2'>
					<label htmlFor="" className='text-[15px]'>Name</label>
					<input type="text" className='w-full py-2 px-2 rounded-md border-[2px] border-[#ccc]' placeholder='Enter Name' />
				</div>
			</div>
			<div className='flex justify-start items-start w-[100%] mt-5 gap-5'>
				<div className='w-1/2 flex flex-col justify-center items-start gap-2'>
					<label htmlFor="" className='text-[15px]'>Email</label>
					<input type="text" className='w-full py-2 px-2 rounded-md border-[2px] border-[#ccc]' placeholder='Enter Email' />
				</div>
				<div className='w-1/2 flex flex-col justify-center items-start gap-2'>
					<label htmlFor="" className='text-[15px]'>Phone No</label>
					<input type="number" className='w-full py-2 px-2 rounded-md border-[2px] border-[#ccc]' placeholder='Enter Phone Number' />
				</div>
			</div>
			<div className='flex justify-start items-start w-[100%] mt-5 gap-5'>
				<div className='w-1/2 flex flex-col justify-center items-start gap-2'>
					<label htmlFor="" className='text-[15px]'>Password</label>
					<input type="password" className='w-full py-2 px-2 rounded-md border-[2px] border-[#ccc]' placeholder='Enter Password' />
				</div>
				<div className='w-1/2 flex flex-col justify-center items-start gap-2'>
					<label htmlFor="" className='text-[15px]'>Confirm Password</label>
					<input type="password" className='w-full py-2 px-2 rounded-md border-[2px] border-[#ccc]' placeholder='Enter Confirm Password' />
				</div>
			</div>

			{/* <div className='flex justify-between items-start  w-[100%] mt-8 gap-5'>
				<p className='text-black'>Having trouble in sign in?</p>
				<Link href="">
					<p className='text-[#004aff]'>Forget Password</p>
				</Link>
			</div> */}
			<div className='w-full flex justify-center items-center mt-5 bg-primary px-5 py-2 rounded-lg text-white cursor-pointer hover:bg-[#fff] hover:border-2 hover:border-primary hover:text-primary transition-all duration-200 ease-linear '>
				<button className='text-center'>Sign In</button>
			</div>
			<div className='w-full flex justify-center items-center mt-5 px-5 py-2 rounded-lg text-black gap-5'>
				<div className='bg-black w-10 h-[0.5px]'></div>
				<h4 className='text-center text-[12px]'>Already have an account ? <Link href='/login' className='font-bold'>Login</Link></h4>
				<div className='bg-black w-10 h-[0.5px]'></div>
			</div>
			<Link href="/">
				<div className='flex justify-center items-end mt-5  px-5 py-2 rounded-lg cursor-pointer '>
					<p className='text-center text-primary text-[12px]'>Go back</p>
				</div>
			</Link>
		</div>
	)
}

export default RegisterForm