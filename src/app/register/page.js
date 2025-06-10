import RegisterForm from '@/components/Register/RegisterForm'
import React from 'react'

const Register = () => {
	return (
		<div className="relative w-full h-screen xl:h-screen lg:h-screen flex justify-center items-center overflow-hidden">
			{/* Blurred Background Layer */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Shop/5.webp')" }}
			></div>

			{/* Foreground Content */}
			<div className="relative w-[100%] z-10 ">
				<RegisterForm />
			</div>
		</div>
	)
}

export default Register