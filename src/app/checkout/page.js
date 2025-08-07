'use client'
import CartBucket from '@/components/Cart/CartBucket'
import CartPage from '@/components/Cart/CartPage'
import Checkout from '@/components/Cart/Checkout'
import TrendingNow from '@/components/Cart/TrendingNow'
import ServiceFeatures from '@/components/Home/FeaturesSection'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import NavbarOne from '@/components/Layout/NavbarOne'
import BreadcrumbHero from '@/components/Shop/BannerBreadcrumb'
import ProductBadage from '@/components/Shop/ProductBadage'
import React from 'react'

const Checkoutpage = () => {
    return (
        <div className=' font-poppins'>
            <NavbarOne />
            {/* <section className="relative pt-[130px] ">

                <BreadcrumbHero />
            </section> */}
            <section className="relative pt-[0px] ">
               
                <Checkout />
            </section>
            {/* <section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
                <ProductBadage />
            </section> */}

            <section className='relative overflow-hidden'>
                    <ServiceFeatures />
                  </section>


            <section className="relative">
                <Footer />
            </section>
        </div>
    )
}

export default Checkoutpage