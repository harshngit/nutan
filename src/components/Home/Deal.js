'use client'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import Link from 'next/link'

const Deal = ({ products = [], loading }) => {
  const formatPrice = (price) => `Rp ${price?.toLocaleString("id-ID") || '0'}`

  if (loading) return (
    <div className="bg-white w-full lg:h-auto h-auto pt-10">
      <div className="p-8 text-center">Loading products...</div>
    </div>
  )

  return (
    <div className='bg-white w-full lg:h-auto h-auto pt-10'>
      <div className='lg:py-1 py-5 px-5 lg:px-10 flex justify-center items-center'>
        <h2 className='font-bold lg:text-[32px] text-[#3A3A3A] text-[18px]'>Our Products</h2>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative lg:w-[100%] group border rounded-[28px] overflow-hidden">
              {/* Product images with hover effect */}
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
                <span className="absolute top-2 left-2 bg-[#E97171] text-white text-sm px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}

              {/* Product info */}
              <div className="p-4 bg-[#F4F5F7]">
                <h3 className="font-semibold text-lg">{product.productName}</h3>
				<p className="text-gray-500 text-sm mt-1 line-clamp-2">
								{(product?.productDescription || '').replace(/<[^>]+>/g, '')}
								
				</p>
                <div className="flex items-center mt-2">
                  <p className="text-base font-semibold text-black">
                    {formatPrice(product.productPrice)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-gray-400 line-through text-sm ml-2">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
                </div>
              </div>

              <Link href={`/shop/${product.id}`} className="absolute inset-0" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/shop" className="border border-[#B88E2F] text-[#B88E2F] px-6 py-2 hover:bg-[#B88E2F] hover:text-white transition">
            Show More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Deal