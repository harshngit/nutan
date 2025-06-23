'use client';

import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductDetail from '@/components/Shop/Details/ProductDetail';
import Recommended from '@/components/Shop/Details/Recommended';
import DetailCta from '@/components/Shop/Details/DetailCta';
import RelatedProduct from '@/components/Shop/Details/RelatedProductpg';
import RelatedProductpg from '@/components/Shop/Details/RelatedProductpg';
import ProductDescriptionTabs from '@/components/Shop/Details/ProductDescription';
import { useEffect, useState } from 'react'
import { doc, onSnapshot, collection, query, where, limit } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import { useParams } from 'next/navigation'

export default function ProductDetailPage({ params }) {
 const [productDetails, setProductDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const id = params.productid; // ✅ Use as string

	useEffect(() => {
		if (!id) return;

		const unsub = onSnapshot(doc(db, "Product", id), (docSnap) => {
			if (docSnap.exists()) {
				setProductDetails({ id: docSnap.id, ...docSnap.data() });
			} else {
				console.warn("No product found.");
				setProductDetails(null);
			}
			setLoading(false);
		}, (error) => {
			console.error("Snapshot error:", error);
			setLoading(false);
		});

		return () => unsub(); // ✅ Cleanup on unmount
	}, [id]);


	console.log(productDetails)

	if (loading) return <div className="text-center py-20">Loading...</div>;
	if (!productDetails) return <div className="text-center py-20 text-red-600">Product not found</div>;

	return (
		<>
			<div className=' font-poppins'>
				<Navbar />
				<section className="relative lg:pt-[90px] pt-[50px] pb-[50px]">
					{/* Adjust padding to avoid navbar overlap */}
					<ProductDetail productDetails={productDetails}  />
				</section>
				<section className="relative pt-[] pb-[50px] border-b-2">
					{/* Adjust padding to avoid navbar overlap */}
					<ProductDescriptionTabs productDetails={productDetails} />
				</section>
				<section className="relative pt-[] pb-[50px]">
					{/* Adjust padding to avoid navbar overlap */}
					<RelatedProductpg />
				</section>
				<section className="relative">
					<Footer />
				</section>
			</div>
		</>
	);
}
