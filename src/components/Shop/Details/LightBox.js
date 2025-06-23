'use client'
import React, { useState } from 'react'

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * LightBox component displays a gallery of product images with a main image
 * and selectable thumbnails. Users can click on thumbnails to change the
 * main displayed image.
 *
 * @param {Object} product - The product object containing image data.
 * @param {Array} product.productImages - An array of image URLs for the product.
 */

/*******  18197ad8-d31e-4f6c-9ba5-166927067471  *******/

const LightBox = ({ productDetails }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = productDetails?.productImages || []

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
      <div className="flex flex-wrap justify-start md:flex-col gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 object-cover cursor-pointer border ${
              selectedImage === index ? "border-[#B88E2F]" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="w-full">
        <img
          src={images[selectedImage]}
          alt="Selected"
          className="w-full lg:h-[500px] h-[400px] object-cover rounded-lg"
        />
      </div>
    </div>
  )
}

export default LightBox