"use client"
import HomeBanner from '@/components/Home/HomeBanner.js'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React, { Suspense, useEffect, useState } from 'react'
import Head from 'next/head.js'
import '../../components/Home/Home.css'
import { ThemeProvider } from "@material-tailwind/react";
import Deal from '@/components/Home/Deal.js'
import ProductsHome from '@/components/Home/ProductsHome.js'
import CTA from '@/components/Home/CTA.js'
import Footer from '@/components/Layout/Footer.js'
import Photosection from '@/components/Home/Photosection.js'
import Topbar from '@/components/Layout/Topbar.js'
import HeroSection from '@/components/Home/HeroSection.js'
import ServiceFeatures from '@/components/Home/FeaturesSection.js'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/app/firebase.config'
import ShopByCategory from '@/components/Home/ShopByCategory.js'
import SimpleBanner from '@/components/Home/HomeBanner.js'
import TechEssentials from '@/components/Home/TechEssentials.js'
import HomeBannerTwo from '@/components/Home/HomeBannerTwo.js'
import HomeSlider from '@/components/Home/HomeSlider.js'
import NewArrivalsSlider from '@/components/Productpage/HomeSlider.js'
import TrendingSlider from '@/components/Productpage/TrendingSlider.js'

const Home = () => {
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
  
  
  // const [featuredProducts, setFeaturedProducts] = useState([])
  
  // const fetchFeaturedProducts = async () => {
  //   try {
  //     const productsRef = collection(db, "Product")
  //     const q = query(
  //       productsRef,
  //       where("productStatus", "==", "Published"),
       
  //       orderBy("createdAtDate", "desc"),
  //       // limit(4)
  //     );
  //     const querySnapshot = await getDocs(q)
      
  //     const products = []
  //     querySnapshot.forEach((doc) => {
  //       products.push({ id: doc.id, ...doc.data() })
  //     });
      
  //     setFeaturedProducts(products)
  //     setLoading(false)
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchFeaturedProducts()
  
  // }, [])
  // console.log(featuredProducts)

  return (
    <div className='relative'>
      {/* <ThemeProvider> */}
      <NavbarTwo />
      
      <section className="relative pt-[60px]">
        <HomeSlider  />
      </section>

      {/* <section className="relative pt-[40px]">
        <HeroSection />
      </section> */}

      <section className="relative overflow-hidden">
        <ShopByCategory  />
      </section>
      
      {/* <section className="relative overflow-hidden ">
        <AboutHome />
      </section> */}

      <section className="relative overflow-hidden">
        <SimpleBanner />
      </section>

      {/* <section className="relative overflow-hidden">
        <Deal products={featuredProducts} loading={loading} />
      </section> */}

      <section className="relative overflow-hidden">
        <NewArrivalsSlider product={product} loading={loading} />
      </section>


      

      <section className='relative overflow-hidden'>
        <TechEssentials />
      </section>


      <section className='relative overflow-hidden'>
        <HomeBannerTwo />
      </section>

      <section className="relative overflow-hidden">
        <TrendingSlider product={product} loading={loading} />
      </section>


      {/* <section className='relative overflow-hidden'>
        <Photosection />
      </section> */}

      {/* <section className='relative overflow-hidden'>
        <ProductsHome />
      </section> */}

      <section className='relative overflow-hidden'>
        <ServiceFeatures />
      </section>

      <section className=''>
        <Footer />
      </section>
      {/* </ThemeProvider> */}
    </div>
  )
}

export default Home