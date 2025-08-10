import React from 'react';
import { MdEmail } from 'react-icons/md';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <h6 className="text-base md:text-xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h6>

        <div className="space-y-8">
          {/* 1. Orders & Pricing */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Name, email, phone</span>
              </li>
              
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Billing & shipping addresses</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Order preferences and history</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700"><strong>User location (based on browser/IP) </strong> to display prices in your local currency</span>
              </li>
              
            </ul>
          </section>

          {/* 2. IP & Usage */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              2. How We Use It
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Process orders</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Enhance your experience</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Send updates & support</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700"><strong>Display pricing based on your country</strong></span>
              </li>
            </ul>
          </section>


          {/* Support Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col">
                <p className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              We never sell or rent your data. We share it only with trusted partners like logistics providers.
            </p>
            <div className="flex items-center mb-4">
              <MdEmail className="text-[#3B3310] mr-2" size={18} />
              <span className="text-gray-700">
                Support: 
                <a 
                  href="mailto:support@nutanoverseas.com" 
                  className="text-gray-900 font-medium hover:text-pink-500 ml-1"
                >
                  support@nutanoverseas.com
                </a>
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;