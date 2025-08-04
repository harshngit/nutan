import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import ReviewForm from './ReviewForm';
import { FaStar, FaRegStar, FaUser, FaCalendarAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductReviews = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);

  // Real-time listener for reviews
  useEffect(() => {
    if (!productId) {
      console.warn("ProductReviews: No productId provided");
      setLoading(false);
      return;
    }

    console.log("ProductReviews: Setting up listener for productId:", productId);
    setLoading(true);

    // Create the query
    let q;
    try {
      // Try with orderBy first
      q = query(
        collection(db, "productReviews"),
        where("productId", "==", productId),
        orderBy("createdAt", "desc")
      );
    } catch (error) {
      console.warn("OrderBy failed, using basic query:", error);
      q = query(
        collection(db, "productReviews"),
        where("productId", "==", productId)
      );
    }

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        console.log("ProductReviews: Received snapshot with", querySnapshot.docs.length, "documents");
        
        const reviewData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Ensure createdAt is properly handled
            createdAt: data.createdAt || new Date()
          };
        });

        // Sort manually if orderBy wasn't used
        reviewData.sort((a, b) => {
          const aDate = a.createdAt?.toDate?.() || a.createdAt || new Date(0);
          const bDate = b.createdAt?.toDate?.() || b.createdAt || new Date(0);
          return bDate - aDate;
        });

        console.log("ProductReviews: Setting reviews:", reviewData);
        setReviews(reviewData);
        setLoading(false);
      },
      (error) => {
        console.error("ProductReviews: Listener error:", error);
        setLoading(false);
        toast.error("Failed to load reviews");
        
        // Fallback to one-time fetch
        fetchReviewsFallback();
      }
    );

    return () => {
      console.log("ProductReviews: Cleaning up listener");
      unsubscribe();
    };
  }, [productId]);

  const fetchReviewsFallback = async () => {
    try {
      console.log("ProductReviews: Fallback fetch for productId:", productId);
      
      // Simple query without orderBy
      const q = query(
        collection(db, "productReviews"),
        where("productId", "==", productId)
      );
      
      const querySnapshot = await getDocs(q);
      const reviewData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort manually
      reviewData.sort((a, b) => {
        const aDate = a.createdAt?.toDate?.() || a.createdAt || new Date(0);
        const bDate = b.createdAt?.toDate?.() || b.createdAt || new Date(0);
        return bDate - aDate;
      });

      console.log("ProductReviews: Fallback fetch successful:", reviewData.length, "reviews");
      setReviews(reviewData);
    } catch (error) {
      console.error("ProductReviews: Fallback fetch failed:", error);
      toast.error("Failed to load reviews");
    }
  };

  const addReview = (newReview) => {
    console.log("ProductReviews: Adding new review:", newReview);
    // The real-time listener will automatically update the reviews
    setShowReviewForm(false);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    try {
      let date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp instanceof Date) {
        date = timestamp;
      } else {
        date = new Date(timestamp);
      }
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.warn("Error formatting date:", error);
      return 'Unknown date';
    }
  };

  const renderStars = (rating, size = "text-lg") => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return [...Array(5)].map((_, index) => (
      index < validRating ? (
        <FaStar key={index} className={`text-yellow-500 ${size}`} />
      ) : (
        <FaRegStar key={index} className={`text-gray-300 ${size}`} />
      )
    ));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-gray-50 p-6 w-full max-w-full my-6">
      

      <div className="mb-6">
        <h2 className="md:text-3xl text-xl font-bold mb-4 text-gray-800">Customer Reviews</h2>
        
        {reviews.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            {/* Product Title */}
      {productName && (
        <div className="mb-6 text-center">
          <h1 className="md:text-2xl text-lg font-bold text-gray-800 mb-2">{productName}</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
      )}
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="md:text-4xl text-2xl font-bold text-gray-800">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="flex-1 max-w-sm">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-3">{rating}</span>
                    <FaStar className="text-yellow-500 text-xs" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-6">
                      {ratingDistribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            {/* Product Title */}
      {productName && (
        <div className="mb-6 text-center">
          <h1 className="md:text-2xl text-lg px-2 font-bold text-gray-800 mb-2">{productName}</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
      )}
          <div className="mb-4">
            <div className="flex justify-center items-center gap-1 mb-2">
              {renderStars(0, "text-2xl")}
            </div>
            <p className="md:text-2xl text-base text-gray-500 mb-2">No reviews yet</p>
            <p className="text-gray-600 md:text-xl text-base ">Be the first to share your thoughts!</p>
          </div>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-green-600 text-white md:px-8 md:py-3 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-md"
          >
            Be the first to write a review
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="md:text-xl text-base font-semibold text-gray-800">
              All Reviews ({reviews.length})
            </h3>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-green-600 text-white md:px-6 md:py-2 px-4 py-2 md:text-base text-sm rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-md"
            >
              Write a Review
            </button>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={review.id || index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  {/* <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-green-600 text-lg" />
                    </div>
                  </div> */}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-800 md:text-lg text-base">{review.name || 'Anonymous'}</h4>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating, "text-sm")}
                      </div>
                      <div className="flex flex-row  items-center gap-1 text-sm text-gray-500">
                        <FaCalendarAlt className="text-xs" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {review.reviewDescription || 'No description provided.'}
                    </p>
                    
                    {review.imageUrl && (
                      <div className="mt-3">
                        <img
                          src={review.imageUrl}
                          alt="Review"
                          className="max-w-xs h-48 object-cover rounded-lg border cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                          onClick={() => setExpandedImage(review.imageUrl)}
                          onError={(e) => {
                            console.error("Failed to load image:", review.imageUrl);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={productId}
          addReview={addReview}
          closeForm={() => setShowReviewForm(false)}
        />
      )}

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={expandedImage}
              alt="Expanded review"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;