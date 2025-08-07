'use client';

import Image from 'next/image';
import React from 'react';
import DOMPurify from 'dompurify';

const SnapOnBanner = ({ productDetails }) => {
  return (
    <section className="w-full bg-white px-4 md:px-0">
      {/* Original Section */}
      <div className="max-w-full flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="lg:px-12 text-left lg:text-left lg:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-black md:mb-6 mb-2">
            {productDetails.bannerTitleOne}
          </h2>
          <div
            className="prose text-sm md:text-lg text-black max-w-xl mb-8 lg:mb-0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetails.bannerDescOne) }}
          ></div>
        </div>

        {/* Image Content */}
        <div className="flex justify-center lg:justify-end lg:w-1/2">
          <Image
            src={productDetails.bannerImageOne}
            alt="Banner One"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Reversed Section */}
      <div className="max-w-full flex flex-col-reverse lg:flex-row items-center md:pt-0 pt-8">
        {/* Image Content */}
        <div className="flex justify-center lg:justify-start lg:w-1/2">
          <Image
            src={productDetails.bannerImageTwo}
            alt="Banner Two"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="lg:px-12 text-left lg:text-left lg:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-black md:mb-6 mb-2">
            {productDetails.bannerTitleTwo}
          </h2>
          <div
            className="prose text-sm md:text-lg text-black max-w-xl mb-8 lg:mb-0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetails.bannerDescTwo) }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default SnapOnBanner;
