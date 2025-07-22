"use client"
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import Orderpage from '@/components/Orders/Orderpage'

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { useSelector } from "react-redux";

const Orders = () => {
    const [order, setOrder] = useState([]);
	const userState = useSelector((state) => state.user);
	const { userProfile } = userState || {};
	const uid = userProfile?.uid;

	useEffect(() => {
		const fetchProduct = async () => {
			if (!uid) return;

			try {
				const productRef = collection(db, "Order");
				const q = query(productRef, where("uid", "==", uid));
				const querySnapshot = await getDocs(q);

				const products = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setOrder(products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProduct();
	}, [uid]); // re-run when uid becomes available



	console.log(order);

	return (
		<div className="font-poppins">
			<Navbar />
			<section className="relative pt-[130px] pb-[50px]">
				<Orderpage order={order} />
			</section>
			
			<Footer />
		</div>
	);
};

export default Orders;