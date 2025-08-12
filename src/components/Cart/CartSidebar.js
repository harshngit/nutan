"use client";

import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem, updateCartQuantity } from "@/actions/cartAction";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useCurrency } from "@/Context/CurrencyProvider"; // ✅ use shared formatter

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // ✅ get formatter from currency context
  const { formatPrice } = useCurrency();

  const handleRemove = (item) => {
    dispatch(removeCartItem(item.product, item.size, item.color));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartQuantity(item.product, item.size, item.color, newQuantity));
  };

  // Subtotal is calculated in AED (your base) and then formatted via context
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <RxCross2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div key={`${item.product}-${index}`} className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-amber-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>

                    {/* ✅ Price formatted via currency context */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-[#B88E2F]">
                        {formatPrice(Number(item.price) || 0)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="p-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="p-1 border rounded hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item)}
                    className="w-6 h-6 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center"
                    aria-label="Remove item"
                  >
                    <RxCross2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-base font-medium">Subtotal</span>
              <span className="text-base font-semibold text-[#B88E2F]">
                {/* ✅ Subtotal formatted via currency context */}
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="border-t pt-4 grid grid-cols-3 gap-3">
              <Link href="/cart" className="btn-cart">
                Cart
              </Link>
              <Link href="/checkout" className="btn-cart">
                Checkout
              </Link>
              <Link href="/productcomparison" className="btn-cart">
                Compare
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
