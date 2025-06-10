import Link from 'next/link'
import React from 'react'

const RegisterForm = () => {
	return (
		<div className='flex items-center justify-center p-4 '>
			<div className='w-full max-w-4xl lg:max-w-5xl bg-white rounded-2xl shadow-2xl h-[600px] lg:h[700px] lg:overflow-hidden  overflow-y-scroll'>
				{/* Grid Container */}
				<div className='grid grid-cols-1 lg:grid-cols-2 min-h-[400px]'>
					
					{/* Left Side - Image */}
					<div className='hidden lg:flex bg-gradient-to-br from-green-500 via-blue-600 to-purple-500 relative overflow-hidden'>
						<div className='absolute inset-0 bg-black bg-opacity-20'></div>
						<img 
							src="/asset/Shop/1.webp" 
							alt="Register illustration"
							className='w-full h-full object-cover'
						/>
						{/* Overlay Content */}
						<div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12'>
							<div className='text-center'>
								<h1 className='text-4xl font-bold mb-4'>Join Us Today!</h1>
								<p className='text-lg opacity-90 max-w-md'>
									Create your account and become part of our amazing community. Start your journey with us.
								</p>
							</div>
						</div>
					</div>

					{/* Right Side - Register Form */}
					<div className='flex items-center justify-center p-6 lg:p-8'>
						<div className='w-full max-w-md'>
							{/* Header */}
							<div className='mb-8'>
								<h2 className='text-[#000] font-semibold text-[28px] mb-3'>Create an Account</h2>
								<p className='text-gray-400 text-sm'>
									Fill in the details below to create your new account
								</p>
							</div>

							{/* Form Fields */}
							<div className='space-y-5'>
								{/* Full Name */}
								<div className='w-full'>
									<label htmlFor="name" className='block text-[15px] text-gray-700 mb-2 font-medium'>
										Name
									</label>
									<input 
										id="name"
										type="text" 
										className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
										placeholder='Enter Name' 
									/>
								</div>

								{/* Email and Phone Row */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<label htmlFor="email" className='block text-[15px] text-gray-700 mb-2 font-medium'>
											Email
										</label>
										<input 
											id="email"
											type="email" 
											className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
											placeholder='Enter Email' 
										/>
									</div>
									<div>
										<label htmlFor="phone" className='block text-[15px] text-gray-700 mb-2 font-medium'>
											Phone No
										</label>
										<input 
											id="phone"
											type="tel" 
											className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
											placeholder='Enter Phone Number' 
										/>
									</div>
								</div>

								{/* Password and Confirm Password Row */}
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<label htmlFor="password" className='block text-[15px] text-gray-700 mb-2 font-medium'>
											Password
										</label>
										<input 
											id="password"
											type="password" 
											className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
											placeholder='Enter Password' 
										/>
									</div>
									<div>
										<label htmlFor="confirmPassword" className='block text-[15px] text-gray-700 mb-2 font-medium'>
											Confirm Password
										</label>
										<input 
											id="confirmPassword"
											type="password" 
											className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
											placeholder='Enter Confirm Password' 
										/>
									</div>
								</div>
							</div>

							{/* Terms and Conditions (Optional) */}
							<div className='mt-6 mb-6'>
								<label className='flex items-start gap-3'>
									<input 
										type="checkbox" 
										className='mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
									/>
									<span className='text-sm text-gray-600'>
										I agree to the{' '}
										<Link href="/terms" className='text-primary hover:underline'>
											Terms of Service
										</Link>{' '}
										and{' '}
										<Link href="/privacy" className='text-primary hover:underline'>
											Privacy Policy
										</Link>
									</span>
								</label>
							</div>

							{/* Register Button */}
							<button className='w-full bg-primary hover:bg-primary/90 hover:border-2 hover:border-primary transition-all duration-200 ease-linear px-5 py-3 rounded-lg text-white font-medium mb-6'>
								Create Account
							</button>

							{/* Divider with Login Link */}
							<div className='flex items-center justify-center gap-4 mb-6'>
								<div className='flex-1 h-[1px] bg-gray-300'></div>
								<p className='text-gray-500 text-sm whitespace-nowrap'>
									Already have an account? 
									<Link href='/login' className='font-bold text-primary hover:underline ml-1'>
										Login
									</Link>
								</p>
								<div className='flex-1 h-[1px] bg-gray-300'></div>
							</div>

							{/* Go back link */}
							<div className='text-center'>
								<Link href="/" className='text-primary hover:underline text-sm'>
									← Go back
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm