"use client";

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { removeCartItem, updateCartQuantity } from "@/actions/cartAction";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus } from "react-icons/fi";

export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity(item.product, item.size, item.color, newQuantity));
  };

  const handleRemove = (item) => {
    dispatch(removeCartItem(item.product, item.size, item.color));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (amount) => {
    if (!mounted) return `Rs. ${amount}`;
    return `Rs. ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
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
                      
                      {/* Product Info */}
                      <div className="col-span-5 md:col-span-4 flex items-center space-x-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image 
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            Size: {item.size} | Color:
                            <span
                              className="w-4 h-4 inline-block rounded-full border"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </p>

                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-3 md:col-span-2 text-center">
                        <span className="text-sm md:text-base text-gray-600">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {/* Quantity with Plus/Minus */}
                      <div className="col-span-2 md:col-span-2 flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          className="p-1 border rounded hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          className="p-1 border rounded hover:bg-gray-100"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-2 md:col-span-3 text-center">
                        <span className="text-sm md:text-base font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <div className="hidden md:block md:col-span-1 text-center">
                        <button onClick={() => handleRemove(item)} className="text-[#B88E2F] hover:text-[#b88f2fe1] transition-colors">
                          <FaTrash size={18} />
                        </button>
                      </div>

                      {/* Mobile Delete Button */}
                      <div className="col-span-12 md:hidden flex justify-end mt-2">
                        <button onClick={() => handleRemove(item)} className="text-[#B88E2F] hover:text-[#b88f2fe1] transition-colors">
                          <FaTrash size={18} />
                        </button>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F1E7] rounded-lg py-6 px-12 sticky top-8">
              <h2 className="lg:text-[32px] text-[18px] font-semibold text-gray-900 mb-6 text-center">Cart Totals</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-[16px] text-black font-medium">Subtotal</span>
                  <span className="text-[16px] text-gray-600 font-[400]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center py-2">
                  <span className="text-black font-medium text-[16px]">Total</span>
                  <span className="text-[#B88E2F] font-bold text-[20px]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Checkout/Login Button */}
              <div className="flex justify-center mt-6">
                {isAuthenticated ? (
                  <Link href="/checkout" className="w-[80%] flex items-center justify-center bg-[#F9F1E7] hover:bg-[#F9F1E7] text-black text-[20px] font-medium py-3 px-6 rounded-[15px] border border-black transition-colors duration-200 focus:outline-none">
                    Check Out
                  </Link>
                ) : (
                  <Link href="/login" className="w-[100%] flex items-center justify-center bg-[#F9F1E7] hover:bg-[#F9F1E7] text-black text-[20px] font-medium py-3 px-6 rounded-[15px] border border-black transition-colors duration-200 focus:outline-none">
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
