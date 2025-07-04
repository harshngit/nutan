"use client";

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { removeCartItem, updateCartQuantity, applyCouponToCart } from "@/actions/cartAction";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus } from "react-icons/fi";
import { db } from "@/app/firebase.config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetchCoupons();
  }, []);

  useEffect(() => {
    const baseTotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    if (appliedCoupon) {
      let discountAmount = 0;
      if (appliedCoupon.couponAmountDetails === "price") {
        discountAmount = Number(appliedCoupon.couponAmount);
      } else {
        discountAmount = (Number(appliedCoupon.couponAmount) / 100) * baseTotal;
      }
      setFinalTotal(Math.max(baseTotal - discountAmount, 0));
    } else {
      setFinalTotal(baseTotal);
    }
  }, [cartItems, appliedCoupon]);

  const fetchCoupons = async () => {
    try {
      const q = query(collection(db, "Coupon"), where("couponStatus", "==", "Active"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCouponList(list);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity(item.product, item.size, item.color, newQuantity));
  };

  const handleRemove = (item) => {
    dispatch(removeCartItem(item.product, item.size, item.color));
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
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
      router.push("/checkout");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  const formatPrice = (amount) => {
    if (!mounted) return `₹${amount}`;
    return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="font-poppins bg-white p-4 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Product Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white overflow-hidden">
              <div className="bg-orange-50 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-[16px] font-medium text-black">
                  <div className="col-span-5 md:col-span-4">Product</div>
                  <div className="col-span-3 md:col-span-2 text-center">Price</div>
                  <div className="col-span-2 md:col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 md:col-span-3 text-center">Subtotal</div>
                  <div className="col-span-0 md:col-span-1"></div>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <p className="p-6 text-center text-gray-500">Your cart is empty</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.product}-${index}`} className="py-6 border-b">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5 md:col-span-4 flex items-center space-x-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <Image 
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm md:text-base font-medium">{item.name}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            Size: {item.size} | Color:
                            <span className="w-4 h-4 inline-block rounded-full border" style={{ backgroundColor: item.color }}></span>
                          </p>
                        </div>
                      </div>

                      <div className="col-span-3 md:col-span-2 text-center">
                        <span className="text-sm md:text-base">{formatPrice(item.price)}</span>
                      </div>

                      <div className="col-span-2 md:col-span-2 flex justify-center gap-2">
                        <button onClick={() => handleQuantityChange(item, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 border rounded hover:bg-gray-100"><FiMinus /></button>
                        <div>{item.quantity}</div>
                        <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="p-1 border rounded hover:bg-gray-100"><FiPlus /></button>
                      </div>

                      <div className="col-span-2 md:col-span-3 text-center font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>

                      <div className="hidden md:block md:col-span-1 text-center">
                        <button onClick={() => handleRemove(item)} className="text-[#B88E2F] hover:text-[#b88f2fe1]"><FaTrash size={18} /></button>
                      </div>

                      <div className="col-span-12 md:hidden flex justify-end mt-2">
                        <button onClick={() => handleRemove(item)} className="text-[#B88E2F] hover:text-[#b88f2fe1]"><FaTrash size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Totals & Coupon Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F1E7] rounded-lg py-6 px-6 sticky top-8">
              <h2 className="text-[22px] font-semibold mb-4 text-center">Cart Totals</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0))}</span>
                </div>
                <div className="flex justify-between font-medium text-[18px]">
                  <span>Total</span>
                  <span className="text-[#B88E2F]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="mb-4">
                <button onClick={() => setShowCoupon(!showCoupon)} className="text-sm underline">
                  {showCoupon ? "Hide Coupons" : "Add Coupon"}
                </button>
              </div>

              {showCoupon && (
                <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                  {couponList.map((coupon) => (
                    <div key={coupon.id} className="border p-2 rounded bg-white flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{coupon.couponName}</p>
                        <p className="text-xs text-gray-500">
                          {coupon.couponAmountDetails === "price"
                            ? `₹${coupon.couponAmount}`
                            : `${coupon.couponAmount}% off`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyCoupon(coupon)}
                        className={`text-xs px-3 py-1 rounded ${appliedCoupon?.id === coupon.id ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"}`}>
                        {appliedCoupon?.id === coupon.id ? "Applied" : "Apply"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center">
                {isAuthenticated ? (
                  <button onClick={handleCheckout} className="w-full mt-4 bg-black text-white py-2 hover:bg-gray-900">
                    Checkout
                  </button>
                ) : (
                  <Link href="/login" className="w-full mt-4 bg-black text-white py-2 text-center">
                    Login to Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
