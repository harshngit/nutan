'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';
import { FiHeart, FiRefreshCw, FiShare2 } from 'react-icons/fi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartQuantity } from '@/actions/cartAction';
import { toast } from 'react-toastify';

const formatPrice = (price) => `₹${price?.toLocaleString('en-IN') || '0'}`;

export default function RecentlyViewedSlider({ products = [] }) {
  const [likedItems, setLikedItems] = useState({});
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userProfile } = useSelector((state) => state.user) || {};

  const handleToggle = (productId) => {
    setLikedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddToCart = (product) => {
    const productId = product._id || product.id;

    const existingItem = cartItems.find(
      (item) => item.product === productId
    );

    if (existingItem) {
      dispatch(updateCartQuantity(existingItem.product, existingItem.size, existingItem.color, existingItem.quantity + 1));
      toast.success('Updated quantity in your cart.');
    } else {
      const cartItem = {
        user: userProfile,
        product: productId,
        name: product.productName,
        price: product.productPrice,
        image: product.productImages?.[0],
        size: '',
        quantity: 1,
        color: '',
        couponId: '',
        couponCode: '',
        discountAmount: '',
        couponAmountDetails: '',
      };
      dispatch(addToCart(cartItem));
      toast.success('Item added to cart.');
    }
  };

  return (
    <div className="py-12 px-4 lg:px-8 max-w-full">
      <h2 className="text-[24px] font-semibold tracking-tight mb-4">RELATED PRODUCTS</h2>

      <Swiper
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        loop
        breakpoints={{
          320: { slidesPerView: 1.2 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="!pb-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/shop/${product.id}`} className="block">
              <div className="relative group border overflow-hidden rounded-md bg-white">
                <div className="relative h-[250px]">
                  <img
                    src={product.productImages?.[0] || "/default-product.jpg"}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                  {product.productImages?.[1] && (
                    <img
                      src={product.productImages[1]}
                      alt={`${product.productName} hover`}
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  )}
                </div>

                {product.discount && (
                  <span className="absolute top-2 left-2 w-10 h-10 flex justify-center items-center rounded-full bg-[#E97171] text-white text-xs">
                    -{product.discount}%
                  </span>
                )}

                {product.isNew && (
                  <span className="absolute top-2 right-2 w-10 h-10 flex justify-center items-center bg-[#2EC1AC] text-white text-xs rounded-full">
                    New
                  </span>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="bg-white text-[#B88E2F] px-8 py-2 text-sm font-semibold mb-4 hover:bg-gray-100"
                  >
                    Add to cart
                  </button>
                  <div className="flex items-center gap-5 text-white text-xs">
                    <button className="flex items-center gap-1 hover:text-gray-300">
                      <FiShare2 /> Share
                    </button>
                    <Link href="/productcomparison" className="flex items-center gap-1 hover:text-gray-300">
                      <FiRefreshCw /> Compare
                    </Link>
                    <button onClick={(e) => {
                      e.preventDefault();
                      handleToggle(product.id);
                    }} className="flex items-center gap-1 hover:text-gray-300">
                      <FiHeart className={likedItems[product.id] ? 'text-red-500' : ''} /> Like
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#F4F5F7]">
                  <h3 className="text-sm font-semibold line-clamp-1">{product.productName}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{(product.productDescription || '').replace(/<[^>]+>/g, '')}</p>
                  <p className="text-sm font-semibold text-black mt-1">
                    {formatPrice(product.productPrice)}
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
