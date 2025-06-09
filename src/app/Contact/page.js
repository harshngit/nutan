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
import ProductGrid from '@/components/Shop/ProductsGrid'
import React from 'react'

const Contact = () => {
    return (
        <div className=' font-poppins'>
            <Navbar />
            <section className="relative pt-[90px] pb-[]">
                {/* Adjust padding to avoid navbar overlap */}
                <BannerBreadcrumb />
            </section>

            <section className="relative ">
                {/* Adjust padding to avoid navbar overlap */}
                <ContactPage />
            </section>

            <section className="relative pt-[0px] pb-[46px]">
                {/* Adjust padding to avoid navbar overlap */}
                <ProductBadage />
            </section>
           

            <section className="relative">
                <Footer />
            </section>

        </div>
    )
}

export default Contact