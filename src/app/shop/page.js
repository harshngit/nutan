'use client'
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

const Shop = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[]">
				{/* Adjust padding to avoid navbar overlap */}
				<BannerBreadcrumb />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductFilterToolbar />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductPage />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductBadage />
			</section>


	
			<section className="relative">
				{/* <BannerCta /> */}
			</section>

			<section className="relative">
				<Footer />
			</section>

		</div>
	)
}

export default Shop