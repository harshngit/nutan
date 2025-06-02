"use client"
import React from 'react'
import { IoMdArrowRoundUp } from 'react-icons/io'
import { PiLinkedinLogo } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";
import { PiYoutubeLogo } from "react-icons/pi";
import Link from "next/link"
import Image from 'next/image';
const Footer = () => {
    return (
        // <div className='flex flex-col w-full bg-[#D9D9D9]'>
        //     <div className='flex p-6 justify-between  items-center lg:flex-row flex-col gap-10 '>
        //         <div className=''>
        //             <h2 className='lg:text-[32px] text-[20px] text-[#484848]'>Different Clothing</h2>
        //         </div>
        //         <div className='flex justify-between lg:gap-[60px] items-center lg:flex-row flex-col'>
        //             <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
        //                 Home
        //             </Link>
        //             <Link className='lg:text-[26px] text-[#8A8A8A]' href="/shop">
        //                 Shop
        //             </Link>
        //             <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
        //                 About
        //             </Link>

        //             <Link className='lg:text-[26px] text-[#8A8A8A]' href="/">
        //                 Contact Us
        //             </Link>
        //         </div>
        //     </div>
        //     <div className='text-[#8A8A8A] text-[12px] text-center p-5'>
        //         <p>Copyright © 2022 Diff Clothing . All Rights Reseved.</p>
        //     </div>
        // </div>
        <>
            <footer className="bg-[#000] text-white px-10 w-full py-10 overflow-hidden font-alike">
                <div className='grid lg:grid-cols-4 grid-cols-1'>

                    {/* Column 1 */}
                    <div className="flex justify-start gap-5 items-start flex-col">
                        <h4 className='lg:text-[10px] font-normal uppercase'>Contact Us </h4>
                        <ul className="space-y-2 lg:text-[12px] text-[10px]">
                            <li>
                                +1 (844) 326-6000
                            </li>
                            <li>Email Us</li>
                            <li>Mon-Fri 9am-3pm PT</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className='flex justify-start gap-5 items-start flex-col'>
                        <h4 className='lg:text-[10px] font-normal uppercase'>Customers</h4>
                        <div className="space-y-2 font-thin lg:text-[12px] text-[10px]">
                            <p>Start a Return</p>
                            <p>Return Policy</p>
                            <p>FAQ</p>
                            <p>Catalogs and Mailers</p>
                            <p>About Group Gifting</p>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex items-start flex-col gap-[30px] ">
                        <h4 className='lg:text-[10px] font-normal uppercase'>Company</h4>
                        <div className="space-y-2 font-thin lg:text-[12px] text-[10px]">
                            <p>About Us</p>
                            <p>Sustainability</p>
                            <p>Discover Revive</p>
                            <p>Careers</p>
                            <p>Privacy Policy</p>
                            <p>Terms</p>
                        </div>
                    </div>
                    {/* Column 4 */}
                    <div className="flex items-start flex-col gap-[30px] ">
                        <h4 className='lg:text-[15px] text-[10px] font-normal'>Get the latest new from us</h4>
                        <input type="text" placeholder='Enter your email address' className='px-5 py-5 bg-transparent border-[2px] border-white w-full' />
                        <p className='text-[12px] font-normal'>By signing up, you agree to our Privacy Policy and Terms of Service.</p>
                        <button className='px-3 py-3 w-[40%] text-black bg-white'>Subscribe</button>
                    </div>
                    {/* Vertical Text on Right */}

                </div>
                <div className="lg:w-[80%] w-full ">
                    <h1 className='font-normal lg:text-[95px] text-[31px] mt-5'>DIFFERENT CLOTHING</h1>
                </div>
            </footer>
        </>
    )
}

export default Footer