'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/Home/simplebanner.png"

import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const SimpleBanner = () => {
  return (
    <div className="relative w-full md:h-[650px] h-[250px] overflow-hidden">
      {/* Background Image */}
      <Image 
        src={Banner} 
        alt="Corporate Gifting" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 lg:p-12">
        {/* Main content - Left side */}
        <div className="flex-1 flex items-end">
          <div className="max-w-lg">
            <h1 className="text-white text-[20px] lg:text-[32px] font-bold leading-tight">
              CORPORATE GIFTING
            </h1>
            <p className="text-white text-[10px] lg:text-[16px] mb-4 leading-relaxed opacity-90">
              It is the season to celebrate and nurture everlasting bonds. Build lasting 
              relationships with our bespoke corporate solutions.
            </p>
            <button className="bg-[#3B3310] text-[#EAD987] lg:px-8 px-4 lg:py-3 py-2 rounded-lg font-bold md:text-sm text-[10px] tracking-wider hover:bg-gray-100 transition-colors duration-300">
            ENQUIRE NOW
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBanner;
