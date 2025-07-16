"use client";

import React, { useState, useEffect } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "@/actions/orderAction";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase.config";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems } = useSelector((state) => state.cart);
  const { userProfile } = useSelector((state) => state.user);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);


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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + parseFloat(item?.discountAmount || 0), 0);
  const finalTotal = Math.max(subtotal - totalDiscount, 0);
  const appliedCoupon = cartItems.find((item) => item?.couponId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userProfile?.uid) return;
      const userRef = doc(db, "users", userProfile.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().addresses) {
        setAddresses(docSnap.data().addresses);
      }
    };
    fetchAddresses();
  }, [userProfile]);

  const formatPrice = (amount) => {
    if (!mounted) return `Rs. ${amount}`;
    return `Rs. ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAddressSelect = (addressObj, index) => {
  setFormData({
    ...formData,
    firstName: addressObj.name.split(" ")[0] || "",
    lastName: addressObj.name.split(" ")[1] || "",
    address: addressObj.address,
    city: addressObj.city,
    state: addressObj.state,
    pincode: addressObj.pincode,
    phone: addressObj.phone,
  });
  setSelectedAddressIndex(index); // ✅ set selected index
};


  const handlePlaceOrder = () => {
    const { firstName, lastName, address, city, state, pincode, phone, email } = formData;
    if (!firstName || !lastName || !address || !city || !state || !pincode || !phone || !email) {
      toast.error("Please fill all the required details.");
      return;
    }

    const orderData = {
      ...formData,
      name: `${firstName} ${lastName}`,
      couponId: appliedCoupon?.couponId || null,
      couponCode: appliedCoupon?.couponCode || null,
      discountAmount: totalDiscount.toFixed(2),
    };

    dispatch(placeOrder(orderData, cartItems, userProfile, finalTotal, router))
      .then(() => toast.success("Order placed successfully!"))
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while placing the order.");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
            {/* Billing Section */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="lg:text-[36px] text-[28px] font-semibold text-gray-900 mb-6">Billing details</h2>

              {/* Address Selector */}
              <div className="flex flex-wrap gap-8 mb-8">
{addresses.map((addr, index) => (
  <div
    key={index}
    className={`border-2 p-4 rounded cursor-pointer lg:w-[300px] w-[280px] bg-white shadow transition-all duration-200 ${
      selectedAddressIndex === index ? "border-blue-500" : "border-gray-300"
    } hover:bg-gray-100`}
    onClick={() => handleAddressSelect(addr, index)}
  >
    <p><strong>{addr.name}</strong></p>
    <p>{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
    <p>{addr.phone}</p>
  </div>
))}
</div>


              {/* Billing Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                  </div>
                  <div>
                    <label className="block mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                  </div>
                </div>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full border px-4 py-3 rounded" />
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 h-fit">
              <h3 className="text-[24px] font-semibold mb-6">Order Summary</h3>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700 mb-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between font-medium text-green-700">
                  <span>Discount</span>
                  <span>-{formatPrice(totalDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total</span>
                <span className="text-[#B88E2F]">{formatPrice(finalTotal)}</span>
              </div>

              {/* Payment Options */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="directBankTransfer" checked={formData.paymentMethod === "directBankTransfer"} onChange={handleInputChange} />
                  <label>Direct Bank Transfer</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="cashOnDelivery" checked={formData.paymentMethod === "cashOnDelivery"} onChange={handleInputChange} />
                  <label>Cash On Delivery</label>
                </div>
              </div>

              <button onClick={handlePlaceOrder} className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
