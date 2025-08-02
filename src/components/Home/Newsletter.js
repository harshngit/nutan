"use client";

import React from "react";
import Image from "next/image";
import Banner from "../../../public/asset/Home/simplebanner3.png"

const Newsletter = () => {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="w-full h-[450px] md:h-[650px] relative">
        <Image
          src={Banner} // 🔁 Replace with your actual image path
          alt="Community Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full text-center text-white">
          <h2 className="text-xl md:text-4xl font-bold md:mb-4 mb-2">
            JOIN OUR COMMUNITY
          </h2>
          <p className="text-xs md:text-base mb-10">
            Subscribe to receive first time brand update, access to exclusive
            deals, and 15% off your first order.
          </p>

          <form className="flex flex-col md:flex-col items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Your e-mail"
              className="w-full md:w-[400px] px-4 py-2 rounded-sm text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black md:px-8 px-6 md:py-2 py-1 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              Subscribe
              <span className="ml-2 text-xl">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
