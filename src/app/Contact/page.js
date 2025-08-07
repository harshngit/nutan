'use client'
import ContactPage from '@/components/Contact/ContactPage'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BannerBreadcrumb from '@/components/Shop/BannerBreadcrumb'
import BannerCta from '@/components/Shop/BannerCta'
import ImageAccordion from '@/components/Shop/ImageAccordion'
import ProductBadage from '@/components/Shop/ProductBadage'
import ProductFilterToolbar from '@/components/Shop/ProductFilterToolbar'
import ProductPage from '@/components/Shop/ProductPage'
import ProductGrid from '@/components/Productpage/BackpackGrid'
import React from 'react'
import ServiceFeatures from '@/components/Home/FeaturesSection'
import NavbarOne from '@/components/Layout/NavbarOne'

const Contact = () => {
    return (
        <div className=' font-poppins'>
            <NavbarOne />
            {/* <section className="relative pt-[90px] pb-[]">
                <BannerBreadcrumb />
            </section> */}

            <section className="relative ">
                {/* Adjust padding to avoid navbar overlap */}
                <ContactPage />
            </section>

            {/* <section className="relative pt-[0px] pb-[46px]">
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

export default Contact