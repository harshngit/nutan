'use client';

import React, { useEffect, useState } from 'react';
import {
  FiChevronDown, FiMinus, FiPlus, FiStar, FiHeart
} from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, updateCartQuantity } from '@/actions/cartAction';
import {
  toggleWishlistItem,
  loadWishlistFromStorage
} from '@/actions/wishlistActions';

const Details = ({ productDetails, setSelectedVariation }) => {
  const dispatch = useDispatch();
  const variation = productDetails?.variation || [];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { cartItems } = useSelector(state => state.cart);
  const { userProfile } = useSelector(state => state.user) || {};
  const wishlist = useSelector(state => state.wishlist.wishlist);
  const userId = userProfile?.uid;

  const uniqueColors = [...new Set(variation.map(v => v.color))];

  // Load wishlist
  useEffect(() => {
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  // Set initial color, size
  useEffect(() => {
    if (variation.length > 0) {
      const first = variation[0];
      setSelectedColor(first.color);
      setAvailableSizes(first.size || []);
      setSelectedSize(first.size?.[0] || '');
      setSelectedVariation && setSelectedVariation(first);
    }
  }, [variation]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const matched = variation.find(v => v.color.toLowerCase() === color.toLowerCase());
    if (matched) {
      setAvailableSizes(matched.size || []);
      setSelectedSize(matched.size?.[0] || '');
      setSelectedVariation && setSelectedVariation(matched);
    }
  };

  const getVariantQuantity = () => {
    const match = variation.find(
      v => v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
        (v.size || []).includes(selectedSize)
    );
    return match?.quantity ?? 0;
  };

  const isSoldOut = getVariantQuantity() <= 0;

  const handleQuantityChange = (action) => {
    setQuantity(prev => action === 'increase' ? prev + 1 : Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    if (isSoldOut) {
      toast.error("Selected variant is out of stock");
      return;
    }

    const existingItem = cartItems.find(
      item =>
        item.product === (productDetails._id || productDetails.id) &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItem) {
      dispatch(updateCartQuantity(
        existingItem.product,
        existingItem.size,
        existingItem.color,
        existingItem.quantity + quantity
      ));
      toast.success('Updated quantity in your cart.');
    } else {
      const cartItem = {
        user: userProfile,
        product: productDetails._id || productDetails.id,
        name: productDetails.productName,
        price: productDetails.productPrice,
        image: productDetails.productImages?.[0],
        size: selectedSize,
        quantity,
        totalQuantity: getVariantQuantity(),
        color: selectedColor,
        couponId: '',
        couponCode: '',
        discountAmount: '',
        couponAmountDetails: '',
      };
      dispatch(addToCart(cartItem));
      toast.success('Item added to cart.');
    }
  };

  const isLiked = wishlist?.[userId]?.some(p => p.id === productDetails.id);

  const handleToggleWishlist = () => {
    if (!userId) {
      toast.error('Please log in to use wishlist.');
      return;
    }

    dispatch(toggleWishlistItem(userId, productDetails));

    if (!isLiked) {
      toast.success('Product added to wishlist', { autoClose: 1500 });
    } else {
      toast.info('Product removed from wishlist', { autoClose: 1500 });
    }
  };

  const formatPrice = (price) => `AED ${price?.toLocaleString('en-IN') || '0'} `;

  return (
    <div className="w-full px-8 py-8 mx-auto font-sans text-[#111]">
      <h1 className="text-xl md:text-2xl font-medium leading-tight mb-2">
        {productDetails?.productName || 'Product Name'}
      </h1>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-lg font-bold text-[#111]">{formatPrice(productDetails?.productPrice)}</span>
        <span className="text-gray-400 line-through text-base">{formatPrice(productDetails?.originalPrice)}</span>
      </div>

      <div className="flex items-center gap-2 text-green-600 text-sm mb-6">
        {[...Array(4)].map((_, i) => <GoStarFill key={i} className="text-[#FFC700]" />)}
        <FiStar className="text-[#FFC700]" />
        <span className="text-black font-medium ml-2">4.6</span>
        <span className="text-gray-500">(191 reviews)</span>
      </div>

      {/* Stock Info */}
      {!isSoldOut ? (
        <p className="text-sm text-gray-600 mb-2">
          Only <span className="font-bold">{getVariantQuantity()}</span> item(s) left in stock!
        </p>
      ) : (
        <p className="text-sm text-red-600 mb-2 font-medium">
          Selected variant is Sold Out
        </p>
      )}

      {/* Size Selection */}
      <div className="mb-4">
        <p className="font-semibold text-sm text-[#111] mb-1">SIZE</p>
        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size, index) => {
            const matched = variation.find(
              v => v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
                (v.size || []).includes(size)
            );
            const qty = matched?.quantity ?? 0;
            const soldOut = qty <= 0;

            return (
              <button
                key={index}
                onClick={() => !soldOut && setSelectedSize(size)}
                disabled={soldOut}
                className={`border rounded-md px-4 py-2 text-sm
                  ${selectedSize === size
                    ? 'border-[#111] text-[#111] font-semibold'
                    : soldOut
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-[#111]'
                  }`}
              >
                {size} {soldOut && "(Sold Out)"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <p className="font-semibold text-sm text-[#111] mb-1">COLOR</p>
        <div className="flex flex-wrap gap-5">
          {uniqueColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleColorSelect(color)}
              className={`w-7 h-7 rounded-full border-2 focus:outline-none transition 
                ${selectedColor?.toLowerCase() === color.toLowerCase()
                  ? 'border-[#111]'
                  : 'border-gray-300'}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Quantity + Cart + Wishlist */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange('decrease')}
            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <div className="px-6 py-3 text-center min-w-[60px] font-medium text-[20px]">{quantity}</div>
          <button
            onClick={() => handleQuantityChange('increase')}
            className="p-3 hover:bg-gray-50"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {isSoldOut ? (
          <button
            disabled
            className="flex-1 bg-gray-300 text-gray-700 cursor-not-allowed text-sm font-semibold py-3 px-4 rounded-md"
          >
            OUT OF STOCK
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 px-4 rounded-md"
          >
            ADD TO CART
          </button>
        )}

        <button
          onClick={handleToggleWishlist}
          className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-3 text-sm text-[#111] hover:border-[#111]"
        >
          {isLiked ? <FaHeart className="text-red-600" /> : <FiHeart className="text-gray-600" />}
          {isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Expandable Sections */}
      {['Product Details', 'Specifications', 'Delivery Time & Returns'].map((section, index) => (
        <div key={index} className="border-b">
          <button
            onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
            className="w-full flex justify-between items-center py-4 text-sm font-medium text-left"
          >
            <span>{section}</span>
            <FiChevronDown
              className={`transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}
            />
          </button>

          {activeDropdown === index && (
            <div className="text-sm text-gray-700 pb-4 px-1 leading-relaxed">
              {section === "Product Details" && (
                <p>{productDetails?.productDescription?.replace(/<[^>]+>/g, "") || "No description available."}</p>
              )}

              {section === "Specifications" && (
                <div className="space-y-3">
                  {productDetails?.productDimension?.[0] ? (
                    <>
                      {Object.entries(productDetails.productDimension[0]).map(([key, val]) => (
                        val && <p key={key}><b>{key.replace(/([A-Z])/g, ' $1')}:</b> {val}</p>
                      ))}
                    </>
                  ) : <p>No specifications available.</p>}
                </div>
              )}

              {section === "Delivery Time & Returns" && (
                <div className="space-y-4 text-sm text-black">
                  <p className="font-bold">DELIVERY</p>
                  <p>Dispatch to courier in 24-48 hours</p>
                  <p>Eligible for Cash on Delivery</p>

                  <p className="font-bold mt-4">FREE SHIPPING</p>
                  <p>Free shipping on orders above ₹999.</p>
                  <p>A charge of ₹49 is applied to all orders of ₹999 and below.</p>

                  <p className="font-bold mt-4">CASH ON DELIVERY</p>
                  <p>₹99 extra charges for all Cash On Delivery orders.</p>

                  <p className="font-bold mt-4">RETURNS</p>
                  <p>Hassle-free returns for 30 Days. Please keep the product in its original condition.</p>
                  <p>
                    See our <a href="/shipping-policy" className="text-green-700 underline">Shipping Policy</a> and <a href="/return-policy" className="text-green-700 underline">Return & Exchange Policy</a>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Details;
