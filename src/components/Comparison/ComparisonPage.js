'use client';

import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function ComparisonPage() {
  const [selectedProduct, setSelectedProduct] = useState('');

  const products = [
    {
      id: 1,
      name: 'Asgaard Sofa',
      price: 'Rs. 250,000',
      rating: 4.7,
      reviews: 204,
      image: '/asset/Shop/1.png',
      specs: {
        salesPackage: '1 sectional sofa',
        modelNumber: 'TFCBLIGRBL6SRHS',
        secondaryMaterial: 'Solid Wood',
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion',
        fillingMaterial: 'Foam',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'No',
        maximumLoadCapacity: '280 KG',
        originOfManufacture: 'India',
        width: '265.32 cm',
      height: '76 cm',
      depth: '167.76 cm',
      weight: '45 KG',
      seatHeight: '41.52 cm',
      legHeight: '5.46 cm',
        warrantySummary: '1 Year Manufacturing Warranty',
      warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
      coveredInWarranty: 'Warranty Against Manufacturing Defect',
      notCoveredInWarranty: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
      domesticWarranty: '1 Year',
      }
    },
    {
      id: 2,
      name: 'Outdoor Sofa Set',
      price: 'Rs. 224,000',
      rating: 4.2,
      reviews: 145,
      image: '/asset/Shop/2.png',
      specs: {
        salesPackage: '1 Three Seater, 2 Single Seater',
        modelNumber: 'DTUBLIGRBL568',
        secondaryMaterial: 'Solid Wood',
        configuration: 'L-shaped',
        upholsteryMaterial: 'Fabric + Cotton',
        upholsteryColor: 'Bright Grey & Lion',
        fillingMaterial: 'Matte',
        finishType: 'Bright Grey & Lion',
        adjustableHeadrest: 'Yes',
        maximumLoadCapacity: '300 KG',
        originOfManufacture: 'India',
         width: '265.32 cm',
      height: '76 cm',
      depth: '167.76 cm',
      weight: '65 KG',
      seatHeight: '41.52 cm',
      legHeight: '5.46 cm',
        warrantySummary: '1 Year Manufacturing Warranty',
      warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
      coveredInWarranty: 'Warranty Against Manufacturing Defect',
      notCoveredInWarranty: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
       domesticWarranty: '3 Months',
      }
    }
  ];

  const specificationRows = [
    { label: 'Sales Package', key: 'salesPackage' },
    { label: 'Model Number', key: 'modelNumber' },
    { label: 'Secondary Material', key: 'secondaryMaterial' },
    { label: 'Configuration', key: 'configuration' },
    { label: 'Upholstery Material', key: 'upholsteryMaterial' },
    { label: 'Upholstery Color', key: 'upholsteryColor' }
  ];

  const specificationRows2 = [
    { label: 'Filling Material', key: 'salesPackage' },
    { label: 'Model Number', key: 'modelNumber' },
    { label: 'Secondary Material', key: 'secondaryMaterial' },
    { label: 'Configuration', key: 'configuration' },
    { label: 'Upholstery Material', key: 'upholsteryMaterial' },
    { label: 'Upholstery Color', key: 'upholsteryColor' }
  ];
  const specificationRowsDimensions = [
  { label: 'Width', key: 'width' },
  { label: 'Height', key: 'height' },
  { label: 'Depth', key: 'depth' },
  { label: 'Weight', key: 'weight' },
  { label: 'Seat Height', key: 'seatHeight' },
  { label: 'Leg Height', key: 'legHeight' }
];

    const specificationRows4 = [
    { label: 'Warranty Summary', key: 'warrantySummary' },
    { label: 'Warranty Service Type', key: 'warrantyServiceType' },
    { label: 'Covered in Warranty', key: 'coveredInWarranty' },
    { label: 'Not Covered in Warranty', key: 'notCoveredInWarranty' },
    { label: 'Domestic Warranty', key: 'domesticWarranty' },
    { label: '', key: 'addToCart', isButtonRow: true } // for the Add to Cart buttons
    ]




  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStar key="half\" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 leading-tight">
                Go to Product page for more Products
              </h2>
              <button className="text-gray-500 hover:text-gray-700 underline transition-colors">
                View More
              </button>
            </div>
          </div>

          {/* Main Content - Product Comparison */}
          <div className="lg:col-span-8">
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="bg-[#F4F5F7] p-6 flex items-center justify-center h-64">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      {product.price}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-900">
                        {product.rating}
                      </span>
                      <div className="flex gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        {product.reviews} Review{product.reviews !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications Table */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">General</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {specificationRows.map((spec, index) => (
                      <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3 border-r border-gray-200">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 w-1/3 border-r border-gray-200">
                          {products[0].specs[spec.key]}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 w-1/3">
                          {products[1].specs[spec.key]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Product </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {specificationRows2.map((spec, index) => (
                      <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3 border-r border-gray-200">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 w-1/3 border-r border-gray-200">
                          {products[0].specs[spec.key]}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 w-1/3">
                          {products[1].specs[spec.key]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dimensions Table */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 ">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Dimensions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                    <tbody>
                        {specificationRowsDimensions.map((spec, index) => (
                        <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3 border-r border-gray-200">
                            {spec.label}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 w-1/3 border-r border-gray-200">
                            {products[0].specs[spec.key]}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 w-1/3">
                            {products[1].specs[spec.key]}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>


            {/* Specifications Table */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Warranty</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                    <tbody>
                        {specificationRows4.map((spec, index) => (
                        <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3 border-r border-gray-200">
                            {spec.label}
                            </td>

                            {/* First Product Column */}
                            <td className="px-6 py-4 text-sm text-gray-700 w-1/3 border-r border-gray-200">
                            {spec.isButtonRow ? (
                                <button className="bg-[#B88E2F] text-white px-4 py-2 rounded  text-sm">
                                Add To Cart
                                </button>
                            ) : (
                                products[0].specs[spec.key]
                            )}
                            </td>

                            {/* Second Product Column */}
                            <td className="px-6 py-4 text-sm text-gray-700 w-1/3">
                            {spec.isButtonRow ? (
                                <button className="bg-[#B88E2F] text-white px-4 py-2 rounded  text-sm">
                                Add To Cart
                                </button>
                            ) : (
                                products[1].specs[spec.key]
                            )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white py-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add A Product
              </h3>
              <div className="relative">
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-[#B88E2F] text-white px-4 py-3 rounded-md appearance-none cursor-pointer hover:bg-[#A07A28] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-opacity-50"
                >
                  <option value="">Choose a Product</option>
                  <option value="sofa1">Modern Sectional Sofa</option>
                  <option value="sofa2">Luxury Recliner Set</option>
                  <option value="sofa3">Corner Sofa Set</option>
                  <option value="sofa4">Minimalist Sofa</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}