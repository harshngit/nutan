"use client"
import React from 'react'
import { IoMdArrowRoundUp } from 'react-icons/io'
import { PiLinkedinLogo, PiInstagramLogo, PiYoutubeLogo } from "react-icons/pi";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import Link from "next/link"
import Image from 'next/image';

const Footer = () => {
    return (
        <>
            <footer className="bg-gray-200 text-black md:px-14 px-4 w-full md:py-10 py-4 overflow-hidden">
                <div className='grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-4'>

                    {/* Column 1 - Brand */}
                    <div className="flex justify-start gap-5 items-start flex-col">
                        <h4 className='lg:text-[24px] text-[20px] font-bold'>Nutan.</h4>
                        <p className='lg:text-[16px] text-[14px] text-[#9F9F9F] lg:w-[80%] w-full font-light'>
                            400 University Drive Suite 200 Coral Gables, FL 33134 USA
                        </p>
                    </div>

                    {/* Column 2 - Links */}
                    <div className='flex justify-start gap-5 items-start flex-col'>
                        <h4 className='lg:text-[12px] text-[11px] font-normal text-[#9F9F9F] uppercase'>Links</h4>
                        <div className="flex flex-col justify-start gap-5 font-normal">
                            <Link href="/" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Home
                            </Link>
                            <Link href="/allproduct" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Shop
                            </Link>
                            <Link href="/about" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                About
                            </Link>
                            <Link href="/blog" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Blog
                            </Link>
                            <Link href="/contact" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Column 3 - Links */}
                    <div className='flex justify-start gap-5 items-start flex-col'>
                        <h4 className='lg:text-[12px] text-[11px] font-normal text-[#9F9F9F] uppercase'>Products</h4>
                        <div className="flex flex-col justify-start gap-5 font-normal">
                            <Link href="/bag" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Bag
                            </Link>
                            <Link href="/giftsets" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Gift Sets
                            </Link>
                            <Link href="/drinkware" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Drinkware
                            </Link>
                            <Link href="/technology" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Technology
                            </Link>
                            <Link href="/stationary" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Office & Stationery
                            </Link>
                            <Link href="/ecolifestyle" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Eco Lifestyle
                            </Link>
                            <Link href="/events" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Events
                            </Link>
                        </div>
                    </div>

                    {/* Column 3 - Help */}
                    <div className="flex items-start flex-col gap-5">
                        <h4 className='lg:text-[12px] text-[11px] text-[#9F9F9F] font-normal uppercase'>Help</h4>
                        <div className="flex flex-col justify-start gap-5 font-normal">
                            <Link href="/termsandconditions" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Terms & Conditions
                            </Link>
                            <Link href="/returnpolicypage" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Returns
                            </Link>
                            <Link href="/privacypolicypage" className='text-black text-[16px] hover:text-gray-600 transition-colors'>
                                Privacy Policies
                            </Link>
                        </div>
                    </div>

                    {/* Column 4 - Social Media */}
                    <div className="flex items-start flex-col gap-5">
                        <h4 className='lg:text-[12px] text-[11px] text-[#9F9F9F] font-normal uppercase'>Follow Us On</h4>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href="https://instagram.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on Instagram"
                            >
                                <PiInstagramLogo size={20} />
                            </Link>
                            <Link 
                                href="https://facebook.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on Facebook"
                            >
                                <FaFacebookF size={20} />
                            </Link>
                            <Link 
                                href="https://youtube.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on YouTube"
                            >
                                <PiYoutubeLogo size={20} />
                            </Link>
                            <Link 
                                href="https://twitter.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on Twitter"
                            >
                                <FaTwitter size={20} />
                            </Link>
                            <Link 
                                href="https://pinterest.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on Pinterest"
                            >
                                <FaPinterestP size={20} />
                            </Link>
                            <Link 
                                href="https://linkedin.com" 
                                target="_blank"
                                className='p-2 border border-black rounded hover:bg-black hover:text-white transition-all duration-300'
                                aria-label="Follow us on LinkedIn"
                            >
                                <PiLinkedinLogo size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className='border-t-[1px] border-[#ccc] pt-4 md:pt-8 mt-6 md:mt-8 flex justify-start items-end'>
                    <h3 className='text-[#000] text-[14px] md:text-[16px]'>2025 Nutan. All rights reserved</h3>
                </div>
            </footer>
        </>
    )
}

export default Footer