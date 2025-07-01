"use client"

import { fetchOrderDetails } from '@/actions/orderAction';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmationOrder = ({ orderID }) => {
    const dispatch = useDispatch();
        const { orderDetails, loading, error } = useSelector((state) => state.order);
    
        useEffect(() => {
            if (orderID) {
                dispatch(fetchOrderDetails(orderID));
            }
        }, [orderID]);
    
        console.log(orderDetails)
    
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
   <>
            <div className='bg-gray-400 flex justify-center items-center h-screen'>
                <div className="min-h-[80%] rounded-md w-[90%] font-playfair bg-white flex flex-col lg:flex-row justify-center items-center px-6 py-10 gap-10">
                    {/* Left Side */}
                    <div className="flex-1 max-w-lg">
                        <h2 className="text-3xl font-bold text-black mb-4">Thank you for your purchase!</h2>
                        <p className="text-gray-600 mb-8">
                            Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.
                        </p>
   
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-2">Billing address</h3>
                            <div className="text-sm text-gray-700 space-y-2">
                                <p><strong className='pr-1'>Name:</strong> {orderDetails?.customerName}</p>
                                <p><strong className='pr-1'>Address:</strong>{orderDetails?.dropoff_location?.address
                                },{orderDetails?.dropoff_location?.city
                                    },{orderDetails?.dropoff_location?.region
                                    },{orderDetails?.dropoff_location?.zip
                                    }</p>
                                <p><strong className='pr-1'>Phone:</strong>{orderDetails?.dropoff_location?.phone
                                }</p>
                                <p><strong className='pr-1'>Email:</strong>
                                    {orderDetails?.email || 
                                    orderDetails?.customer?.email || 
                                    orderDetails?.customerEmail || 
                                    orderDetails?.user?.email || 
                                    'Not provided'}
                                    </p>
                            </div>
                        </div>
   
                        <Link href={"/"}>
                            <button className="bg-[#000] text-white px-6 py-2 rounded font-semibold">
                                Home
                            </button>
                        </Link>
                    </div>
   
                    {/* Right Side */}
                    <div className="flex-1 max-w-xl bg-gray-100 rounded-xl shadow-md p-6 relative">
                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-xl font-bold mb-3">Order Summary</h3>
                            <div className="flex justify-between text-sm text-gray-700">
                                <span><strong>Date</strong><br />02 May 2023</span>
                                <span><strong>Order Number</strong><br />{orderDetails?.OrderID}</span>
                                <span><strong>Coupon Code</strong><br />{orderDetails?.coupon?.map((item) => (<>
									{item?.couponCode}
								</>))}</span>
                                <span><strong>Payment Method</strong><br />COD</span>
                            </div>
                        </div>
   
                        {/* Items */}
                        {orderDetails?.dimensions.map((item, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <img
                                            src={item.p_img}
                                            alt="All In One Chocolate Combo"
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div>
                                            <p className="font-bold">{item?.p_name}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>Color:</span>
                                                <div
                                                    className="w-4 h-4 rounded-full border"
                                                    style={{ backgroundColor: item?.p_color }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-600">Qty: {item?.p_qty}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">${item?.p_price}</p>
                                </div>
                            </div>
                        ))}
   
                        {/* Totals */}
                        {orderDetails?.invoices.map((item, index) => (
                            <div className="border-t mt-6 pt-4 space-y-2 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>Sub Total</span>
                                    <span>${item?.n_value}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2">
                                    <span>Order Total</span>
                                    <span>${item?.n_value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
  )
}

export default ConfirmationOrder