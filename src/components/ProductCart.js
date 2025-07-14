import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ item, isLiked, toggleWishlist }) {
  return (
    <Link href={`/shop/${item.id}`} passHref>
      <div className="relative bg-white cursor-pointer group">
        {/* Wishlist Icon */}
        <div
          className="absolute top-2 right-4 z-10 cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // Prevent redirect on heart click
            toggleWishlist(item.id);
          }}
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
            <span className="font-semibold">ADE {item.price}</span>
            <span className="line-through text-gray-400 text-sm">
              ADE {item.original}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
