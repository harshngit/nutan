import React from 'react';
import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt } from 'react-icons/fa';

export default function ServiceFeatures() {
  const features = [
    {
      img: "/asset/Home/shipping-fast.png",
      title: "Free Shipping",
      description: "Free shipping on all US order or order above $200"
    },
    {
     img: "/asset/Home/customer-support.png",
      title: "Support 24/7",
      description: "Contact us 24 hours a day, 7 days a week"
    },
    {
     img: "/asset/Home/icons_exchange.png",
      title: "30 Days Return",
      description: "Simply return it within 30 days for an exchange"
    },
    {
     img: "/asset/Home/secure-payment.png",
      title: "100% Payment Secure",
      description: "We ensure secure payment with PEV"
    }
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <img src={feature.img} alt={feature.title} className="w-10 h-10 object-contain" />
                </div>
              </div>
              <h3 className="text-[19px] font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-[19px] text-gray-600 leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}