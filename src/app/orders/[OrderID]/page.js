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
import LoadingScreen from '@/components/Loader/LoaderScreen';
import NavbarOne from '@/components/Layout/NavbarOne';

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

  if (loading) {
		return (
			<LoadingScreen />
		);
	}

	console.log(orderDetails)

	return (
		<div className="font-poppins">
			<NavbarOne />
			<section className="relative pt-[60px] pb-[50px]">
				<OrderDetailsPage orderDetails={orderDetails} />
			</section>
			<Footer />
		</div>
	)

}