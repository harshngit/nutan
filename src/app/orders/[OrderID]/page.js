'use client';

import { useEffect, useState } from 'react';
import {
	doc,
	onSnapshot,
	collection,
	query,
	where,
	orderBy,
	getDocs,
} from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import OrderDetailsPage from '@/components/Orders/OrderDetailsPage';

export default function OrderDetails({ params }) {
	const id = params?.OrderID;

	const [orderDetails, setOrderDetails] = useState({})
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		const unsubscribe = onSnapshot(
			doc(db, 'Order', id),
			(docSnap) => {
				if (docSnap.exists()) {
					setOrderDetails({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.warn('No product found.');
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

	console.log(orderDetails)

	return (
		<div className="font-poppins">
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				<OrderDetailsPage orderDetails={orderDetails} />
			</section>
			<Footer />
		</div>
	)

}