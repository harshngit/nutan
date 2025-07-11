'use client'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BannerBreadcrumb from '@/components/Shop/BannerBreadcrumb'

import NavbarTwo from '../../components/Layout/Navbar.js'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import BackpackGrid from '@/components/Productpage/BackpackGrid.js'
import ServiceFeatures from '@/components/Home/FeaturesSection.js'
import GiftsGrid from '@/components/Productpage/GiftsGrid.js'
import DrinkwareGrid from '@/components/Productpage/DrinkwareGrid.js'
import StationaryGrid from '@/components/Productpage/StationaryGrid.js'

const Stationary = () => {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  

const fetchProduct = async () => {
    try {
      const productRef = collection(db, "Product");
      const q = query(
  productRef,
  where("productStatus", "==", "Published"),
  // where("productCategory", "==", "giftsets"), // ✅ category value must match DB
  orderBy("createdAtDate", "desc")
);
      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });

      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  console.log(product)



  useEffect(() => {
    const getProducts = async () => {
      const latestProducts = await fetchProduct();
      setProduct(latestProducts);
    };
    getProducts();
  }, []);


    return (
        <div className=' font-poppins'>
            <NavbarTwo />
            {/* <section className="relative lg:pt-[90px] pt-[50px]">
            
                <BannerBreadcrumb />
            </section> */}
            
            {/* <section className="relative pt-[0px] pb-[46px]">
            
                <ProductPage 
                  products={visibleProducts} 
                  loading={loading}
                  
                
                />
            </section> */}
      
      
            <section className="relative pt-[120px] pb-[20px]">
                
                <StationaryGrid product={product} />
            </section>

            {/* <section className="relative pt-[0px] pb-[20px]">
                <ProductBadage />
            </section> */}

      <section className='relative overflow-hidden'>
        <ServiceFeatures />
      </section>

            <section className="relative">
                {/* <BannerCta /> */}
            </section>

            <section className="relative">
                <Footer />
            </section>

        </div>
    )
}

export default Stationary