'use client'
import React, { useState } from 'react'
import LightBox from './LightBox'
import Details from './Details'
import { IoChevronForward } from 'react-icons/io5'
import Link from 'next/link'

const ProductDetail = ({ productDetails }) => {
   const [selectedVariation, setSelectedVariation] = useState(null); // 🟢 Add this
  return (
    <>
      <div className=' '>
        <div className=' grid lg:grid-cols-2 grid-cols-1'>
          <div className='lg:sticky top-0 col-span-1 h-fit'>
          <LightBox  productDetails={productDetails}
          selectedVariation={selectedVariation} // 🟢 Pass to LightBox
          />
          </div>
          <div className='col-span-1'>
            <Details productDetails={productDetails} 
            setSelectedVariation={setSelectedVariation} // 🟢 Pass setter to Details
            />
          </div>
         
          
        </div>
      </div>
    </>
  )
}

export default ProductDetail