'use client';

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toggleWishlistItem, loadWishlistFromStorage } from "@/actions/wishlistActions";
import { useCurrency } from "@/Context/CurrencyProvider";

export default function ProductCard({ item }) {
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { userProfile } = useSelector((state) => state.user);
  const userId = userProfile?.uid;

  useEffect(() => {
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  const isLiked = wishlist?.[userId]?.some((p) => p.id === item.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation when clicking heart

    dispatch(toggleWishlistItem(userId, item));

    if (!isLiked) {
      toast.success('Product added to wishlist', { autoClose: 1500 });
    } else {
      toast.info('Product removed from wishlist', { autoClose: 1500 });
    }
  };

  return (
    <Link href={`/shop/${item.id}`} passHref>
      <div className="relative bg-white cursor-pointer group">
        {/* Wishlist Icon */}
        <div
          className="absolute top-2 right-4 z-10 cursor-pointer"
          onClick={handleToggleWishlist}
        >
          {isLiked ? (
            <FaHeart className="text-red-600 text-lg transition" />
          ) : (
            <FiHeart className="text-gray-600 text-lg hover:text-red-600 transition" />
          )}
        </div>

        {/* Image wrapper with zoom effect */}
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Product Info */}
        <div className="mt-2 px-2 pb-2">
          <p className="text-sm">{item.title}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="font-semibold">{formatPrice(item.price)}</span>
            {item.original && item.original > item.price && (
              <span className="line-through text-gray-400 text-sm">
                {formatPrice(item.original)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}