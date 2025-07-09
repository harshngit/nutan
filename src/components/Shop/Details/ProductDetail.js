'use client'
import React from 'react'
import LightBox from './LightBox'
import Details from './Details'
import { IoChevronForward } from 'react-icons/io5'
import Link from 'next/link'

const ProductDetail = ({ productDetails }) => {
  return (
    <>
      <div className=' '>
        <div className=' grid lg:grid-cols-2 grid-cols-1'>
          <div className='lg:sticky col-span-1 lg:top-28 h-fit'>
          <LightBox  productDetails={productDetails} />
          </div>
          <div className=' col-span-1'>
            <Details productDetails={productDetails} />
          </div>
         
          
        </div>
      </div>
    </>
  )
}

export default ProductDetail