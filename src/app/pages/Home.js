"use client";

import HomeBanner from '@/components/Home/HomeBanner.js';
import NavbarTwo from '../../components/Layout/Navbar.js';
import React, { useEffect, useState } from 'react';
import Head from 'next/head.js';
import '../../components/Home/Home.css';
import Footer from '@/components/Layout/Footer.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/app/firebase.config';
import ShopByCategory from '@/components/Home/ShopByCategory.js';
import SimpleBanner from '@/components/Home/HomeBanner.js';
import TechEssentials from '@/components/Home/TechEssentials.js';
import HomeBannerTwo from '@/components/Home/HomeBannerTwo.js';
import HomeSlider from '@/components/Home/HomeSlider.js';
import NewArrivalsSlider from '@/components/Productpage/NewArrivalsSlider.js';
import TrendingSlider from '@/components/Productpage/TrendingSlider.js';
import ServiceFeatures from '@/components/Home/FeaturesSection.js';

// Shuffle utility function
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const productRef = collection(db, "Product");
      const q = query(
        productRef,
        where("productStatus", "==", "Published"),
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

  useEffect(() => {
    const getProducts = async () => {
      const latestProducts = await fetchProduct();
      setProduct(latestProducts);
      const shuffled = shuffleArray(latestProducts);
      setTrendingProducts(shuffled.slice(0, 12));
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div className='relative'>
      <NavbarTwo />

      <section className="relative pt-[70px]">
        <HomeSlider />
      </section>

      <section className="relative overflow-hidden">
        <ShopByCategory />
      </section>

      <section className="relative overflow-hidden">
        <SimpleBanner />
      </section>

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
        <TrendingSlider product={trendingProducts} loading={loading} />
      </section>

      <section className='relative overflow-hidden'>
        <ServiceFeatures />
      </section>

      <section className=''>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
