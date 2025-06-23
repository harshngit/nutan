"use client"

import LoginForm from '@/components/Login/LoginForm'
import { loginUsingEmail } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const {
		isAuthenticated = false
	} = useSelector((state) => state.user || {})

	const router = useRouter()
	const dispatch = useDispatch()

	const handleLogin = () => {
		if (!email.trim()) {
			alert("Enter valid email")
			return
		}
		if (!password.trim()) {
			alert("Enter valid password")
			return
		}
		dispatch(loginUsingEmail({ email, password }))
	}

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/")
		}
	}, [isAuthenticated, router])

	return (
		<div className="relative w-full xl:h-screen lg:h-screen h-screen flex justify-center items-center overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Shop/5.webp')" }}
			></div>

			<div className="relative w-[100%]  z-10">
				<LoginForm
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleLogin={handleLogin}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			</div>
		</div>
	)
}

export default Login
