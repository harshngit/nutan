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
import NavbarOne from '@/components/Layout/NavbarOne.js'
import BagCollection from '@/components/Collections/BagCollection.js'
import BannerTitle from '@/components/Collections/BannerTitle.js'

const Bag = () => {
  const [product, setProduct] = useState([]);

const fetchProduct = async () => {
    try {
      const productRef = collection(db, "Product");
      const q = query(
  productRef,
  where("productStatus", "==", "Published"),
  where("productCategory", "==", "bag"), // ✅ category value must match DB
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
            <NavbarOne />

             <section className="relative pt-[10px] pb-[0px]">
                <BannerTitle
                    title={"For Bags"}
                    // desc={
                    //     "Welcome to Different Clothing, where style meets comfort in every piece. Our collection is designed to offer the perfect balance of quality, versatility, and modern design, making it easy for you to express your unique style."
                    // }
                />
            </section>

            <section className="relative">
                <BagCollection />
            </section>

      
            <section className="relative pt-[30px] pb-[20px]">
                
                <BackpackGrid product={product} />
            </section>

      <section className='relative overflow-hidden'>
        <ServiceFeatures />
      </section>

            <section className="relative">
                <Footer />
            </section>

        </div>
    )
}

export default Bag