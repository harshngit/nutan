import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import MyAccountdetail from '@/components/MyAccount/MyAccountdetail'
import Whislistdetail from '@/components/Wishlist/Whislistdetail'
import React from 'react'

const MyAccount = () => {
    return (
        <div className=' font-poppins'>
            <Navbar />
            <section className="relative pt-[0px] ">
                {/* Adjust padding to avoid navbar overlap */}
                <MyAccountdetail />
            </section>

            <section className="relative">
                <Footer />
            </section>
        </div>
    )
}

export default MyAccount