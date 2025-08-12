"use client";

import { fetchOrderDetails } from '@/actions/orderAction';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from '@/Context/CurrencyProvider';  // ✅ import useCurrency hook

const ConfirmationOrder = ({ orderID }) => {
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector((state) => state.order);
    
    const { formatPrice } = useCurrency(); // ✅ use formatPrice

    useEffect(() => {
        if (orderID) {
            dispatch(fetchOrderDetails(orderID));
        }
    }, [orderID]);

    console.log(orderDetails)

    if (loading) return (
        <div className="bg-gray-400 flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-lg font-medium">Loading your order details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-gray-400 flex justify-center items-center h-screen px-4">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
                <p className="text-red-500 text-lg font-medium mb-4">Error: {error}</p>
                <Link href="/">
                    <button className="bg-black text-white px-6 py-2 rounded font-semibold">
                        Return Home
                    </button>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            <div className='bg-gray-400 min-h-screen flex justify-center items-center p-2 sm:p-4'>
                <div className="min-h-[80%] rounded-md w-full max-w-7xl font-poppins bg-white flex flex-col lg:flex-row justify-center items-start px-3 sm:px-6 py-6 sm:py-10 gap-6 sm:gap-10">
                    
                    {/* Left Side - Thank You Section */}
                    <div className="flex-1 w-full max-w-lg order-2 lg:order-1">
                        <div className="text-center lg:text-left">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-3 sm:mb-4">
                                Thank you for your purchase!
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.
                            </p>
                        </div>

                        {/* Billing Address */}
                        <div className="mb-6 sm:mb-8 bg-gray-50 rounded-lg p-4 sm:p-5">
                            <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-800">Billing Address</h3>
                            <div className="text-xs sm:text-sm text-gray-700 space-y-2 sm:space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <strong className='text-gray-800 mb-1 sm:mb-0 sm:pr-2 sm:w-20'>Name:</strong>
                                    <span className="break-words">{orderDetails?.customerName}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-start">
                                    <strong className='text-gray-800 mb-1 sm:mb-0 sm:pr-2 sm:w-20 flex-shrink-0'>Address:</strong>
                                    <span className="break-words leading-relaxed">
                                        {orderDetails?.dropoff_location?.address}, {orderDetails?.dropoff_location?.city}, {orderDetails?.dropoff_location?.region}, {orderDetails?.dropoff_location?.zip}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <strong className='text-gray-800 mb-1 sm:mb-0 sm:pr-2 sm:w-20'>Phone:</strong>
                                    <span className="break-words">{orderDetails?.dropoff_location?.phone}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <strong className='text-gray-800 mb-1 sm:mb-0 sm:pr-2 sm:w-20'>Email:</strong>
                                    <span className="break-words">{orderDetails?.email || orderDetails?.customer?.email || orderDetails?.customerEmail || orderDetails?.user?.email || 'Not provided'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Home Button */}
                        <div className="flex justify-center lg:justify-start">
                            <Link href={"/"}>
                                <button className="bg-[#3B3310] text-white px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors w-full sm:w-auto min-w-[120px]">
                                    Return Home
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="flex-1 w-full max-w-xl bg-gray-100 rounded-xl shadow-md p-4 sm:p-6 relative order-1 lg:order-2">
                        
                        {/* Order Info Header */}
                        <div className="border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Order Summary</h3>
                            
                            {/* Mobile: Stacked Layout */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-700">
                                <div className="bg-white rounded-lg p-2 sm:p-3">
                                    <span className="font-semibold text-gray-800 block">Date</span>
                                    <span className="text-gray-600 text-xs sm:text-sm">02 May 2023</span>
                                </div>
                                <div className="bg-white rounded-lg p-2 sm:p-3">
                                    <span className="font-semibold text-gray-800 block">Order Number</span>
                                    <span className="text-gray-600 text-xs sm:text-sm break-words">{orderDetails?.OrderID}</span>
                                </div>
                                <div className="bg-white rounded-lg p-2 sm:p-3">
                                    <span className="font-semibold text-gray-800 block">Coupon Code</span>
                                    <span className="text-gray-600 text-xs sm:text-sm">
                                        {orderDetails?.coupon?.length > 0 
                                            ? orderDetails.coupon.map((item, idx) => (
                                                <span key={idx}>{item?.couponCode}</span>
                                            ))
                                            : 'None'
                                        }
                                    </span>
                                </div>
                                <div className="bg-white rounded-lg p-2 sm:p-3">
                                    <span className="font-semibold text-gray-800 block">Payment</span>
                                    <span className="text-gray-600 text-xs sm:text-sm">COD</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Ordered Items</h4>
                            {orderDetails?.dimensions?.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.p_img}
                                                    alt={item?.p_name || "Product"}
                                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover border"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm sm:text-base text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                                                    {item?.p_name}
                                                </p>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                        <span>Color:</span>
                                                        <div
                                                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: item?.p_color }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        Quantity: <span className="font-medium">{item?.p_qty}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="font-semibold text-sm sm:text-base text-gray-800">
                                                {formatPrice(item?.p_price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Totals */}
                        {orderDetails?.invoices?.map((item, index) => (
                            <div key={index} className="border-t pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                                <div className="bg-white rounded-lg p-3 sm:p-4">
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-700 mb-2">
                                        <span>Subtotal</span>
                                        <span className="font-medium">{formatPrice(item?.n_value)}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-base sm:text-lg text-gray-800 pt-2 border-t border-gray-200">
                                        <span>Order Total</span>
                                        <span className="text-green-600">{formatPrice(item?.n_value)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationOrder;