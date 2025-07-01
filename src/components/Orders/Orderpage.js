"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { FaJediOrder } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";

const Orderpage = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	const { userProfile } = useSelector((state) => state.user) || {};
	const uid = userProfile?.uid;

	useEffect(() => {
		const fetchOrders = async () => {
			if (!uid) return;

			try {
				const orderRef = collection(db, "Order");
				const q = query(orderRef, where("uid", "==", uid));
				const snapshot = await getDocs(q);

				const fetchedOrders = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setOrders(fetchedOrders);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [uid]);

	if (loading) {
		return <p className="p-10">Loading orders...</p>;
	}

	if (!orders.length) {
		return <div className="p-10">
			<div className='flex justify-start items-start lg:px-10 lg:py-10 px-5 py-5'>
				<h2 className='font-semibold lg:text-[30px] text-lg text-[#000]'>My Orders</h2>
			</div>
			<p>No Orders Found</p>
		</div>;
	}

	return (
		<div>
			<div className='flex justify-start items-start lg:px-10 lg:py-10 px-5 py-5'>
				<h2 className='font-semibold lg:text-[30px] text-lg text-[#000]'>My Orders</h2>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 lg:px-10'>
				{orders.map((order, index) => (
					<div key={index} className='bg-white rounded-lg shadow-md p-6'>
						<div className='flex items-center justify-between mb-2'>
							<div className='flex items-center gap-3'>
								<div className='bg-[#000] text-white font-semibold w-10 h-10 flex items-center justify-center rounded-md'>
									{/* {order.id?.slice(0, 2) || "ID"} */}
									<FaBoxOpen />
								</div>
								<div>
									<h3 className='font-semibold text-lg'>{order.customerName || "Customer"}</h3>
									<p className='text-sm text-gray-500'>
										Order {order.OrderID || "#000"} / {order.status || "N/A"}
									</p>
								</div>
							</div>
							<span className='text-black font-medium text-sm bg-gray-100 px-3 py-1 rounded-full'>
								✔ {order.orderStatus || "Pending"}
							</span>
						</div>

						<div className="flex justify-start items-start gap-[5px] flex-col mb-2">
							<span>
								{order.createdAt?.toDate().toDateString() || "N/A"}
							</span>
							<span>
								{order.createdAt?.toDate().toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
									second: '2-digit',
									hour12: true,
								}) || "N/A"}
							</span>
						</div>

						<div className='border-t border-b py-3 mb-3'>
							{order.dimensions?.map((item, idx) => (
								<div key={idx} className='flex justify-between text-sm mb-2'>
									<span>{item.p_name} x  {item.p_qty
									}</span>
									<span>${item.p_price}</span>
								</div>
							))}
						</div>

						{order?.invoices.map((item, index) => (
							<div className='flex justify-between font-semibold text-base mb-4'>
								<span>Total</span>
								<span>${item.n_value?.toFixed(2) || "0.00"}</span>
							</div>
						))}

						<div className='flex gap-2'>
							<button className='bg-gray-100 text-gray-800 text-sm px-4 py-2 rounded-md'>
								See Details
							</button>
							<button className='bg-black text-white text-sm px-4 py-2 rounded-md'>
								Print Bill
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orderpage;