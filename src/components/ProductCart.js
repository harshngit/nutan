
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({ item, isLiked, toggleWishlist }) {
  return (
    <div key={item.id} className="relative bg-white cursor-pointer">
      <div
        className="absolute top-2 right-4 z-10 cursor-pointer"
        onClick={() => toggleWishlist(item.id)}
      >
        {isLiked ? (
          <FaHeart className="text-red-600 text-lg transition" />
        ) : (
          <FiHeart className="text-gray-600 text-lg hover:text-red-600 transition" />
        )}
      </div>

      <div className="aspect-square relative">
        <Image
          src={item.image}
          alt={item.title}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="mt-2 px-2 pb-2">
        <p className="text-sm">{item.title}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="font-semibold">₹{item.price}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{item.original}
          </span>
        </div>
      </div>
    </div>
  );
}
