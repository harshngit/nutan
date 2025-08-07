"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import CartSidebar from "../Cart/CartSidebar"; 
import { BsPerson } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { useCurrency } from "@/Context/CurrencyProvider";

// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const navItems = [
  { label: "All Category", href: "/allproduct", hasDropdown: true },
  { label: "Bag", href: "/bag", children: []},
  { label: "Giftsets", href: "/giftsets"},
  { label: "Drinkware", href: "/drinkware" },
  { label: "Technology", href: "/technology"},
  { label: "Office", href: "/office"},
  { label: "Stationary", href: "/stationary"},
];

export default function NavbarOne() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useSelector((state) => state.cart);
  const { currency, setCurrency } = useCurrency();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAccountDropdown, setOpenAccountDropdown] = useState(false);
  const [openDropdownSearch, setOpenDropdownSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState([]);

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const accountTimeoutRef = useRef(null);

  const userState = useSelector((state) => state.user);
  const { isAuthenticated, userProfile } = userState || {};

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href) => pathname === href;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(accountTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = collection(db, "Product");
        const q = query(productRef, where("productStatus", "==", "Published"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 150);
  };

  const handleAccountMouseEnter = () => {
    clearTimeout(accountTimeoutRef.current);
    setOpenAccountDropdown(true);
  };

  const handleAccountMouseLeave = () => {
    accountTimeoutRef.current = setTimeout(() => {
      setOpenAccountDropdown(false);
    }, 150);
  };

  console.log(userProfile)

  const navList = (
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-3 lg:gap-0 text-white font-[poppins] font-medium !text-sm tracking-wide">
      {navItems.map((item, idx) => {
        const hasChildren = item.children && item.children.length > 0;
        const isParentActive = isActive(item.href) || item.children?.some((child) => isActive(child.href));

        return (
          <li key={idx} className="relative">
            <div onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
              <Link href={item.href} className={`group px-4 py-3 transition lg:text-[15px] block flex items-center ${
                isParentActive ? "text-white bg-[#5A4A2E]" : "text-white hover:text-[#EAD987]"
              } rounded-md`}>
                {item.label}
                {item.hasDropdown && (
                  <IoChevronDownOutline className="ml-1 w-3 h-3" />
                )}
              </Link>
              {hasChildren && openDropdown === item.label && (
                <div className="absolute left-0 mt-1 z-20 shadow-lg w-48 bg-white rounded-md">
                  {item.children.map((child, i) => (
                    <Link key={i} href={child.href}>
                      <div className={`px-4 py-2 transition cursor-pointer text-gray-700 hover:bg-gray-100 ${
                        isActive(child.href) ? "bg-gray-100" : ""
                      }`}>
                        {child.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );

  const navListMobile = (
    <div className="flex flex-col gap-[40px]">
      <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-[20px] lg:gap-4 text-black uppercase font-semibold !text-sm tracking-wide">
        <li><Link href="/allproduct">All Category</Link></li>
        <li><Link href="/bag">Bags</Link></li>
        <li><Link href="/giftsets">Giftsets</Link></li>
        <li><Link href="/drinkware">Drinkware</Link></li>
        <li><Link href="/technology">Technology</Link></li>
        <li><Link href="/office">Office</Link></li>
        <li><Link href="/stationary">Stationary</Link></li>

        {isAuthenticated ? (
          <>
            <li><Link href="/myaccount">My Account</Link></li>
            <li onClick={() => { handleLogout(); setOpenDrawer(false); }} className="cursor-pointer">Logout</li>
          </>
        ) : (
          <>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <div className="w-full top-0 left-0 z-[9999]">
      {/* Main Navbar matching reference image */}
      <div className="w-full px-4 lg:px-8 py-3 transition-all duration-300 bg-white">
        <div className="w-full flex flex-row items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img className="lg:w-[60px] lg:mr-2 w-[80px]" src="/asset/Navbar/Nutanlogo.png" alt="logo" />
              <span className="text-black text-lg lg:text-2xl font-bold hidden lg:block">
                Nutan Overseas
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Search for Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setOpenDropdownSearch(true)}
                className="w-full px-4 py-2.5 pr-12 bg-gray-300 text-gray-800 rounded-full focus:outline-none  text-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#5A4A2E] p-2 rounded-full hover:bg-[#4A3D28] transition-colors">
                <IoSearchOutline className="w-4 h-4 text-white" />
              </button>

              {/* Search Dropdown */}
              {openDropdownSearch && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {searchQuery ? (
                    <div className="p-2">
                      {product
                        .filter((p) => p.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 10)
                        .map((item) => (
                          <Link 
                            href={`/shop/${item.id}`} 
                            key={item.id} 
                            onClick={() => setOpenDropdownSearch(false)}
                          >
                            <div className="flex gap-3 items-center p-2 hover:bg-gray-100 cursor-pointer rounded">
                              <img
                                src={item.productImages?.[0] || "/placeholder.jpg"}
                                alt={item.productName}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">{item.productCategory}</span>
                                <span className="text-sm font-medium text-gray-800">{item.productName}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Popular Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Bags", "Technology", "Office", "Drinkware"].map((term) => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - User Info & Actions */}
          <div className="flex items-center gap-4">
            
            {/* Currency Selector with flag - Desktop Only */}
            <div className="hidden lg:flex items-center px-3 py-2 rounded-lg  cursor-pointer">
                <img className="w-5 mr-2" src="/asset/flag/aed.png" alt="logo" />

              <span className="text-black text-sm font-medium mr-1">AED</span>
              <IoChevronDownOutline className="w-3 h-3 text-black" />
            </div>

            {/* User Icon and Welcome Message */}
            <div className="hidden lg:flex flex-row items-center text-white">
              <Link href="/myaccount" className="cursor-pointer">
                {isAuthenticated ? (
                  <BsPerson className="w-[30px] h-[30px] text-black hover:text-[#EAD987] transition-colors" />
                ) : (
                  <img
                    src="/asset/Navbar/Profile-account.png"
                    className="w-[30px] h-[30px]"
                    alt="Account"
                  />
                )}
              </Link>
              <p className="text-sm text-black mt-1 text-center leading-tight">
                Welcome,<br />
                <span className="underline">{isAuthenticated ? userProfile?.displayName || "User" : "Guest"}
                </span>
              </p>

            </div>

            {/* Cart */}
            <Link href="/cart" className="hidden lg:flex items-center text-black hover:text-[#EAD987] transition-colors relative">
              <HiOutlineShoppingCart className="w-6 h-6 mr-1" />
              <span className="text-sm">Cart</span>
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </div>
              )}
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden lg:flex items-center text-black hover:text-[#EAD987] transition-colors">
              <IoHeartOutline className="w-5 h-5 mr-1" />
              <span className="text-sm">Wishlist</span>
            </Link>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <button 
                onClick={() => setOpenDropdownSearch(true)} 
                className="text-black p-2"
              >
                <IoSearchOutline className="w-5 h-5" />
              </button>

              <Link href="/myaccount" className="cursor-pointer">
                {isAuthenticated ? (
                  <BsPerson className="w-[30px] h-[30px] text-black hover:text-[#EAD987] transition-colors" />
                ) : (
                  <img
                    src="/asset/Navbar/Profile-account.png"
                    className="w-[30px] h-[30px]"
                    alt="Account"
                  />
                )}
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)} 
                className="text-black p-2 relative"
              >
                <HiOutlineShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </div>
                )}
              </button>

              <button 
                onClick={() => setOpenDrawer(true)} 
                className="text-black p-2"
              >
                <HiOutlineMenu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu Bar - Desktop */}
      <div className="hidden lg:block w-full bg-[#6B5A3F] px-8 py-2">
        <div className="flex items-center justify-between">
          {navList}
          
          {/* Right side navigation items */}
          <div className="flex items-center gap-6 text-white text-sm">
            <Link href="/tracking" className="hover:text-[#EAD987] transition-colors">
              Tracking Package
            </Link>
            <Link href="/faq" className="hover:text-[#EAD987] transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="hover:text-[#EAD987] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#EAD987] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {openDropdownSearch && (
        <div className="lg:hidden fixed inset-0 bg-white z-[9999] p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Search Products</h2>
            <button onClick={() => setOpenDropdownSearch(false)}>
              <RxCross1 className="w-6 h-6" />
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#6B5B3A]"
            autoFocus
          />

          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {searchQuery ? (
              product
                .filter((p) => p.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(0, 10)
                .map((item) => (
                  <Link 
                    href={`/shop/${item.id}`} 
                    key={item.id} 
                    onClick={() => setOpenDropdownSearch(false)}
                  >
                    <div className="flex gap-3 items-center p-3 border-b border-gray-100">
                      <img
                        src={item.productImages?.[0] || "/placeholder.jpg"}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.productName}</p>
                        <p className="text-xs text-gray-500">{item.productCategory}</p>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Start typing to search products
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 w-screen h-screen bg-white z-[9998] px-6 pt-6 transform transition-transform duration-300 ${
        openDrawer ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Menu</h2>
          <RxCross1 className="text-[20px] cursor-pointer" onClick={() => setOpenDrawer(false)} />
        </div>
        {navListMobile}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}