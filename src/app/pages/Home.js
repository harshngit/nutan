"use client"
import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React from 'react'
import { Suspense } from 'react'
import Head from 'next/head.js'
import '../../components/Home/Home.css'
import { ThemeProvider } from "@material-tailwind/react";
import AboutHome from '@/components/Home/AboutHome.js'
import Deal from '@/components/Home/Deal.js'
import ProductsHome from '@/components/Home/ProductsHome.js'
import CTA from '@/components/Home/CTA.js'
import Footer from '@/components/Layout/Footer.js'
import Photosection from '@/components/Home/Photosection.js'
import Topbar from '@/components/Layout/Topbar.js'
import HeroSection from '@/components/Home/HeroSection.js'
const Home = () => {
  return (
    <div className='relative'>
      {/* <ThemeProvider> */}
      <NavbarTwo />
      <section className="relative pt-[0px]">
        {/* Adjust padding to avoid navbar overlap */}
        <HeroSection />
      </section>
      {/* lg:pt-[690px] xl:pt-[695px] pt-[600px] */}
      {/* Second Section Below */}
      <section className="relative 
       overflow-hidden lg:pt-[750px] xl:pt-[750px] pb-[100px] pt-[650px]">
        <AboutHome />
      </section>
      {/* Second Section Below */}
      <section className="relative  overflow-hidden">
        <Deal />
      </section>
      <section className='relative overflow-hidden'>
        <Photosection />
      </section>
      <section className='relative overflow-hidden'>
        <ProductsHome />
      </section>
      {/* <section className='relative overflow-hidden'>
        <CTA />
      </section> */}
      <section className=''>
        <Footer />
      </section>
      {/* <Footer /> */}
      {/* </ThemeProvider> */}
    </div>
  )
}

export default Home