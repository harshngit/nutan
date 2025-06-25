import React from 'react';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-stone-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Thank you for your<br />purchase!
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your order will be processed within 24 hours during working days. We will 
                notify you by email once your order has been shipped.
              </p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing address</h2>
                
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-20">Name</span>
                    <span className="text-gray-800 font-medium">Jane Smith</span>
                  </div>
                  
                  <div className="flex">
                    <span className="text-gray-600 w-20">Address</span>
                    <div className="text-gray-800">
                      <div>456 Oak St #3b, San Francisco,</div>
                      <div>CA 94102, United States</div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <span className="text-gray-600 w-20">Phone</span>
                    <span className="text-gray-800">+1 (415) 555-1234</span>
                  </div>
                  
                  <div className="flex">
                    <span className="text-gray-600 w-20">Email</span>
                    <span className="text-gray-800">jane.smith@email.com</span>
                  </div>
                </div>
              </div>
              
              <button className="bg-red-400 hover:bg-red-500 text-white font-medium px-8 py-3 rounded-full transition-colors">
                Track Your Order
              </button>
            </div>
            
            {/* Right Column */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <div>
                  <div className="mb-1">Date</div>
                  <div className="font-medium text-gray-800">02 May 2023</div>
                </div>
                <div>
                  <div className="mb-1">Order Number</div>
                  <div className="font-medium text-gray-800">024-125478956</div>
                </div>
                <div>
                  <div className="mb-1">Payment Method</div>
                  <div className="font-medium text-gray-800">Mastercard</div>
                </div>
              </div>
              
              {/* Product Items */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-400 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">All In One Chocolate Combo</h3>
                    <p className="text-sm text-gray-500">Pack: Medium</p>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                  </div>
                  <div className="font-semibold text-gray-800">$50.00</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-purple-400 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Desire Of Hearts</h3>
                    <p className="text-sm text-gray-500">Pack: Large</p>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                  </div>
                  <div className="font-semibold text-gray-800">$50.00</div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>$100.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$2.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-semibold text-gray-800">
                  <span>Order Total</span>
                  <span>$107.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom right watermark */}
      <div className="fixed bottom-4 right-4 text-gray-400 text-sm font-light">
        <div className="text-right">
          <div className="text-xs">UI</div>
          <div className="text-xs">DESIGNED</div>
        </div>
      </div>
    </div>
  );
}