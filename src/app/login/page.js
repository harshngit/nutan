"use client"

import LoginForm from '@/components/Login/LoginForm'
import { loadUser, loginUsingEmail } from "@/actions/authActions";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false)
	const dispatch = useDispatch();
	const router = useRouter();

	const { isAuthenticated, loading, error, users } = useSelector((state) => state.user || {});

	const handleLogin = async () => {
		if (!email || !password) {
			alert('Email and Password are required');
			return;
		}

		try {
			const user = await dispatch(loginUsingEmail({ email, password })).unwrap();
			console.log('User logged in:', user);
			router.push('/');
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		dispatch(loadUser()); // auto-login if session exists
	}, [dispatch]);
    console.log(isAuthenticated)

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);
    return (
        <div className="relative w-full xl:h-screen lg:h-screen h-screen flex justify-center items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
                style={{ backgroundImage: "url('/asset/Shop/5.webp')" }}
            ></div>

            <div className="relative w-[100%] z-10">
                <LoginForm
                    handleLogin={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
                    // showPassword={showPassword}
                    // setShowPassword={setShowPassword}
                />
            </div>
        </div>
    )
}

export default Login;