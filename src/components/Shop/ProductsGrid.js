'use client'
import React from 'react'
import Link from 'next/link'

const ProductGrid = ({ products, currentPage, totalPages, onPageChange }) => {
  const formatPrice = (price) => `Rp ${price?.toLocaleString("id-ID") || '0'}`

  return (
    <div className="pb-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px]">
        {products.map((product) => (
          <div key={product.id} className="bg-white overflow-hidden group">
            <div className="relative">
              <img
                src={product.productImages?.[0] || "/default-product.jpg"}
                alt={product.productName}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Link 
                  href={`/shop/${product.id}`}
                  className="bg-white text-[#B88E2F] px-4 py-2 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold">{product.productName}</h3>
              <p className="text-[#B88E2F] font-bold mt-1">
                {formatPrice(product.productPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-4 py-2 border ${
                currentPage === i + 1 ? 'bg-[#B88E2F] text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid