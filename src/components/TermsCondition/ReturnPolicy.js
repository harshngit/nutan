import React from 'react';
import { MdEmail } from 'react-icons/md';

const ReturnPolicy = () => {
  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Return & Refund Policy
        </h1>

        <div className="space-y-8">
          {/* 1. Orders & Pricing */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              1. Returns
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Must be initiated within 7 days</span>
              </li>
              
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Products must be unused, in original packaging </span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700"><strong>Custom-branded items are non-returnable,</strong> unless defective</span>
              </li>
              
            </ul>
          </section>

          {/* 2. IP & Usage */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              2. Refunds
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Processed within 5–7 business days after inspection</span>
              </li>
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Shipping fees are non-refundable</span>
              </li>
            </ul>
          </section>

          {/* 3. Liability */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              3. Issues/Damages
            </h2>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <span className="w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
                <span className="text-gray-700">Report within 48 hours of receiving item</span>
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

export default ReturnPolicy;