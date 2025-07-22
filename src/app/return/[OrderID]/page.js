"use client";

import { useEffect, useState } from 'react';
import { db } from '@/app/firebase.config';  // Ensure this is correct
import { doc, onSnapshot } from 'firebase/firestore';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import { useRouter } from 'next/navigation';
import ReturnForm from '@/components/Return/ReturnForm';

export default function ReturnPage({ params }) {

	const [orderDetails, setOrderDetails] = useState(null);
	const [loading, setLoading] = useState(true);

	const id = params?.OrderID;

	useEffect(() => {
		if (!id) return;

		const unsubscribe = onSnapshot(
			doc(db, 'Order', id),
			(docSnap) => {
				if (docSnap.exists()) {
					setOrderDetails({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.warn('No order found.');
					setOrderDetails(null);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Snapshot error:', error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [id]);


	// Loading screen
	// if (loading) {
	// 	return <LoadingScreen />;
	// }

	return (
		<div className="font-poppins">
			<Navbar />
            <section className="relative pt-[130px] pb-[50px]">
				<ReturnForm orderDetails={orderDetails} />
			</section>
			<Footer />
		</div>
	);
}