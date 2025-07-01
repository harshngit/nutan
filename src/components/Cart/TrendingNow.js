"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase.config';

const TrendingNow = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [likedProducts, setLikedProducts] = useState({});

	const fetchProducts = async () => {
		try {
			const productRef = collection(db, "Product");
			const q = query(productRef, where("productStatus", "==", "Published"), orderBy("createdAtDate", "desc"));
			const querySnapshot = await getDocs(q);

			const products = [];
			querySnapshot.forEach((doc) => {
				products.push({ id: doc.id, ...doc.data() });
			});
			setAllProducts(products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
	

	useEffect(() => {
		const getProducts = async () => {
			const latestProducts = await fetchProduct();
			setProduct(latestProducts);
		};
		getProducts();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, []);

	const [liked, setLiked] = useState(false);

	const handleToggle = () => {
		setLiked((prev) => !prev);
	};

	const toggleLike = (productId) => {
		setLikedProducts((prev) => ({
			...prev,
			[productId]: !prev[productId],
		}));
	};

	return (
		<div className='w-full'>
			<div className='flex justify-between items-center lg:px-5 px-5 py-5 lg:py-5'>
				<div className='flex justify-start items-center gap-5'>
					<h2 className='font-normal lg:text-[32px] text-[22px] text-[#484848]'>Trending Now</h2>
				</div>
				<div>
					<Link href="/shop"><h3 className='font-bold text-[20px]'>EXPLORE MORE</h3></Link>
				</div>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] mb-10">
				{allProducts.slice(0, 4).map((product) => (
					<div key={product.id} className="bg-white overflow-hidden group relative">
						<Link href={`shop/${product.id}`}>
							<div className="relative cursor-pointer">
								<img
									src={product.productImages?.[0] || product.image}
									alt={product.productName || product.title}
									className="w-full lg:h-[408px] h-[200px] object-cover transition-opacity duration-300 group-hover:opacity-0"
								/>
								<img
									src={product.productImages?.[1] || product.hoverImage}
									alt={`${product.productName || product.title} hover`}
									className="w-full lg:h-[408px] h-[200px] object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
								/>
							</div>
						</Link>

						<div className="p-3 flex justify-between items-start">
							<div className='flex flex-col gap-2 justify-start items-start'>
								<div>
									<p className='text-black text-xs'>{product.productCategory}</p>
									<Link href={`shop/${product.id}`}>
										<h3 className="text-sm font-semibold">{product.productName || product.title}</h3>
									</Link>
									<p className="text-gray-700 font-bold">${product.productPrice || product.price}</p>
								</div>

								{/* Color Indicators */}
								<div className="flex justify-center items-center gap-2">
									{product.variation?.map((item, index) => (
										<div
											key={index}
											className="w-5 h-5 rounded-full border border-black"
											style={{ backgroundColor: item.color }}
										></div>
									))}
								</div>
							</div>

							{/* Heart Icon */}
							<button onClick={() => toggleLike(product.id)}>
								<img
									src={likedProducts[product.id] ? '/asset/heartred.png' : '/asset/heart.png'}
									alt="heart icon"
									className="w-6 h-6"
								/>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrendingNow;
