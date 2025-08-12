"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeCartItem, updateCartQuantity, applyCouponToCart } from "@/actions/cartAction";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import { db } from "@/app/firebase.config";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/Context/CurrencyProvider"; // Import the useCurrency hook

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

  // ✅ Use formatPrice from the currency context
  const { formatPrice } = useCurrency();

  return (
    <div className="font-poppins bg-white p-2 sm:p-4 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Mobile Title */}
        <div className="block sm:hidden mb-4">
          <h1 className="text-xl font-semibold text-center">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">

          {/* Product Section */}
          <div className="lg:col-span-2">
            {/* Desktop Header - Hidden on mobile */}
            <div className="hidden sm:block bg-white overflow-hidden">
              <div className="bg-orange-50 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-[16px] font-medium text-black">
                  <div className="col-span-5 md:col-span-4">Product</div>
                  <div className="col-span-3 md:col-span-2 text-center">Price</div>
                  <div className="col-span-2 md:col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 md:col-span-3 text-center">Subtotal</div>
                  <div className="col-span-0 md:col-span-1"></div>
                </div>
              </div>

              {/* Desktop Cart Items */}
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

            {/* Mobile Cart Items - Card Layout */}
            <div className="block sm:hidden">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product}-${index}`} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image 
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 pr-2">{item.name}</h3>
                            <button 
                              onClick={() => handleRemove(item)} 
                              className="text-[#B88E2F] hover:text-[#b88f2fe1] p-1"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>

                          {/* Product Info */}
                          <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <span>Size: {item.size}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                Color: <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: item.color }}></span>
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</span>
                            </div>
                          </div>

                          {/* Quantity and Subtotal */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Qty:</span>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => handleQuantityChange(item, item.quantity - 1)} 
                                  disabled={item.quantity <= 1} 
                                  className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                                >
                                  <FiMinus size={12} />
                                </button>
                                <span className="px-2 py-1 text-xs font-medium">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item, item.quantity + 1)} 
                                  className="p-1 border rounded hover:bg-gray-100"
                                >
                                  <FiPlus size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-500">Subtotal:</span>
                              <div className="text-sm font-semibold text-[#B88E2F]">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart Totals & Coupon Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F1E7] rounded-lg py-4 sm:py-6 px-4 sm:px-6 lg:sticky lg:top-8">
              <h2 className="text-lg sm:text-[22px] font-semibold mb-4 text-center">Cart Totals</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0))}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedCoupon.couponName})</span>
                    <span>
                      -{appliedCoupon.couponAmountDetails === "price" 
                        ? formatPrice(appliedCoupon.couponAmount)
                        : `${appliedCoupon.couponAmount}%`}
                    </span>
                  </div>
                )}

                <hr className="border-gray-300" />
                
                <div className="flex justify-between font-medium text-base sm:text-[18px]">
                  <span>Total</span>
                  <span className="text-[#B88E2F]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-4">
                <button 
                  onClick={() => setShowCoupon(!showCoupon)} 
                  className="text-sm underline text-gray-700 hover:text-gray-900"
                >
                  {showCoupon ? "Hide Coupons" : "Add Coupon"}
                </button>
              </div>

              {showCoupon && (
                <div className="space-y-2 sm:space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                  {couponList.length === 0 ? (
                    <p className="text-xs text-gray-500 text-center py-2">No coupons available</p>
                  ) : (
                    couponList.map((coupon) => (
                      <div key={coupon.id} className="border p-2 sm:p-3 rounded bg-white">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium">{coupon.couponName}</p>
                            <p className="text-xs text-gray-500">
                              {coupon.couponAmountDetails === "price"
                                ? `₹${coupon.couponAmount}`
                                : `${coupon.couponAmount}% off`}
                            </p>
                          </div>
                          <button
                            onClick={() => handleApplyCoupon(coupon)}
                            className={`text-xs px-2 sm:px-3 py-1 rounded self-start sm:self-auto ${
                              appliedCoupon?.id === coupon.id 
                                ? "bg-green-600 text-white" 
                                : "bg-black text-white hover:bg-gray-800"
                            }`}
                          >
                            {appliedCoupon?.id === coupon.id ? "Applied" : "Apply"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Checkout Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleCheckout} 
                  disabled={cartItems.length === 0}
                  className="w-full mt-4 bg-[#3B3310] text-white py-2 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}