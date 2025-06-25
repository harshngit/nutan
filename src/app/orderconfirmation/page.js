import CartBucket from '@/components/Cart/CartBucket'
import CartPage from '@/components/Cart/CartPage'
import Checkout from '@/components/Cart/Checkout'
import OrderConfirmation from '@/components/Cart/OrderConfirmation'
import TrendingNow from '@/components/Cart/TrendingNow'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BreadcrumbHero from '@/components/Shop/BannerBreadcrumb'
import ProductBadage from '@/components/Shop/ProductBadage'
import React from 'react'

const Checkoutpage = () => {
    return (
        <div className=' font-poppins'>
            <Navbar />
            <section className="relative pt-[60px] ">
                {/* Adjust padding to avoid navbar overlap */}
                <OrderConfirmation />
            </section>
            <section className="relative">
                <Footer />
            </section>
        </div>
    )
}

export default Checkoutpage