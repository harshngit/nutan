'use client';
import React from 'react';
import { useCurrency } from '@/Context/CurrencyProvider'; // ✅ import useCurrency hook

const CartOrder = ({ orderDetails }) => {
  const { formatPrice } = useCurrency(); // ✅ use formatPrice
  
  return (
    <>
      {/* Desktop/Tablet Header - Hidden on mobile */}
      <div className='hidden md:grid grid-cols-6 mb-5 gap-2'>
        <h4 className="font-semibold text-sm">Product Image</h4>
        <h4 className="font-semibold text-sm">Product Name</h4>
        <h4 className="font-semibold text-sm">Product Quantity</h4>
        <h4 className="font-semibold text-sm">Product Size</h4>
        <h4 className="font-semibold text-sm">Product Color</h4>
        <h4 className="font-semibold text-sm">Product Price</h4>
      </div>

      {/* Scrollable Content */}
      <div className='h-[20vh] md:h-[25vh] overflow-y-scroll scrollbar-hide'>
        {
          orderDetails?.dimensions?.map((item, index) => (
            <div key={index}>
              {/* Desktop/Tablet Layout */}
              <div className='hidden md:grid grid-cols-6 gap-2 py-2 border-b border-gray-100 items-center'>
                <img 
                  src={item?.p_img} 
                  className='w-[50px] h-[50px] object-cover rounded-md' 
                  alt={item?.p_name || "Product"} 
                />
                <h4 className="text-sm truncate">{item?.p_name}</h4>
                <h4 className="text-sm">{item?.p_qty}</h4>
                <h4 className="text-sm">{item?.p_size}</h4>
                <div className='w-5 h-5 rounded-full border border-gray-300' 
                     style={{ background: item?.p_color }}>
                </div>
                <h4 className="text-sm font-semibold">{formatPrice(item?.p_price)}</h4>
              </div>

              {/* Mobile Layout - Card Style */}
              <div className='md:hidden bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm'>
                <div className='flex gap-3'>
                  {/* Product Image */}
                  <div className='flex-shrink-0'>
                    <img 
                      src={item?.p_img} 
                      className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border' 
                      alt={item?.p_name || "Product"} 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className='flex-1 min-w-0'>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2">
                      {item?.p_name}
                    </h4>
                    
                    {/* Product Info Grid */}
                    <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm'>
                      <div>
                        <span className="text-gray-500">Qty:</span>
                        <span className="ml-1 font-medium">{item?.p_qty}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Size:</span>
                        <span className="ml-1 font-medium">{item?.p_size}</span>
                      </div>
                      <div className='flex items-center'>
                        <span className="text-gray-500">Color:</span>
                        <div className='w-4 h-4 rounded-full border border-gray-300 ml-2' 
                             style={{ background: item?.p_color }}>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-1 font-semibold text-Black">
                          {formatPrice(item?.p_price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default CartOrder;