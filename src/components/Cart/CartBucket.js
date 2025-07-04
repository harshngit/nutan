"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeCartItem, applyCouponToCart } from '@/actions/cartAction';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartBucket = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { cartItems } = useSelector(state => state.cart);
	const { isAuthenticated, userProfile } = useSelector(state => state.user);

	const [couponList, setCouponList] = useState([]);
	const [showCoupon, setShowCoupon] = useState(false);
	const [appliedCoupon, setAppliedCoupon] = useState(null);
	const [finalTotal, setFinalTotal] = useState(0);

	const total = cartItems.reduce(
		(acc, item) => acc + Number(item.price) * item.quantity, 0
	);

	useEffect(() => {
		setFinalTotal(total);
	}, [total]);

	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const q = query(collection(db, "Coupon"), where("couponStatus", "==", "Active"));
				const snapshot = await getDocs(q);
				const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				setCouponList(list);
			} catch (error) {
				console.error("Error fetching coupons:", error);
			}
		};
		fetchCoupons();
	}, []);

	const handleRemove = (item) => {
		dispatch(removeCartItem(item.product, item.size, item.color));
	};

	const handleQuantityChange = (item, delta) => {
		const newQty = item.quantity + delta;
		if (newQty >= 1) {
			dispatch(updateCartQuantity(item.product, item.size, item.color, newQty));
		}
	};

	const handleApply = (coupon) => {
		setAppliedCoupon(coupon);

		let discountAmount = 0;
		if (coupon.couponAmountDetails === "price") {
			discountAmount = Number(coupon.couponAmount);
		} else {
			discountAmount = (Number(coupon.couponAmount) / 100) * total;
		}

		const discountedTotal = Math.max(total - discountAmount, 0);
		setFinalTotal(discountedTotal);

		dispatch(applyCouponToCart(coupon));
	};

	const handleCheckout = async () => {
		try {
			if (appliedCoupon && userProfile?.uid) {
				const couponRef = doc(db, "Coupon", appliedCoupon.id);
				await updateDoc(couponRef, {
					appliedBy: arrayUnion(userProfile.uid),
				});
			}

			dispatch(applyCouponToCart(appliedCoupon));
			router.push("/checkout");
		} catch (err) {
			console.error("Checkout failed:", err);
		}
	};

	return (
		<div className='w-full bg-white flex justify-center items-center flex-col lg:px-10 lg:py-10 py-5 px-5'>
			<div className='flex flex-col justify-center items-center'>
				<h2 className='font-normal font-poppins lg:text-[42px] text-[20px] '>Shopping Cart</h2>
				<div className='flex justify-center items-center gap-2'>
					<h5 className='font-300 font-poppins lg:text-[15px] '>Home</h5>
					<img src="/asset/SVG.png" alt="" />
					<h4 className='font-300 font-poppins lg:text-[16px] '>Your Shopping Cart</h4>
				</div>
			</div>

			<div className="w-full">
				<h2 className="lg:text-[22px] font-normal mb-4">Your Cart</h2>
				<div className="grid grid-cols-1 border-y-[2px] py-5 border-[#00000063] md:grid-cols-3 gap-4">
					{cartItems.length === 0 ? (
						<p>Your cart is empty.</p>
					) : (
						cartItems.map((item, index) => (
							<div key={index} className="flex gap-5 justify-start items-start  p-4 rounded-md">
								<img src={item.image} alt={item.name} className="w-[168px] object-cover" />
								<div className="w-[50%] flex-col flex justify-start items-start">
									<p className="font-semibold text-[22px] mb-2">{item.name}</p>
									<p className="text-sm text-[22px] mb-2 text-[#8A8A8A]">Color: {item.color}</p>
									<p className="font-semibold mb-2">${Number(item.price).toFixed(2)}</p>
									<div className="flex items-start justify-start mt-2 space-x-2">
										<button onClick={() => handleQuantityChange(item, -1)} className="px-2 border">-</button>
										<div>{item.quantity.toString().padStart(2, '0')}</div>
										<button onClick={() => handleQuantityChange(item, 1)} className="px-2 border">+</button>
									</div>
									<button onClick={() => handleRemove(item)} className="text-sm mb-2 text-[22px] text-gray-500 mt-1 underline">Remove</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Coupon Toggle */}
				{cartItems.length > 0 && (
					<div className="mt-5">
						<div className="flex justify-between mb-2 cursor-pointer" onClick={() => setShowCoupon(!showCoupon)}>
							<span className="font-300 text-gray-700 text-[18px]">Discount</span>
							<span className="text-gray-700 underline">{showCoupon ? "Hide" : "Add"}</span>
						</div>

						{/* Coupon List */}
						<div className={`${showCoupon ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300`}>
							{couponList.map((coupon) => (
								<div key={coupon.id} className="border p-3 mb-3 rounded-md bg-gray-50 flex justify-between items-center">
									<div>
										<p className="text-sm font-medium">{coupon.couponName}</p>
										<p className="text-xs text-gray-500 mb-1">
											{coupon.couponAmountDetails === "price"
												? `₹${coupon.couponAmount}`
												: `${coupon.couponAmount}% off`}
										</p>
										<span className="bg-white border px-2 py-1 rounded text-sm font-mono">{coupon.couponCode}</span>
									</div>
									<button
										onClick={() => handleApply(coupon)}
										className={`text-sm px-4 py-1 rounded ${appliedCoupon?.id === coupon.id
											? "bg-green-600 text-white"
											: "bg-black text-white hover:bg-gray-800"
											}`}
									>
										{appliedCoupon?.id === coupon.id ? "Applied" : "Apply"}
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Order Summary */}
				<div className='flex justify-end items-end'>
					<div className="mt-8 lg:w-[40%] w-full">
						<div className="mt-6 md:mt-0 border-t-2">
							<div className="flex justify-between font-semibold lg:text-[32px] text-[25px]">
								<span>Total</span>
								<span>${finalTotal.toFixed(2)}</span>
							</div>
							{isAuthenticated ? (
								cartItems.length > 0 ? (
									<button onClick={handleCheckout} className="w-full mt-4 bg-black shadow-lg text-white py-2 hover:bg-gray-900">
										Checkout
									</button>
								) : (
									<Link href="/shop">
										<button className="w-full mt-4 bg-black shadow-lg text-white py-2 hover:bg-gray-900">
											Shop
										</button>
									</Link>
								)
							) : (
								<Link href="/login">
									<button className="w-full mt-4 bg-black shadow-lg text-white py-2 hover:bg-gray-900">
										Login
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default CartBucket;
