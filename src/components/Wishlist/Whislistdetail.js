'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { loadWishlistFromStorage } from '@/actions/wishlistActions';
import ProductCard from '../ProductCart';

const Whislistdetail = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const userId = userProfile?.uid;

  useEffect(() => {
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  const userWishlist = wishlist?.[userId] || [];

  return (
    <div>
      <div className="flex justify-center items-center flex-col lg:px-10 lg:py-10 px-5 py-5">
        <h2 className="font-semibold text-black lg:text-[32px] text-[15px]">Wishlist</h2>
        {/* <h5 className="font-400 text-black text-[16px]">These are the items you liked the most</h5> */}
      </div>

      {userWishlist.length === 0 ? (
        <div className="text-center h-[500px] flex justify-center gap-4 items-center flex-col">
			<h2 className='text-black text-[2rem]'> Your Wishlist is empty</h2>
			<Link href={"/allproduct"}>
				<button className='h-[45px] bg-black hover:bg-gray-800 text-white px-8 py-2 rounded-xl shadow-lg '>EXPLORE MORE</button>
			</Link>
		</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-[50px] gap-x-4 px-5 lg:px-10">
          {userWishlist.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Whislistdetail;
