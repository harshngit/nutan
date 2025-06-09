"use client"

import { useState } from "react"
import Image from "next/image"
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Asgaard sofa",
      price: 250000,
      quantity: 1,
      image: "/asset/Shop/1.png",
    },
    {
      id: "2",
      name: "Casaliving Wood",
      price: 270000,
      quantity: 1,
      image: "/asset/Shop/2.png",
    },
  ])

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Fixed formatPrice function to ensure consistent formatting
  const formatPrice = (price) => {
    // Use a consistent formatting approach that works the same on server and client
    return `Rs. ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close cart"
          >
            <RxCross2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-amber-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-black truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{item.quantity}</span>
                      <span className="text-sm text-gray-400">×</span>
                      <span className="text-sm font-medium text-[#B88E2F]" suppressHydrationWarning={true}>
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 w-6 h-6 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={`Remove ${item.name}`}
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
          <div className=" py-6 px-2 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-black">Subtotal</span>
              <span className="text-base font-semibold text-[#B88E2F]" suppressHydrationWarning={true}>
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-6 grid grid-cols-3 gap-3">
              <Link href="/cart" className="px-4 py-2 text-[12px] font-[400] text-black bg-white border border-black rounded-full hover:bg-gray-50 transition-colors duration-200">
                Cart
              </Link>
              <Link href="/checkout" className="px-4 py-2 text-[12px] font-[400] text-black bg-white border border-black rounded-full hover:bg-gray-50 transition-colors duration-200">
                Checkout
              </Link>
              <Link href="/productcomparison" className="px-4 py-2 text-[12px] font-[400] text-black bg-white border border-black rounded-full hover:bg-gray-50 transition-colors duration-200">
                Comparison
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}