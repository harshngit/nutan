"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  const productPrice = 250000;
  const subtotal = productPrice * quantity;
  const total = subtotal; // Assuming no additional fees for this example

  // Ensure component is mounted before formatting numbers
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (amount) => {
    if (!mounted) {
      // Return simple format for server-side rendering
      return `Rs. ${amount}`;
    }
    // Use consistent formatting on client side
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    setQuantity(newQuantity);
  };

  return (
    <div className=" font-poppins bg-white p-4 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white overflow-hidden">
              {/* Table Header */}
              <div className="bg-orange-50 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-[16px] font-medium text-black">
                  <div className="col-span-5 md:col-span-4">Product</div>
                  <div className="col-span-3 md:col-span-2 text-center">Price</div>
                  <div className="col-span-2 md:col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 md:col-span-3 text-center">Subtotal</div>
                  <div className="col-span-0 md:col-span-1"></div>
                </div>
              </div>
              
              {/* Product Row */}
              <div className=" py-14">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-5 md:col-span-4 flex items-center space-x-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img 
                        src="/asset/Shop/1.png"
                        alt="Asgaard sofa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">Asgaard sofa</h3>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-3 md:col-span-2 text-center">
                    <span className="text-sm md:text-base text-gray-600" suppressHydrationWarning={true}>
                      {formatPrice(productPrice)}
                    </span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-2 md:col-span-2 flex justify-center">
                    <input
                     suppressHydrationWarning={true}
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-12 h-8 md:w-16 md:h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent"
                    />
                  </div>
                  
                  {/* Subtotal */}
                  <div className="col-span-2 md:col-span-3 text-center">
                    <span className="text-sm md:text-base font-medium text-gray-900" suppressHydrationWarning={true}>
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  
                  {/* Delete Button */}
                  <div className="hidden md:block md:col-span-1 text-center">
                    <button className="text-[#B88E2F] hover:text-[#b88f2fe1] transition-colors">
                      <FaTrash size={18} />
                    </button>
                  </div>
                  
                  {/* Mobile Delete Button */}
                  <div className="col-span-12 md:hidden flex justify-end mt-2">
                    <button className="text-[#B88E2F] hover:text-[#b88f2fe1]  transition-colors">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cart Totals Section */}
          <div className="lg:col-span-1">
            <div className="bg-[#F9F1E7] rounded-lg py-6 px-12 sticky top-8">
              <h2 className="lg:text-[32px] text-[18px] font-semibold text-gray-900 mb-6 text-center">Cart Totals</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-[16px] text-black font-medium">Subtotal</span>
                  <span className="text-[16px] text-gray-600 font-[400]" suppressHydrationWarning={true}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-black font-medium text-[16px]">Total</span>
                  <span className="text-[#B88E2F] font-bold text-[20px]" suppressHydrationWarning={true}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
              <Link href="/checkout" className="w-[80%] flex items-center justify-center bg-[#F9F1E7] hover:bg-[#F9F1E7] text-black text-[20px] font-medium py-3 px-6 rounded-[15px] border border-black transition-colors duration-200 focus:outline-none ">
                Check Out
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}