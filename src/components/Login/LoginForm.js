import Link from 'next/link'
import React from 'react'
import { Input } from '@material-tailwind/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, showPassword, setShowPassword }) => {
    return (
        <div className='flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl bg-white rounded-2xl shadow-2xl h-[500px] lg:overflow-hidden overflow-y-scroll'>
                <div className='grid grid-cols-1 lg:grid-cols-2 min-h-[400px]'>

                    {/* Left Side Image */}
                    <div className='hidden lg:flex bg-gradient-to-br from-green-500 via-blue-600 to-purple-500 relative overflow-hidden'>
                        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                        <img src="/asset/Shop/1.webp" alt="Login illustration" className='w-full h-full object-cover' />
                        <div className='absolute inset-0 flex flex-col justify-center items-center text-white p-12'>
                            <div className='text-center'>
                                <h1 className='text-4xl font-bold mb-4'>Welcome Back!</h1>
                                <p className='text-lg opacity-90 max-w-md'>
                                    Login to your account and continue exploring our amazing services.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className='flex items-center justify-center p-6 lg:p-8'>
                        <div className='w-full max-w-md'>

                            {/* Header */}
                            <div className='mb-8'>
                                <h2 className='text-[#000] font-semibold text-[28px] mb-3'>Login</h2>
                                <p className='text-gray-400 text-sm'>Enter your credentials to access your account</p>
                            </div>

                            {/* Form Fields */}
                            <div className='space-y-5'>

                                {/* Email */}
                                <div className='w-full'>
                                    <label className='block text-[15px] text-gray-700 mb-2 font-medium'>Email</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className='w-full py-3 px-4 rounded-md border-[2px] border-[#ccc]' 
                                        placeholder='Enter Email' 
                                    />
                                </div>

                                {/* Password */}
                                <div className='w-full'>
                                    <label className='block text-[15px] text-gray-700 mb-2 font-medium'>Password</label>
                                    <div className="relative">
                                        <Input
                                            label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            className="pr-20"
                                            containerProps={{ className: "min-w-0" }}
                                        />
                                        <button
                                            disabled={!password}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3"
                                        >
                                            {showPassword ? <FaRegEye className='w-[18px] text-blue-500' /> : <FaRegEyeSlash className='w-[18px] text-blue-500' />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button type="button" onClick={handleLogin}
                                className='mt-6 w-full bg-primary hover:bg-primary/90 transition-all duration-200 ease-linear px-5 py-3 rounded-lg text-white font-medium'

                            >
                                Login
                            </button>

                            {/* Register link */}
                            <div className='flex items-center justify-center gap-4 my-6'>
                                <div className='flex-1 h-[1px] bg-gray-300'></div>
                                <p className='text-gray-500 text-sm whitespace-nowrap'>
                                    Don&apos;t have an account? 
                                    <Link href='/register' className='font-bold text-primary hover:underline ml-1'>Register</Link>
                                </p>
                                <div className='flex-1 h-[1px] bg-gray-300'></div>
                            </div>

                            {/* Go back */}
                            <div className='text-center'>
                                <Link href="/" className='text-primary hover:underline text-sm'>← Go back</Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginForm