"use client";
import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";

export default function Checkout() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    townCity: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'directBankTransfer'
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (amount) => {
    if (!mounted) {
      return `Rs. ${amount}`;
    }
    return `Rs. ${amount.toLocaleString('en-IN')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Billing Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h2 className="text-[36px] font-semibold text-gray-900 mb-8">Billing details</h2>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-[16px] font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                   suppressHydrationWarning={true}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[16px] font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                   suppressHydrationWarning={true}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                />
              </div>

              {/* Country/Region */}
              <div>
                <label htmlFor="country" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Country / Region
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors appearance-none bg-white pr-10"
                    required
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label htmlFor="streetAddress" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Street address
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                  required
                />
              </div>

              {/* Town/City */}
              <div>
                <label htmlFor="townCity" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Town / City
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="townCity"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                  required
                />
              </div>

              {/* Province */}
              <div>
                <label htmlFor="province" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Province
                </label>
                <div className="relative">
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors appearance-none bg-white pr-10"
                    required
                  >
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                  </select>
                  <RiArrowDownSLine className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-[16px] font-medium text-gray-700 mb-2">
                  ZIP code
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[16px] font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                 suppressHydrationWarning={true}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors"
                  required
                />
              </div>

              {/* Additional Information */}
              <div>
                <textarea
                 suppressHydrationWarning={true}
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Additional information"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2  transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 h-fit">
            {/* Product Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[24px] font-semibold text-gray-900">Product</h3>
                <h3 className="text-[24px] font-semibold text-gray-900">Subtotal</h3>
              </div>
              
              <div className="flex justify-between items-center text-[16px] text-gray-600 mb-4">
                <span>Asgaard sofa × 1</span>
                <span suppressHydrationWarning={true}>{formatPrice(250000)}</span>
              </div>
              
              <div className="flex justify-between items-center text-gray-900 mb-2">
                <span>Subtotal</span>
                <span suppressHydrationWarning={true}>{formatPrice(250000)}</span>
              </div>
              
              <div className="flex justify-between items-center text-[24px] font-bold">
                <span>Total</span>
                <span className="text-[#B88E2F]" suppressHydrationWarning={true}>{formatPrice(250000)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <input
                 suppressHydrationWarning={true}
                  type="radio"
                  id="directBankTransfer"
                  name="paymentMethod"
                  value="directBankTransfer"
                  checked={formData.paymentMethod === 'directBankTransfer'}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4  border-gray-300"
                />
                <div>
                  <label htmlFor="directBankTransfer" className="font-medium text-gray-900">
                    Direct Bank Transfer
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                 suppressHydrationWarning={true}
                  type="radio"
                  id="directBankTransfer2"
                  name="paymentMethod"
                  value="directBankTransfer2"
                  checked={formData.paymentMethod === 'directBankTransfer2'}
                  onChange={handleInputChange}
                  className="h-4 w-4  border-gray-300"
                />
                <label htmlFor="directBankTransfer2" className="text-gray-700">
                  Direct Bank Transfer
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                 suppressHydrationWarning={true}
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={formData.paymentMethod === 'cashOnDelivery'}
                  onChange={handleInputChange}
                  className="h-4 w-4  border-gray-300"
                />
                <label htmlFor="cashOnDelivery" className="text-gray-700">
                  Cash On Delivery
                </label>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="text-sm text-gray-600 mb-6">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
              <a href="#" className="text-blue-600 hover:underline">
                privacy policy
              </a>
              .
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-white border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}