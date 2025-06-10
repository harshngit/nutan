import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden'>
				{/* Grid Container */}
				<div className='grid grid-cols-1 lg:grid-cols-2 min-h-[500px]'>
					
					{/* Left Side - Image */}
					<div className='hidden lg:flex bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative overflow-hidden'>
						<div className='absolute inset-0 bg-black bg-opacity-20'></div>
						<img 
							src="/asset/Shop/1.webp" 
							alt="Login illustration"
							className='w-full h-full object-cover'
						/>
						{/* Overlay Content */}
						<div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12'>
							<div className='text-center'>
								<h1 className='text-4xl font-bold mb-4'>Welcome Back!</h1>
								<p className='text-lg opacity-90 max-w-md'>
									Sign in to your account 
								</p>
							</div>
						</div>
					</div>

					{/* Right Side - Login Form */}
					<div className='flex items-center justify-center p-8 lg:p-12'>
						<div className='w-full max-w-md'>
							{/* Header */}
							<div className='text-center mb-8'>
								<h2 className='text-[#000] font-semibold text-[30px] mb-3'>Login</h2>
								<p className='text-gray-400 text-center leading-relaxed'>
									Hey, Enter your details to get sign in <br className='hidden sm:block' /> 
									to your account
								</p>
							</div>

							{/* Form Fields */}
							<div className='space-y-5 mb-6'>
								<input 
									type="text" 
									className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
									placeholder='Enter Email / Phone No' 
								/>
								<input 
									type="password" 
									className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc] focus:border-primary focus:outline-none transition-colors' 
									placeholder='Enter Password' 
								/>
							</div>

							{/* Forgot Password Section */}
							<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6'>
								<p className='text-black text-sm'>Having trouble in sign in?</p>
								<Link href="/forgot-password" className='text-[#004aff] hover:underline text-sm'>
									Forget Password
								</Link>
							</div>

							{/* Sign In Button */}
							<button className='w-full bg-primary hover:bg-primary/90 transition-colors px-5 py-3 rounded-lg text-white font-medium mb-6'>
								Sign In
							</button>

							{/* Divider with Register Link */}
							<div className='flex items-center justify-center gap-4 mb-6'>
								<div className='flex-1 h-[1px] bg-gray-300'></div>
								<p className='text-gray-500 text-sm whitespace-nowrap'>
									Don't have an account? 
									<Link href='/register' className='font-bold text-primary hover:underline ml-1'>
										Register Now
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

export default LoginForm