import React from 'react';
import { MdEmail } from 'react-icons/md';

const TermsConditions = () => {
  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-8">
          {/* 1. Orders & Pricing */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              1. Orders & Pricing
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Images/descriptions for reference only</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">
                  <strong>Prices shown in your local currency</strong> for convenience
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">
                  Final billing may be in AED, INR, or USD depending on your location/payment method
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Prices subject to change without notice</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Orders confirmed only upon payment</span>
              </li>
            </ul>
          </section>

          {/* 2. IP & Usage */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              2. IP & Usage
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Site content is the property of Nutan Overseas FZE</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Cannot be copied or reused without permission</span>
              </li>
            </ul>
          </section>

          {/* 3. Liability */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              3. Liability
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">
                  We're not liable for indirect losses from website use or products
                </span>
              </li>
            </ul>
          </section>

          {/* 4. Jurisdiction */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              4. Jurisdiction
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Governed by laws of the United Arab Emirates</span>
              </li>
            </ul>
          </section>

          {/* Support Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center">
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
  );
};

export default TermsConditions;