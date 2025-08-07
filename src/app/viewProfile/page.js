import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import NavbarOne from '@/components/Layout/NavbarOne'
import ProfilePage from '@/components/ViewProfile/ProfilePage'
import React from 'react'

const ViewProfile = () => {
	return (
		<div className=' font-poppins'>
			<NavbarOne />
			<section className="relative pt-[0px] pb-[50px]">
				<ProfilePage />
			</section>
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default ViewProfile