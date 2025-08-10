import Image from 'next/image';
import React from 'react';
import image from '../../../public/asset/blog/aboutus.png';

const AboutUs = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src={image}
                alt="About us"
                className="w-full h-64 md:h-full object-cover rounded-2xl shadow-lg"
              />
              {/* Optional overlay for better visual effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-4xl font-bold text-gray-900 leading-tight">
                About Us
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-[#3B3310] font-semibold italic">
                "At Nutan Overseas FZE, we believe that a gift is more than just a gesture — it’s a reflection of your values, your brand, and your commitment to sustainability."
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Founded in the UAE, Nutan Overseas specializes in premium, eco-conscious corporate gifting solutions that are thoughtfully designed to leave a lasting impression. Whether you're welcoming new employees, celebrating client milestones, or curating festive giveaways, we help you deliver meaningful gifts with purpose and style.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Our catalog features a wide range of custom-brandable products made from recycled, biodegradable, and sustainable materials — including RPET, bamboo, cork, wheat straw, and more. From functional office accessories to elegant drinkware and lifestyle sets, every product is chosen with care and responsibility.
              </p>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
We partner with trusted manufacturers and logistics providers to ensure the highest quality standards and timely fulfillment across the UAE, India, and the GCC. Whether you're ordering in bulk or creating bespoke gift kits, our end-to-end service ensures a seamless experience — from selection to doorstep delivery.              </p>

              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
At Nutan Overseas, we’re more than a gifting company — we’re your sustainability partner in corporate culture.              </p>
            </div>

            {/* Optional CTA Button */}
            <div className="pt-3">
              <button className="bg-[#3B3310] text-white px-6 py-3 rounded-lg transition duration-300 font-medium shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;