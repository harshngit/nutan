"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineHeart,
  AiOutlineQuestionCircle,
  AiOutlineLogin,
  AiOutlineRight,
} from "react-icons/ai";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import { toast } from "react-toastify";
import { db } from "@/app/firebase.config";
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function MyAccount() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [accountDetails, setAccountDetails] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { userProfile, isAuthenticated } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (userProfile?.uid) {
      const unsubscribe = onSnapshot(doc(db, "users", userProfile.uid), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAccountDetails(data);
          setAddresses(data.addresses || []);
        }
      });
      return () => unsubscribe();
    }
  }, [userProfile?.uid]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out");
      setSelectedItem(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteDoc(doc(db, "users", userProfile.uid));
      dispatch(logout()).unwrap();
      toast.success("User account deleted.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddAddress = async () => {
    try {
      const ref = doc(db, "users", userProfile.uid);
      await updateDoc(ref, {
        addresses: arrayUnion(formData),
      });
      toast.success("Address added");
      setFormData({
        name: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
      });
      setShowForm(false);
    } catch (err) {
      toast.error("Failed to add address");
    }
  };

  const handleDeleteAddress = async (addr) => {
    try {
      const ref = doc(db, "users", userProfile.uid);
      await updateDoc(ref, {
        addresses: arrayRemove(addr),
      });
      toast.success("Address removed");
    } catch (err) {
      toast.error("Failed to remove address");
    }
  };

  const menuItems = [
    { id: "purchases", label: "My Purchases", icon: FaShoppingBag, link: "/orders" },
    { id: "details", label: "My Details", icon: BiSolidUserAccount },
    { id: "wishlist", label: "Wishlist", icon: AiOutlineHeart, link: "/wishlist" },
    { id: "addresses", label: "Addresses", icon: IoLocationSharp },
    { id: "faqs", label: "FAQ's", icon: AiOutlineQuestionCircle },
    {
      id: "auth",
      label: isAuthenticated ? "Logout" : "Login",
      icon: AiOutlineLogin,
      link: isAuthenticated ? null : "/login",
    },
  ];

  const renderContent = () => {
    if (!isAuthenticated && selectedItem !== "faqs") {
      return (
        <div className="p-8 text-center text-gray-500">
          <p>Please log in to access this section.</p>
        </div>
      );
    }

    switch (selectedItem) {
      case "details":
        return (
          <div className="max-w-full mx-auto py-10 px-4">
            <h2 className="text-[24px] font-semibold mb-8 text-center">MY DETAILS</h2>
            <ul className="space-y-6">
              {[
                { label: "Name", value: accountDetails?.name },
                { label: "E-mail", value: accountDetails?.email },
                { label: "Mobile", value: accountDetails?.contact },
              ].map((item, index) => (
                <li key={index} className="flex justify-between items-start">
                  <div>
                    <p className="text-[16px] uppercase font-semibold text-black mb-1">{item.label}</p>
                    <p className="text-sm text-black">{item.value || "-"}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <button onClick={handleDeleteAccount} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md text-sm text-[#000] hover:underline">
                Delete account
              </button>
            </div>
          </div>
        );
      case "addresses":
        return (
          <div className="max-w-full mx-auto px-4 py-10">
            <h3 className="text-xl font-semibold mb-4">Your Addresses</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {showForm ? "Close" : "Add Address"}
            </button>
            {showForm && (
              <div className="space-y-3 mb-6">
                {Object.keys(formData).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={`Enter ${key}`}
                    className="w-full border p-2 rounded"
                  />
                ))}
                <button
                  onClick={handleAddAddress}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Save Address
                </button>
              </div>
            )}
            {addresses?.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Saved Addresses:</h4>
                <div className="flex flex-wrap gap-8 mb-8">
                  {addresses.map((addr, index) => (
                    <div key={index} className="border p-3 rounded relative bg-gray-50">
                      <p><strong>Name:</strong> {addr.name}</p>
                      <p><strong>Phone:</strong> {addr.phone}</p>
                      <p><strong>Address:</strong> {addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <button
                        onClick={() => handleDeleteAddress(addr)}
                        className="absolute top-2 right-2 text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "faqs":
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p>FAQs coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p>Select an option from the menu to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="text-center py-8 border-y-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">MY ACCOUNT</h1>
      </div>

      <div className="flex flex-col lg:flex-row px-4 md:px-6 min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-80 mb-8 lg:mb-0 pt-8 border-r-2 border-gray-200">
          <div className="mb-6 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-600 rounded-sm"></span>
            <span className="text-gray-900 font-semibold text-sm md:text-base">
              {isAuthenticated && userProfile?.name
                ? userProfile.name.toUpperCase()
                : "GUEST"}
            </span>
          </div>

          <div className="bg-gray-50 overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedItem === item.id;
              const isLast = index === menuItems.length - 1;

              const handleClick = () => {
                if (item.id === "auth") {
                  if (isAuthenticated) handleLogout();
                  else router.push(item.link);
                } else if (!item.link) {
                  setSelectedItem(item.id);
                }
              };

              const boxContent = (
                <div
                  className={`flex items-center justify-between p-4 md:p-5 ${
                    !isLast ? "border-b border-gray-200" : ""
                  } hover:bg-gray-100 transition-colors cursor-pointer ${
                    isSelected ? "bg-green-50 border-green-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${
                        isSelected ? "text-green-600" : "text-gray-600"
                      }`}
                    />
                    <span className={`font-medium text-sm md:text-base ${
                      isSelected ? "text-green-600" : "text-gray-800"
                    }`}>{item.label}</span>
                  </div>
                  <AiOutlineRight
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isSelected ? "text-green-400" : "text-gray-400"
                    }`}
                  />
                </div>
              );

              return item.link && item.id !== "auth"
                ? (
                  <Link key={item.id} href={item.link}>
                    {boxContent}
                  </Link>
                ) : (
                  <div key={item.id} onClick={handleClick}>
                    {boxContent}
                  </div>
                );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white h-full">{renderContent()}</div>
      </div>
    </div>
  );
}
