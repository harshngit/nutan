"use client"

import { useState } from "react"

export default function ProductDescriptionTabs() {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center text-center mb-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`mr-8 pb-4 text-lg font-medium ${
            activeTab === "description" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`mr-8 pb-4 text-lg font-medium ${
            activeTab === "additional" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Additional Information
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-4 text-lg font-medium ${
            activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Reviews [5]
        </button>
      </div>

      {/* Description Tab Content */}
      {activeTab === "description" && (
        <div className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the
            unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the
            bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a
            well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and
            pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the
            guitar-influenced leather strap enables easy and stylish travel.
          </p>

          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
            <div className="bg-[#FAF3EA] p-8 rounded-lg flex items-center justify-center">
              <img
                src="/asset/Shop/Description-img.png"
                alt="Sofa - Straight Configuration"
                className="max-w-full h-auto"
              />
            </div>
            <div className="bg-[#FAF3EA] p-8 rounded-lg flex items-center justify-center">
              <img
                src="/asset/Shop/Description-img2.png"
                alt="Sofa - L-Shaped Configuration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* Additional Information Tab Content */}
      {activeTab === "additional" && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium mb-4">Product Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div>
              <p className="font-medium">Weight</p>
              <p className="text-gray-600">Under 7 pounds</p>
            </div>
            <div>
              <p className="font-medium">Dimensions</p>
              <p className="text-gray-600">242 x 140 x 140 mm</p>
            </div>
            <div>
              <p className="font-medium">Materials</p>
              <p className="text-gray-600">Vinyl, Metal, Leather</p>
            </div>
            <div>
              <p className="font-medium">Battery Life</p>
              <p className="text-gray-600">Up to 20 hours</p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab Content */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium mb-4">Customer Reviews (5)</h3>
          <div className="space-y-6">
            {/* Sample Review */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">John D. - March 15, 2023</p>
              </div>
              <h4 className="font-medium mb-2">Amazing sound quality!</h4>
              <p className="text-gray-600">
                This speaker exceeded my expectations. The sound is crystal clear and the battery life is impressive.
                Highly recommend!
              </p>
            </div>

            {/* More reviews would go here */}
          </div>
        </div>
      )}
    </div>
  )
}
