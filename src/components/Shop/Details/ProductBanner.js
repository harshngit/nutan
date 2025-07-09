'use client';

import Image from 'next/image';
import React from 'react';
import img1 from "../../../../public/asset/browse/collection1.webp";
import img2 from "../../../../public/asset/browse/collection2.webp";

const SnapOnBanner = () => {
  return (
    <section className="w-full bg-white ">
      {/* Original Section */}
      <div className="max-w-full flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="lg:pl-8 text-center lg:text-left lg:w-1/2 ">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            SNAPON ENVELOPE SLEEVE
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mb-8 lg:mb-0">
            Carefully crafted with premium quality, pebbled leatherite, the SnapOn Envelope Sleeve offers all-round protection to your laptop.
          </p>
        </div>

        {/* Image Content */}
        <div className="flex justify-center lg:justify-end lg:w-1/2">
          <Image
            src={img1}
            alt="SnapOn Sleeve Variants"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Reversed Section */}
      <div className="max-w-full flex flex-col-reverse lg:flex-row items-center">
        {/* Image Content */}
        <div className="flex justify-center lg:justify-start lg:w-1/2 ">
          <Image
            src={img2}
            alt="Steel Bottle"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="lg:pl-8 text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            STAINLESS STEEL BOTTLE
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mb-8 lg:mb-0">
            Durable and stylish, this stainless steel bottle keeps your beverages hot or cold for hours, perfect for everyday hydration on the go.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SnapOnBanner;
