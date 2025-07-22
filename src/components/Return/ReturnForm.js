"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { FiArrowLeft } from "react-icons/fi";
import ImageUploading from "react-images-uploading";

const reasons = ["Damaged", "Incorrect Size", "Not as Expected", "Other"];

const ReturnForm = ({ orderDetails }) => {
  const [returnReason, setReturnReason] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (imageList) => {
    setImages(imageList);
  };

  const handleSubmit = async () => {
    if (!returnReason) {
      toast.error("Please select a return reason.");
      return;
    }

    setLoading(true);

    try {
      const orderRef = doc(db, "Order", orderDetails.OrderID);

      const uploadedImages = images.map((img) => img.data_url);

      await updateDoc(orderRef, {
        returnReason,
        returnImages: uploadedImages,
        orderStatus: "Return Requested",
        status: "Return",
      });

      toast.success("Return request submitted!");
      router.push("/orders");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to submit return request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer />
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/orders")}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Return Request</h1>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">
  Order #{orderDetails?.OrderID}
</h3>
          <p className="text-gray-600">{orderDetails?.items?.[0]?.name}</p>
        </div>

        {/* Customer Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={orderDetails?.customerName || ""}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              value={orderDetails?.phone || ""}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              value={orderDetails?.dropoff_location?.city || ""}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <input
              type="text"
              value={orderDetails?.dropoff_location?.region || ""}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pincode</label>
            <input
              type="text"
              value={orderDetails?.dropoff_location?.zip || ""}
              disabled
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Reason for return */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Reason for Return</label>
          <select
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select a reason</option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Image upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Images</label>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
              <div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.data_url}
                        alt=""
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <div className="absolute top-1 right-1 space-x-1">
                        <button
                          onClick={() => onImageUpdate(index)}
                          className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onImageRemove(index)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onImageUpload}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Upload Images
                  </button>
                  <button
                    type="button"
                    onClick={onImageRemoveAll}
                    className="px-4 py-2 bg-red-100 rounded hover:bg-red-200"
                  >
                    Remove All
                  </button>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        {/* Submit buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Submitting..." : "Submit Return"}
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnForm;
