'use client';

import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import ProductDetail from '@/components/Shop/Details/ProductDetail';
import ProductDescriptionTabs from '@/components/Shop/Details/ProductDescription';
import RelatedProductpg from '@/components/Shop/Details/RelatedProductpg';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase.config';

export default function ProductDetailPage({ params }) {
  const [productDetails, setProductDetails] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = params?.productid;

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(
      doc(db, 'Product', id),
      (docSnap) => {
        if (docSnap.exists()) {
          setProductDetails({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn('No product found.');
          setProductDetails(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Snapshot error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const productRef = collection(db, 'Product');
        const q = query(
          productRef,
          where('productStatus', '==', 'Published'),
          orderBy('createdAtDate', 'desc')
        );
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecommendedProducts(products);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchRecommended();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!productDetails) return <div className="text-center py-20 text-red-600">Product not found</div>;

  return (
    <div className="font-poppins">
      <Navbar />
      <section className="relative lg:pt-[90px] pt-[50px] pb-[50px]">
        <ProductDetail productDetails={productDetails} />
      </section>
      <section className="relative pb-[50px] border-b-2">
        <ProductDescriptionTabs productDetails={productDetails} />
      </section>
      <section className="relative pb-[50px]">
        <RelatedProductpg products={recommendedProducts} />
      </section>
      <Footer />
    </div>
  );
}
