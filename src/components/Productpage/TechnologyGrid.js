"use client";

import { useState } from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FiFilter } from "react-icons/fi"; 
import ProductCard from "@/components/ProductCart";


const backpacks = [
  {
    id: 1,
    title: "Beige Pedal Daypack",
    image: "/asset/products/1.png",
    price: 1699,
    original: 2499,
    isNew: false,
    isRecycled: false,
  },
  {
    id: 2,
    title: "Black Wing Backpack",
        image: "/asset/products/1.png",

    price: 3499,
    original: 4499,
    isNew: true,
    isRecycled: false,
  },
  {
    id: 3,
    title: "Pivot Lunar Daypack - Seagrass",
        image: "/asset/products/1.png",

    price: 3499,
    original: 3999,
    isNew: false,
    isRecycled: true,
  },
  {
    id: 4,
    title: "Pivot Lunar Daypack - Sand",
        image: "/asset/products/1.png",

    price: 3499,
    original: 3999,
    isNew: false,
    isRecycled: true,
  },
  {
    id: 5,
    title: "Beige Pedal Daypack",
    image: "/asset/products/1.png",
    price: 1699,
    original: 2499,
    isNew: false,
    isRecycled: false,
  },
  {
    id: 6,
    title: "Black Wing Backpack",
        image: "/asset/products/1.png",

    price: 3499,
    original: 4499,
    isNew: true,
    isRecycled: false,
  },
  {
    id: 7,
    title: "Pivot Lunar Daypack - Seagrass",
        image: "/asset/products/1.png",

    price: 3499,
    original: 3999,
    isNew: false,
    isRecycled: true,
  },
  {
    id: 8,
    title: "Pivot Lunar Daypack - Sand",
        image: "/asset/products/1.png",

    price: 3499,
    original: 3999,
    isNew: false,
    isRecycled: true,
  },
];

export default function TechnologyGrid() {
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
        className={`z-40 bg-white border shadow-md transition-transform duration-300 ease-in-out
          ${
            showFilters
              ? "translate-x-0"
              : "-translate-x-full"
          }
          absolute top-[132px] left-0 w-64
          lg:absolute lg:top-[50px]
          sm:fixed sm:top-0 sm:h-screen
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

          {/* Storage */}
          <div>
            <h3 className="font-semibold mb-2">STORAGE</h3>
            {["Bottle", "Laptop", "up to 14”", "up to 15.5”", "up to 15”", "up to 16”"].map(
              (label) => (
                <div key={label} className="flex items-center mb-1">
                  <input type="checkbox" className="mr-2" />
                  <label>{label}</label>
                </div>
              )
            )}
          </div>

          {/* Capacity */}
          <div>
            <h3 className="font-semibold mb-2">CAPACITY</h3>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" />
                <label>{10 + i} Litres</label>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Overlay when filters are open */}
      {showFilters && (
        <div
          className="fixed inset-0  z-30"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          showFilters ? "ml-64" : ""
        }`}
      >
        <h1 className="flex justify-center items-center text-[42px] font-bold mx-auto">BACKPACKS</h1>
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
          {backpacks.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        isLiked={wishlist.includes(item.id)}
                        toggleWishlist={toggleWishlist}
                      />
                    ))}
        </div>
      </div>
    </div>
  );
}
