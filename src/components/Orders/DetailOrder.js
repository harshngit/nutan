'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { FiArrowLeft, FiRefreshCcw } from 'react-icons/fi';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase.config';

const DetailsOrder = ({ orderDetails }) => {
	const [showReturnInfo, setShowReturnInfo] = useState(false);
	const [status, setStatus] = useState(orderDetails?.status);

	const isDelivered = status === 'delivered';
	const isReturned = status === 'Return';
	const isCancelable = !isDelivered && !isReturned && status !== 'cancelled';

	const handleCancel = async () => {
		try {
			const orderRef = doc(db, 'Order', orderDetails.id);
			await updateDoc(orderRef, {
				status: 'cancelled',
			});
			setStatus('cancelled'); // update UI immediately
		} catch (error) {
			console.error('Error cancelling order:', error);
		}
	};

	return (
		<div className='flex justify-start items-start gap-2'>
			<div className='flex flex-col w-[80%] justify-start items-start lg:gap-2 gap-5'>
				<Link href="/">
					<FiArrowLeft className="text-lg" />
				</Link>

				<div className='flex justify-start items-start'>
					<h2 className='lg:text-[20px]'>Order ID : {orderDetails?.OrderID}</h2>
				</div>

				<div className='flex justify-start items-start flex-col lg:gap-2 gap-5'>
					<div className="flex justify-start items-start">
						<h2 className='lg:text-[20px]'>Customer Name: {orderDetails?.customerName}</h2>
					</div>

					<div className="flex justify-start items-start flex-col">
						<h2 className='lg:text-[20px]'>Drop Location:</h2>
						<p>{orderDetails?.dropoff_location?.address},</p>
						<p>{orderDetails?.dropoff_location?.city}, {orderDetails?.dropoff_location?.region},</p>
						<p>{orderDetails?.dropoff_location?.zip},</p>
					</div>

					<div className="flex justify-start items-start">
						<h2 className='lg:text-[20px]'>Phone Number: {orderDetails?.phone}</h2>
					</div>
				</div>

				{/* Return Flow */}
				{isReturned ? (
					<div className="flex flex-col gap-4">
						<button
							onClick={() => setShowReturnInfo(!showReturnInfo)}
							className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
						>
							<FiRefreshCcw className="w-4 h-4 mr-3" /> Check Request Form
						</button>

						{showReturnInfo && (
							<div className="border p-4 rounded-md bg-gray-50 w-full">
								<p className="text-md font-bold mb-2">Return Reason:</p>
								<p className="mb-6">{orderDetails?.returnReason || "N/A"}</p>

								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									<p className="text-md font-bold mb-2 col-span-full">Return Proof:</p>
									{orderDetails?.returnImages?.map((img, index) => (
										<img
											key={index}
											src={img}
											alt={`Return proof ${index + 1}`}
											className="w-full h-32 object-cover rounded-lg border"
										/>
									))}
								</div>
							</div>
						)}
					</div>
				) : isDelivered ? (
					<Link href={`/return/${orderDetails?.OrderID}`} className="flex justify-center items-center">
						<button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
							<FiRefreshCcw className="w-4 h-4 mr-3" /> Return
						</button>
					</Link>
				) : null}

				{/* Cancel button only if not delivered, returned, or already cancelled */}
				{isCancelable && (
					<button
						onClick={handleCancel}
						className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
					>
						<FaTimesCircle /> Cancel Order
					</button>
				)}
			</div>

			{/* Order Status Display */}
			<div className='bg-[#000] text-white text-center px-2 py-2 rounded-lg lg:text-[15px] text-[10px] w-[20%]'>
				{status}
			</div>
		</div>
	);
};

export default DetailsOrder;
