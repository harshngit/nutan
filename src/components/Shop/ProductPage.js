import React from 'react'
import { useState } from "react"
import { FiShare2, FiRefreshCw, FiHeart } from "react-icons/fi"
import LargeProductData from '@/data/LargeProductData'
import Link from 'next/link'

import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQuantity } from "@/actions/cartAction";
import { toast } from "react-toastify";


const ProductPage = ({ products = [], loading }) => {
  const formatPrice = (price) => `Rp ${price?.toLocaleString("id-ID") || '0'}`
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userProfile } = useSelector((state) => state.user) || {};
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = 3 // Calculate based on your actual data length
  
  

  if (loading) return (
    <div className="bg-white w-full lg:h-auto h-auto pt-10">
      <div className="p-8 text-center">Loading products...</div>
    </div>
  )

  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Add logic to fetch new products or filter existing data
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
}



const handleAddToCart = (product) => {
  const productId = product._id || product.id;

  // Optional: If your grid products don't have size/color, skip this check.
  const existingItem = cartItems.find(
    (item) => item.product === productId
  );

  if (existingItem) {
    dispatch(updateCartQuantity(existingItem.product, existingItem.size, existingItem.color, existingItem.quantity + 1));
    toast.success("Updated quantity in your cart.");
  } else {
    const cartItem = {
      user: userProfile,
      product: productId,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages?.[0],
      size: "", // or default size if applicable
      quantity: 1,
      color: "", // or default color if applicable
      couponId: "",
      couponCode: "",
      discountAmount: "",
      couponAmountDetails: "",
    };
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart.");
  }
};


   

    return (
        <div className='bg-white w-full lg:h-auto h-auto pt-10'>

            {/* <div className='lg:py-1 py-5 px-5 lg:px-10 flex justify-center items-center'>
                <h2 className='font-bold lg:text-[32px] text-[#3A3A3A] text-[18px]'>Our Products</h2>
            </div> */}
            <div className="px-8 lg:px-[90px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-[32px]">
                     {products.map((product) => (
                       <Link href={`/shop/${product.id}`}>
                         <div key={product.id} className="relative lg:w-[285px] group border  overflow-hidden">
                            <div className="relative h-[250px]">
                            <img 
                              src={product.productImages?.[0] || "/default-product.jpg"} 
                              alt={product.productName} 
                              className="w-full h-full object-cover"
                            />
                            {product.productImages?.[1] && (
                              <img
                                src={product.productImages[1]}
                                alt={`${product.productName} hover`}
                                className="w-full h-full hidden lg:block object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            )}
                          </div>

                            {/* Product badges */}
                            {product.discount && (
                                <span className="absolute w-12 h-12 flex justify-center items-center rounded-full top-2 left-2 bg-[#E97171] text-white text-[16px] px-2 py-2">
                                    -{product.discount}%
                                </span>
                            )}

                            {product.isNew && (
                                <span className="absolute top-2 right-2 w-12 h-12 flex justify-center items-center bg-[#2EC1AC] text-white text-sm px-2 py-1 rounded-full">
                                    New
                                </span>
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Add to Cart Button */}
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault(); // Prevent link navigation on button click
                                    handleAddToCart(product);
                                  }} 
                                  className="bg-white text-[#B88E2F] px-12 py-3 font-semibold text-base mb-6 hover:bg-gray-50 transition-colors"
                                >
                                  Add to cart
                                </button>


                                {/* Action Buttons Row */}
                                <div className="flex items-center gap-6 text-white">
                                    {/* Share */}
                                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiShare2 className="w-4 h-4" />
                                        <p>Share</p>
                                    </button>

                                    {/* Compare */}
                                    <Link href={"/productcomparison"} className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiRefreshCw className="w-4 h-4" />
                                        <p>Compare</p>
                                    </Link>

                                    {/* Like */}
                                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiHeart className="w-4 h-4" />
                                        <p>Like</p>
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 bg-[#F4F5F7]">
                                
                               <h3 className="font-semibold text-lg">{product.productName}</h3>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
								                    {(product?.productDescription || '').replace(/<[^>]+>/g, '')}</p>
                                <p className="text-base font-semibold mt-2 text-black">
                                     {formatPrice(product.productPrice)}
                                    {product.originalPrice && (
                                    <p className="text-gray-400 line-through text-sm mt-2">
                                      {formatPrice(product.originalPrice)}
                                    </p>
                                  )}
                                </p>
                            </div>
                        </div>
                       </Link>
                    ))}
                </div>
                
                {/* Pagination Component */}
                <div className="mt-[70px] flex justify-center">
                  <div className="flex items-center  gap-[38px]">
                    {/* Page Numbers */}
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 flex  items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-[#B88E2F] text-white"
                            : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className={`px-6 h-12 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>



            </div>
        </div>
    )
}

export default ProductPage