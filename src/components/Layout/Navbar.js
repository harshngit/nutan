"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import CartSidebar from "../Cart/CartSidebar"; 
import { BsPerson } from "react-icons/bs";
import { useCurrency } from "@/Context/CurrencyProvider";


// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const navItems = [
  { label: "Shop", href: "/allproduct"},
  { label: "Bag", href: "/bag", children: []},
  { label: "Giftsets", href: "/giftsets"},
  { label: "Drinkware", href: "/drinkware" },
  { label: "Technology", href: "/technology"},
  { label: "Office", href: "/office"},
  { label: "Stationary", href: "/stationary"},
];

export default function Navbar() {
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

  const navList = (
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-3 lg:gap-0 text-white  font-[poppins] font-medium !text-sm tracking-wide">
      {navItems.map((item, idx) => {
        const hasChildren = item.children && item.children.length > 0;
        const isParentActive = isActive(item.href) || item.children?.some((child) => isActive(child.href));

        return (
          <li key={idx} className="relative">
            <div onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
              <Link href={item.href} className={`group px-4 py-2 transition lg:text-[16px] block ${isParentActive ? "text-black" : "text-black"}`}>
                {item.label}
              </Link>
              {hasChildren && openDropdown === item.label && (
                <div className="absolute left-0 mt-1 z-20 shadow-lg w-48">
                  {item.children.map((child, i) => (
                    <Link key={i} href={child.href}>
                      <div className={`px-4 py-2 transition cursor-pointer ${isActive(child.href) ? "bg-[#89898933] text-lightgrey" : "bg-[#DDDDDD33] hover:bg-[#DDDDDD33] hover:border-[1px] text-lightgrey border-[#89898933]"}`}>
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
        <li><Link href="/allproduct">Shop</Link></li>
        <li><Link href="/bag">Bags</Link></li>
        <li><Link href="/giftsets">Giftsets</Link></li>
        <li><Link href="/drinkware">Drinkware</Link></li>
        <li><Link href="/technology">Technology</Link></li>
        <li><Link href="/office">Office</Link></li>
        <li><Link href="/stationary">Stationary</Link></li>

        {isAuthenticated ? (
          <>
            <li><Link href="/myaccount">My Account</Link></li>
            {/* <li><Link href="/myorder">My Order</Link></li> */}
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

  console.log("Selected currency:", currency);


  return (
    <div className="w-full top-0 left-0 z-[9999]">
      <div className="w-full px-4 lg:px-0 py-4 lg:py-2 transition-all duration-300 bg-[#fff]">
        <div className="w-full lg:pl-[20px] lg:pr-[30px] flex">
          <Link href="/" className="lg:w-[30%] w-[60%] flex lg:flex lg:justify-start justify-start items-center">
            <img className="lg:w-[80px] w-[80px]" src="/asset/Navbar/Nutanlogo.png" alt="logo" />
          </Link>

          <div className="hidden lg:w-[60%] lg:flex justify-start items-center">
            {navList}
          </div>

          <div className="lg:hidden w-[100%] flex justify-end items-center">
            <div className="flex items-center gap-4 pr-2">
              <div className="relative" ref={dropdownRef}>
              <img src="/asset/Navbar/search.png" className="w-[20px] cursor-pointer" alt="Search" onClick={() => setOpenDropdownSearch(!openDropdownSearch)} />
              {openDropdownSearch && (
  <div className="fixed md:top-[4rem] top-0 left-0 w-full h-screen z-[9999] bg-white px-[20px] py-[20px]  overflow-auto">
    {/* Search Header */}
    <div className="flex justify-between items-center">
      <label className="text-green-600 font-semibold text-sm uppercase tracking-wide">Search</label>
      <RxCross1 className="text-xl cursor-pointer" onClick={() => setOpenDropdownSearch(false)} />
    </div>

    {/* Search Input */}
    <input
      type="text"
      placeholder=""
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="mt-2 w-full border-0 border-b-[2px] border-green-600 text-black text-lg px-1 py-2 focus:outline-none"
    />

    {/* Trending Search */}
    {!searchQuery && (
      <div className="mt-8">
        <h3 className="text-black font-bold text-sm uppercase mb-4">Trending Search</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Loop Powerbanks",
            "Pop Adapter",
            "Wireless Charger",
            "Vault Tech Organiser",
            "Apple Watch Straps",
            "Wallets",
            "Leatherite Cases",
            "Phone Cases"
          ].map((item, idx) => (
            <button
              key={idx}
              className="border border-gray-400 text-sm px-3 py-1 rounded hover:bg-gray-100"
              onClick={() => setSearchQuery(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Search Results */}
    {searchQuery && (
      <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto">
        {product
          .filter((p) => p.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item) => (
            <Link href={`/shop/${item.id}`} key={item.id} onClick={() => setOpenDropdownSearch(false)}>
              <div className="flex gap-4 items-center p-3 hover:bg-gray-100 cursor-pointer rounded">
                <img
                  src={item.productImages?.[0] || "/placeholder.jpg"}
                  alt={item.productName}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.productCategory}</span>
                  <span className="text-base font-medium text-gray-800">{item.productName}</span>
                </div>
              </div>
            </Link>
          ))}
        {product.filter((p) => p.productName?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
          <p className="text-sm text-gray-500">No matching products found</p>
        )}
      </div>
    )}
  </div>
)}

            </div>
              
              <Link href={isAuthenticated ? "/viewProfile" : "/login"}>
                <BsPerson className="text-[26px] text-black" />
              </Link>

              <button onClick={() => setIsCartOpen(true)} className="relative text-black">
                <img src="/asset/Navbar/cart.png" alt="Cart" className="w-[26px] h-[26px]" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </div>
                )}
              </button>

              <div onClick={() => setOpenDrawer(true)} className="p-2">
                <img src="/asset/Home/menu.png" className="w-[34px]" alt="Menu" />
              </div>
            </div>
          </div>

          <div className="lg:flex hidden lg:w-[20%] gap-6 justify-end items-center">
            {/* Account Dropdown */}
           <Link
      href="/myaccount"
      className="cursor-pointer"
    >
      {isAuthenticated ? (
        <BsPerson className="w-[30px] h-[30px] text-black" />
      ) : (
        <img
          src="/asset/Navbar/Profile-account.png"
          className="w-[30px] h-[30px]"
          alt="Account"
        />
      )}
    </Link>



            {/* Search with Firebase Integration */}
<div className="relative" ref={dropdownRef}>
  <img
    src="/asset/Navbar/search.png"
    className="w-[24px] cursor-pointer"
    alt="Search"
    onClick={() => setOpenDropdownSearch(!openDropdownSearch)}
  />
  {openDropdownSearch && (
    <div className="fixed top-[5rem] left-0 w-full h-screen z-[9999] bg-white overflow-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <label className="text-[#4B4B4B] text-[18px]">Search</label>
          <RxCross1
            className="text-[18px] text-black cursor-pointer"
            onClick={() => setOpenDropdownSearch(false)}
          />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // placeholder="Search..."
          className="w-full text-[18px] text-black border-b border-gray-400 focus:border-black focus:outline-none pb-2"
        />

        {/* Trending Search Tags */}
        {!searchQuery && (
          <div className="mt-8">
            <h3 className="text-black text-sm font-bold uppercase tracking-wider mb-4">Trending Search</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Loop Powerbanks",
                "Pop Adapter",
                "Wireless Charger",
                "Vault Tech Organiser",
                "Apple Watch Straps",
                "Wallets",
                "Phone Cases"
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="text-sm border border-gray-300 text-[#1a1a1a] px-4 py-1.5 rounded-md hover:bg-[#f1f1f1] transition"
                  onClick={() => setSearchQuery(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto">
            {product
              .filter((p) =>
                p.productName?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <Link href={`/shop/${item.id}`} key={item.id} onClick={() => setOpenDropdownSearch(false)}>
                  <div className="flex items-center gap-4 p-3 rounded-md hover:bg-[#f9f9f9] transition cursor-pointer">
                    <img
                      src={item.productImages?.[0] || "/placeholder.jpg"}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">{item.productCategory}</span>
                      <span className="text-sm font-medium text-black">{item.productName}</span>
                    </div>
                  </div>
                </Link>
              ))}
            {product.filter((p) =>
              p.productName?.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <p className="text-sm text-gray-400">No matching products found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )}
</div>



            <Link href="/wishlist">
              <img src="/asset/Navbar/heart.png" className="w-[24px]" alt="Wishlist" />
            </Link>

            <button onClick={() => setIsCartOpen(true)} className="relative">
              <img src="/asset/Navbar/cart.png" alt="Cart" className="w-[24px] h-[24px]" />
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </div>
              )}
            </button>

            {/* <div className="relative">
              <select
                value={currency}

                onChange={(e) => setCurrency(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm text-black"
              >
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
              </select>
            </div> */}
          </div>

          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 w-screen h-screen bg-[#FFFFFF] z-[9998] px-6 pt-6 transform transition-transform duration-300 ${openDrawer ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end items-center mb-4">
          <RxCross1 className="text-[20px] cursor-pointer" onClick={() => setOpenDrawer(false)} />
        </div>
        {navListMobile}
      </div>
    </div>
  );
}
