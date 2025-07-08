'use client';

import { useState } from "react";

export default function ProductDescriptionTabs({ productDetails }) {
  const [activeTab, setActiveTab] = useState("description");

  const description = productDetails?.productDescription || "No description available.";
  const additionalInfo = productDetails?.productDimension?.[0] || null;
  const reviews = productDetails?.productReviews || "No reviews available.";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center text-center mb-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`mr-8 pb-4 text-lg font-medium ${activeTab === "description" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`mr-8 pb-4 text-lg font-medium ${activeTab === "additional" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          Additional Information
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 text-lg font-medium ${activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"}`}
        >
          Reviews
        </button>
      </div>

      {/* Description Tab */}
      {activeTab === "description" && (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            {typeof description === "string" ? description.replace(/<[^>]+>/g, '') : "No description available."}
          </p>
        </div>
      )}

      {/* Additional Information Tab */}
      {activeTab === "additional" && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium mb-4">Product Specifications</h3>
          {additionalInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              {additionalInfo.weight && (
                <div>
                  <p className="font-medium">Weight</p>
                  <p className="text-gray-600">{additionalInfo.weight}</p>
                </div>
              )}
              {additionalInfo.dimensions && (
                <div>
                  <p className="font-medium">Dimensions</p>
                  <p className="text-gray-600">{additionalInfo.dimensions}</p>
                </div>
              )}
              {additionalInfo.materials && (
                <div>
                  <p className="font-medium">Materials</p>
                  <p className="text-gray-600">{additionalInfo.materials}</p>
                </div>
              )}
              {additionalInfo.batteryLife && (
                <div>
                  <p className="font-medium">Battery Life</p>
                  <p className="text-gray-600">{additionalInfo.batteryLife}</p>
                </div>
              )}
              {additionalInfo.color && (
    <div>
      <p className="font-medium">Color</p>
      <p className="text-gray-600">{additionalInfo.color}</p>
    </div>
  )}
  {additionalInfo.care && (
    <div>
      <p className="font-medium">Care Instructions</p>
      <p className="text-gray-600">{additionalInfo.care}</p>
    </div>
  )}
  {additionalInfo.countryOfOrigin && (
    <div>
      <p className="font-medium">Country of Origin</p>
      <p className="text-gray-600">{additionalInfo.countryOfOrigin}</p>
    </div>
  )}
  {additionalInfo.manufacturer && (
    <div>
      <p className="font-medium">Manufacturer</p>
      <p className="text-gray-600">{additionalInfo.manufacturer}</p>
    </div>
  )}
  {additionalInfo.packageContent && (
    <div>
      <p className="font-medium">Package Content</p>
      <p className="text-gray-600">{additionalInfo.packageContent}</p>
    </div>
  )}
  {additionalInfo.note && (
    <div>
      <p className="font-medium">Note</p>
      <p className="text-gray-600">{additionalInfo.note}</p>
    </div>
  )}
            </div>
          ) : (
            <p className="text-gray-600">No additional information available.</p>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
          <p className="text-gray-600 leading-relaxed">
            {typeof reviews === "string" ? reviews.replace(/<[^>]+>/g, '') : "No reviews available."}
          </p>
        </div>
      )}
    </div>
  );
}
