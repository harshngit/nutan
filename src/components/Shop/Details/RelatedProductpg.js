import React from 'react'
import { useState } from "react"
import { FiShare2, FiRefreshCw, FiHeart } from "react-icons/fi"
import RelatedProduct from '@/data/RelatedProduct'
import Link from 'next/link'

const RelatedProductpg = () => {

    const formatPrice = (price) => `Rp ${price.toLocaleString("id-ID")}`;

    const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = 3 // Calculate based on your actual data length

  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Add logic to fetch new products or filter existing data
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
}

   

    return (
        <div className='bg-white w-full lg:h-auto h-auto pt-10'>

            <div className='lg:py-[26px] py-5 px-5 lg:px-10 flex justify-center items-center'>
                <h2 className='font-bold lg:text-[32px] text-[#3A3A3A] text-[18px]'>Related Products</h2>
            </div>
            <div className="px-[90px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-[32px]">
                    {RelatedProduct.map((product, index) => (
                       <Link href={`/shop/${product.id}`}>
                         <div key={index} className="relative lg:w-[285px] group border  overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full" />

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
                                <button className="bg-white text-[#B88E2F] px-12 py-3 font-semibold text-base mb-6 hover:bg-gray-50 transition-colors">
                                Add to cart
                                </button>

                                {/* Action Buttons Row */}
                                <div className="flex items-center gap-6 text-white">
                                    {/* Share */}
                                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiShare2 className="w-4 h-4" />
                                        <span>Share</span>
                                    </button>

                                    {/* Compare */}
                                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiRefreshCw className="w-4 h-4" />
                                        <span>Compare</span>
                                    </button>

                                    {/* Like */}
                                    <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 transition-colors">
                                        <FiHeart className="w-4 h-4" />
                                        <span>Like</span>
                                    </button>
                                </div>
                            </div>

                            <div className="p-2 bg-[#F4F5F7]">
                                
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                              
                                <p className="text-sm text-gray-500">{product.description}</p>
                                <p className="text-base font-semibold text-black">
                                    {formatPrice(product.price)}
                                    {product.originalPrice && (
                                        <span className="text-gray-400 line-through text-sm ml-2">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                       </Link>
                    ))}
                </div>


                <div className="mt-[44px] flex justify-center">
                  <button className="border border-[#B88E2F] text-[#B88E2F] px-[70px] py-[12px] text-[16px] hover:text-black transition">
                    Show More
                  </button>
                </div>
                
                {/* Pagination Component */}
        



            </div>
        </div>
    )
}

export default RelatedProductpg