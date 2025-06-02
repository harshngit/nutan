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
            <footer className="bg-[#fff] border-t-[1px] border-[#ccc] text-black px-14 w-full py-14 overflow-hidden">
                <div className='grid lg:grid-cols-4 grid-cols-1'>

                    {/* Column 1 */}
                    <div className="flex justify-start gap-5 items-start flex-col">
                        <h4 className='lg:text-[24px] font-bold'>Funiro.</h4>
                        <p className='lg:text-[16px] text-[#9F9F9F] w-[60%] font-light'>400 University Drive Suite 200 Coral Gables,
                            FL 33134 USA</p>
                    </div>

                    {/* Column 2 */}
                    <div className='flex justify-start gap-5 items-start flex-col'>
                        <h4 className='lg:text-[12px] font-normal text-[#9F9F9F] uppercase'>Links</h4>
                        <div className="flex flex-col justify-start gap-5 font-normal">
                            <Link href="" className='text-black text-[16px]'>
                                Home
                            </Link>
                            <Link href="" className='text-black text-[16px]'>
                                Shop
                            </Link>
                            <Link href="" className='text-black text-[16px]'>
                                About
                            </Link>
                            <Link href="" className='text-black text-[16px]'>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex items-start flex-col gap-[30px] ">
                        <h4 className='lg:text-[12px] text-[#9F9F9F] font-normal uppercase'>Help</h4>
                        <div className="flex flex-col justify-start gap-5 font-normal">
                            <Link href="" className='text-black text-[16px]'>
                                Payment Options
                            </Link>
                            <Link href="" className='text-black text-[16px]'>
                                Returns
                            </Link>
                            <Link href="" className='text-black text-[16px]'>
                                Privacy Policies
                            </Link>
                        </div>
                    </div>
                    {/* Column 4 */}
                    <div className="flex items-start flex-col gap-[30px] ">
                        <h4 className='lg:text-[12px] text-[10px] text-[#9F9F9F] font-normal'>Newsletter</h4>
                        <div className='flex justify-center items-center gap-[20px]'>
                            <input type="text" placeholder='Enter your email address' className='px-1 py-1 bg-transparent border-[1px] border-b-black w-full' />
                            <button className='px-1 py-1 w-[40%] border-[1px] border-b-black text-black bg-white'>Subscribe</button>
                        </div>
                    </div>
                    {/* Vertical Text on Right */}

                </div>
                <div className='border-t-[1px] border-[#ccc] pt-10 mt-10 flex justify-start items-end'>
                    <h3 className='text-[#000]'>2023 furino. All rights reverved</h3>
                </div>
            </footer>
        </>
    )
}

export default Footer