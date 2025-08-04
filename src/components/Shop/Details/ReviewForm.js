'use client';
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { db, storage } from "@/app/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ReviewForm = ({ productId, addReview, closeForm }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, or GIF)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !name.trim() || !reviewDescription.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5 stars.");
      return;
    }

    setUploading(true);
    toast.info("Submitting your review...");

    try {
      let imageUrl = null;

      // Upload image if present
      if (image) {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${image.name}`;
        const imageRef = ref(storage, `reviews/${fileName}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        // Wait for upload to complete
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(Math.round(progressPercent));
            },
            (error) => {
              console.error("Error uploading image:", error);
              toast.error("Failed to upload image. Please try again.");
              reject(error);
            },
            async () => {
              try {
                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      }

      const reviewData = {
        productId,
        rating: Number(rating),
        name: name.trim(),
        reviewDescription: reviewDescription.trim(),
        imageUrl,
        createdAt: new Date(),
        timestamp: Date.now()
      };

      // Save review to Firestore
      const docRef = await addDoc(collection(db, "productReviews"), reviewData);
      
      // Add the document ID to the review data
      const reviewWithId = { ...reviewData, id: docRef.id };

      // Update parent component
      addReview(reviewWithId);

      toast.success("Review submitted successfully! Thank you for your feedback.");
      
      // Reset form
      setRating(0);
      setName("");
      setReviewDescription("");
      setImage(null);
      setImagePreview(null);
      setProgress(0);
      
      closeForm();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={closeForm} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          disabled={uploading}
        >
          <FiX size={24} />
        </button>
        
        <h2 className="text-2xl font-semibold mb-6 pr-8">Write a Review</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`text-2xl transition-colors ${
                    index < rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
                  }`}
                  disabled={uploading}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              disabled={uploading}
            />
          </div>

          {/* Review Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Review Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="4"
              maxLength={400}
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              placeholder="Share your experience with this product..."
              disabled={uploading}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {reviewDescription.length}/400
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image (Optional)</label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                  disabled={uploading}
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-green-600 hover:text-green-700 font-medium"
                >
                  Click to upload an image
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  disabled={uploading}
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading image...</span>
                <span>{progress}%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-green-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              {uploading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;