"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "@/actions/orderAction";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);
  const { userProfile } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    paymentMethod: "cashOnDelivery",
  });

  // 🧮 Total Price (before discount)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧾 Total Discount
  const totalDiscount = cartItems.reduce((acc, item) => acc + parseFloat(item?.discountAmount || 0), 0);

  // ✅ Final Total after discount
  const finalTotal = Math.max(subtotal - totalDiscount, 0);

  // Applied coupon info from first item with coupon applied
  const appliedCoupon = cartItems.find((item) => item?.couponId);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (amount) => {
    if (!mounted) return `Rs. ${amount}`;
    return `Rs. ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const { firstName, lastName, address, city, state, pincode, phone, email } = formData;

    if (!firstName || !lastName || !address || !city || !state || !pincode || !phone || !email) {
      toast.error("Please fill all the required details.");
      return;
    }

    const orderData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      couponId: appliedCoupon?.couponId || null,
      couponCode: appliedCoupon?.couponCode || null,
      discountAmount: totalDiscount.toFixed(2),
    };

    dispatch(placeOrder(orderData, cartItems, userProfile, finalTotal, router))
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong while placing the order.");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Billing Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
              <h2 className="text-[36px] font-semibold text-gray-900 mb-8">Billing details</h2>
              <div className="space-y-6">
                {/* Form Inputs - Unchanged */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[16px] mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[16px] mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] mb-2">Country / Region</label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none bg-white pr-10"
                      required
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[16px] mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[16px] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 h-fit">
              <div className="border-b pb-6 mb-6">
                <h3 className="text-[24px] font-semibold mb-4">Product</h3>
                {cartItems.map((item, index) => (
                  <div key={`${item.product}-${index}`} className="flex justify-between mb-4 text-gray-700">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                {/* Discount & Final Total */}
                <div className="flex justify-between font-medium mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between font-medium mb-2 text-green-700">
                    <span>Discount</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-[#B88E2F]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="directBankTransfer"
                    checked={formData.paymentMethod === "directBankTransfer"}
                    onChange={handleInputChange}
                  />
                  <label className="text-gray-700">Direct Bank Transfer</label>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={formData.paymentMethod === "cashOnDelivery"}
                    onChange={handleInputChange}
                  />
                  <label className="text-gray-700">Cash On Delivery</label>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
