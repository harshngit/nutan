import CartBucket from '@/components/Cart/CartBucket'
import CartPage from '@/components/Cart/CartPage'
import TrendingNow from '@/components/Cart/TrendingNow'
import ComparisonPage from '@/components/Comparison/ComparisonPage'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BreadcrumbHero from '@/components/Shop/BannerBreadcrumb'
import ProductBadage from '@/components/Shop/ProductBadage'
import React from 'react'

const ProductComparison = () => {
    return (
        <div className=' font-poppins'>
            <Navbar />
            <section className="relative pt-[130px] ">
                {/* Adjust padding to avoid navbar overlap */}
                <BreadcrumbHero />
            </section>
            <section className="relative ">
                {/* Adjust padding to avoid navbar overlap */}
                <ComparisonPage />
            </section>
            <section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
                <ProductBadage />
            </section>
            <section className="relative">
                <Footer />
            </section>
        </div>
    )
}

export default ProductComparison