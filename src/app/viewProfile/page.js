import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import ProfilePage from '@/components/ViewProfile/ProfilePage'
import React from 'react'

const ViewProfile = () => {
	return (
		<div className=' font-playfair'>
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				<ProfilePage />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default ViewProfile