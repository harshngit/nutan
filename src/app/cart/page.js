'use client'
import CartBucket from '@/components/Cart/CartBucket'
import CartPage from '@/components/Cart/CartPage'
import TrendingNow from '@/components/Cart/TrendingNow'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BreadcrumbHero from '@/components/Shop/BannerBreadcrumb'
import ProductBadage from '@/components/Shop/ProductBadage'

import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { orderBy, where } from 'firebase/firestore'

const Cart = () => {
	const [recommendedProducts, setRecommendedProducts] = useState([]);
	useEffect(() => {
		const fetchRecommended = async () => {
			try {
				const productRef = collection(db, 'Product');
				const q = query(
					productRef,
					where('productStatus', '==', 'Published'),
					orderBy('createdAtDate', 'desc')
				);
				const snapshot = await getDocs(q);
				const products = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setRecommendedProducts(products);
			} catch (error) {
				console.error('Error fetching recommended products:', error);
			}
		};

		fetchRecommended();
	}, []);
	return (
		<div className=' font-poppins'>
			<Navbar />
			<section className="relative lg:pt-[90px] pt-[60px] ">
				{/* Adjust padding to avoid navbar overlap */}
				<BreadcrumbHero />
			</section>
			
			<section className="relative ">
				{/* Adjust padding to avoid navbar overlap */}
				<CartPage />
			</section>
			<section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<ProductBadage />
			</section>
			{/* <section className="relative lg:pt-[10px] xl:pt-[10px] pt-[60px] overflow-hidden">
				<TrendingNow recommendedProducts={recommendedProducts} />
			</section> */}
			<section className="relative">
				<Footer />
			</section>
		</div>
	)
}

export default Cart