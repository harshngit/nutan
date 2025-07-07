import React from 'react';
import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt } from 'react-icons/fa';

export default function ServiceFeatures() {
  const features = [
    {
      img: "/asset/Home/box.png",
      title: "Free Shipping",
      description: "Free shipping on all US order or order above $200"
    },
    {
     img: "/asset/Home/headset.png",
      title: "Support 24/7",
      description: "Contact us 24 hours a day, 7 days a week"
    },
    {
     img: "/asset/Home/return.png",
      title: "30 Days Return",
      description: "Simply return it within 30 days for an exchange"
    },
    {
     img: "/asset/Home/credit-card.png",
      title: "100% Payment Secure",
      description: "We ensure secure payment with PEV"
    }
  ];

  return (
    <div className="bg-gray-200 font-poppins py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5rem]">
          {features.map((feature, index) => (
            <div key={index} className="text-start">
              <div className="flex justify-start mb-4">
                <div className="w-16 h-16  flex items-center justify-center">
                  <img src={feature.img} alt={feature.title} className="w-12 h-12 object-contain" />
                </div>
              </div>
              <h3 className="text-[18px] font-semibold text-black mb-2">
                {feature.title}
              </h3>
              <p className="text-[14px] text-black leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}