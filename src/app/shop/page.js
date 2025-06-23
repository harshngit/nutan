'use client'
import CTA from '@/components/Home/CTA'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import BannerBreadcrumb from '@/components/Shop/BannerBreadcrumb'
import BannerCta from '@/components/Shop/BannerCta'
import ImageAccordion from '@/components/Shop/ImageAccordion'
import ProductBadage from '@/components/Shop/ProductBadage'
import ProductFilterToolbar from '@/components/Shop/ProductFilterToolbar'
import ProductPage from '@/components/Shop/ProductPage'
import ProductGrid from '@/components/Shop/ProductsGrid'
import NavbarTwo from '../../components/Layout/Navbar.js'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/app/firebase.config'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8

  const fetchProducts = async () => {
    try {
      const productsRef = collection(db, "Product")
      const q = query(
        productsRef,
        where("productStatus", "==", "Published"),
        orderBy("createdAtDate", "desc")
      )
      const querySnapshot = await getDocs(q)
      
      const productsData = []
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() })
      })
      
      setProducts(productsData)
      setFilteredProducts(productsData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleFilterChange = (newFilters) => {
    // Implement your filter logic here
    const filtered = products.filter(product => {
      // Add your filter conditions
      return true
    })
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

	return (
		<div className=' font-playfair'>
			<NavbarTwo />
			<section className="relative lg:pt-[90px] pt-[50px]">
				{/* Adjust padding to avoid navbar overlap */}
				<BannerBreadcrumb />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductFilterToolbar 
          onFilterChange={handleFilterChange}
          totalProducts={filteredProducts.length}
        />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductPage 
          products={visibleProducts} 
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
			</section>
			<section className="relative pt-[0px] pb-[46px]">
				{/* Adjust padding to avoid navbar overlap */}
				<ProductBadage />
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

export default Shop