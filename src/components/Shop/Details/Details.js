'use client'
import React, { useState } from 'react'
import { FiMinus, FiPlus , FiStar } from 'react-icons/fi'
import { GoStarFill } from "react-icons/go";


const Details = ({ productDetails }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  // Extract unique sizes and colors
  const sizes = [...new Set(productDetails.variation?.map(v => v.size) || [])]
  const colors = [...new Set(productDetails.variation?.map(v => v.color) || [])]

  const handleQuantityChange = (action) => {
    setQuantity(prev => action === "increase" ? prev + 1 : Math.max(1, prev - 1))
  }

  const handleAddToCart = () => {
    // Placeholder: Replace with your cart logic
    console.log("Added to cart:", {
      productId: productDetails.id,
      selectedSize,
      selectedColor,
      quantity
    })
  }

  const handleCompare = () => {
    // Placeholder: Replace with your compare logic
    console.log("Added to compare:", productDetails.id)
  }

  const formatPrice = (price) => `Rp ${price?.toLocaleString("id-ID") || '0'}`

  return (
    <div className='px-5 py-5 w-full flex flex-col gap-6'>
      <h2 className='font-normal text-2xl text-[#000]'>{productDetails.productName}</h2>
      
      <div className='flex items-center gap-5'>
        <h2 className='font-normal text-2xl text-[#000]'>{formatPrice(productDetails.productPrice)}</h2>
        {productDetails.originalPrice && (
          <span className='text-[#9F9F9F] line-through'>{formatPrice(productDetails.originalPrice)}</span>
        )}
      </div>

      <div className='flex flex-row justify-start items-center gap-5 w-full'>
        <div className="flex flex-row justify-start items-center gap-1">
          <GoStarFill className="text-[#FFC700]" />
          <GoStarFill className="text-[#FFC700]" />
          <GoStarFill className="text-[#FFC700]" />
          <GoStarFill className="text-[#FFC700]" />
          <FiStar className="text-[#FFC700]" />
          	
          
        </div>
        <p className='px-4 font-400 text-[13px] text-[#9F9F9F] border-l-2'>Customer Review</p>
      </div>

      <div className='flex justify-start items-center w-full'>
        <p className='font-400 text-[18px] text-[#666666]'>{productDetails.description}</p>
      </div>

      <div className="w-full">
        {/* Size */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            Size: <span className="font-normal ml-2">{selectedSize}</span>
          </div>
        </div>
        <div className="flex gap-4 mb-6">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-10 h-10 text-sm font-medium rounded transition-all duration-150
                ${selectedSize === size
                  ? "bg-[#B88E2F] text-white"
                  : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color */}
        <div className="text-lg lg:py-4 font-semibold mb-2">
          Color: <span className="font-normal ml-2">{selectedColor}</span>
        </div>
        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border-2 
                ${selectedColor === color ? "ring-2 ring-offset-2 ring-black" : "border-gray-300"}`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="w-full flex flex-row lg:py-4 gap-2 border-b-2">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={quantity <= 1}
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="px-6 py-3 text-center min-w-[60px] font-medium text-[20px]">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="p-3 hover:bg-gray-50 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 text-[20px] px-10 py-3 border border-black rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
          >
            Add To Cart
          </button>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            className="flex items-center text-[20px] justify-center gap-2 px-10 py-3 border border-black rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
          >
            {/* <FiPlus className="w-4 h-4" /> */}
            Compare
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-[16px] w-20">SKU</span>
          <span className="text-gray-500">:</span>
          <span className="text-gray-600">{productDetails.sku || 'N/A'}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-[16px] w-20">Category</span>
          <span className="text-gray-500">:</span>
          <span className="text-gray-600">{productDetails.category || 'N/A'}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-500 w-20 text-[16px]">Tags</span>
          <span className="text-gray-500">:</span>
          <div className="flex flex-wrap text-[16px] gap-1">
            {(productDetails.tags || []).map((tag, index) => (
              <span key={tag} className="text-gray-600">
                {tag}{index < productDetails.tags.length - 1 && <span className="text-gray-400 ml-1">,</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-[16px] w-20">Share</span>
          <span className="text-gray-500">:</span>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/asset/Shop/facebook.png" alt="Facebook" className="w-8 h-8 p-1 hover:opacity-80" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/asset/Shop/linkdin.png" alt="LinkedIn" className="w-8 h-8 p-1 hover:opacity-80" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/asset/Shop/twitter.png" alt="Twitter" className="w-8 h-8 p-1 hover:opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
