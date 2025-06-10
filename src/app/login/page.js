import LoginForm from '@/components/Login/LoginForm'
import Link from 'next/link'
import React from 'react'

const Login = () => {
	return (
		<div className="relative w-full xl:h-screen lg:h-screen h-screen flex justify-center items-center overflow-hidden">
			{/* Blurred Background Layer */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Shop/5.webp')" }}
			></div>

			{/* Foreground Content */}
			<div className="relative w-[100%]  z-10 ">
				<LoginForm />
			</div>
		</div>
	)
}

export default Login