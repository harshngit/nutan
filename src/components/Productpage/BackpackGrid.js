
"use client";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import ProductCard from "@/components/ProductCart";

export default function BackpackGrid({ product = [] }) {
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div
  className={`transition-transform duration-300 ease-in-out bg-white border shadow-md z-40
    fixed top-0 left-0 w-64 h-screen
    ${showFilters ? "translate-x-0" : "-translate-x-full"}
    lg:fixed lg:top-[70px] lg:left-0
  `}
>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold text-md">FILTERS</h2>
          <button
            className="text-sm bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => setShowFilters(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[80vh] space-y-6">
          {/* Sort By */}
          <div>
            <h3 className="font-semibold mb-2">SORT BY</h3>
            {["Newest", "Popularity", "Discount", "Price: Low To High", "Price: High To Low"].map(
              (label) => (
                <div key={label} className="flex items-center mb-1">
                  <input type="radio" name="sort" className="mr-2" />
                  <label>{label}</label>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showFilters && (
  <div
    className="fixed inset-0 z-30 bg-black bg-opacity-30 lg:hidden"
    onClick={() => setShowFilters(false)}
  />
)}

      {/* Main Content */}
<div
  className={`flex-1 transition-all duration-300
    ${showFilters ? "lg:ml-64" : ""}
  `}
>
        <h1 className="flex justify-center items-center text-[42px] font-bold mx-auto">Bags</h1>
        <div className="flex items-center justify-between px-4 py-6 border-b">
          {!showFilters && (
            <button
              onClick={() => setShowFilters(true)}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <FiFilter className="text-lg" />
              FILTERS & SORT
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {product?.map((item) => (
            <ProductCard
              key={item.id}
              item={{
                id: item.id,
                title: item.productName,
                image: item.productImages?.[0] || "/placeholder.png",
                price: item.variation?.[0]?.price || item.productPrice,
                original: item.productPrice,
              }}
              isLiked={wishlist.includes(item.id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
