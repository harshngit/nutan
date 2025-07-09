"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/actions/authActions";
import CartSidebar from "../Cart/CartSidebar"; 
import { FaUserCheck } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";


 // Assuming you already have this component

const navItems = [
  { label: "BAG", href: "/", children: []},
  { label: "GIFTSETS", href: "/"},
  { label: "DRINKWARE", href: "/" },
  { label: "TECHNOLOGY", href: "/"},
  { label: "OFFICE", href: "/"},
  { label: "STATIONARY", href: "/"},
];

// const accountItems = [
//   { label: "Login", href: "/login" },
//   { label: "Register", href: "/register" },
//   { label: "My Account", href: "/account" },
// ];

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
   const { cartItems } = useSelector((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAccountDropdown, setOpenAccountDropdown] = useState(false);
  const [openDropdownSearch, setOpenDropdownSearch] = useState(false);

  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const accountTimeoutRef = useRef(null);

  const userState = useSelector((state) => state.user);
  const { isAuthenticated, userProfile } = userState || {};

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href) => pathname === href;
  console.log(isAuthenticated)

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
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-3 lg:gap-3 text-white uppercase font-[poppins] font-medium !text-sm tracking-wide">
      {navItems.map((item, idx) => {
        const hasChildren = item.children && item.children.length > 0;
        const isParentActive = isActive(item.href) || item.children?.some((child) => isActive(child.href));

        return (
          <li key={idx} className="relative">
            <div onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
              <Link href={item.href} className={`group px-6 py-2 transition lg:text-[16px] block ${isParentActive ? "text-black" : "text-black"}`}>
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
      <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-[40px] lg:gap-4 text-black uppercase font-medium !text-sm tracking-wide">
  <li><Link href="/">Bags</Link></li>
  <li><Link href="/shop">Giftsets</Link></li>
  <li><Link href="">Drinkware</Link></li>
  <li><Link href="/Contact">Technology</Link></li>
  <li><Link href="/Contact">Office</Link></li>
  <li><Link href="/Contact">Stationary</Link></li>

  {isAuthenticated ? (
  <>
    <li><Link href="/viewProfile">My Account</Link></li>
    <li><Link href="/myorder">My Order</Link></li>
    <li onClick={() => { handleLogout(); setOpenDrawer(false); }} className="cursor-pointer">Logout</li>
  </>
) : (
  <>
    <li><Link href="/login">Login</Link></li>
    <li><Link href="/register">Register</Link></li>
  </>
)}

</ul>


      <div className="flex gap-8 justify-start items-center">
        {/* Search - Mobile */}
        <Link href="">
          <img src="/asset/Navbar/search.png" className="w-[28px]" alt="Search" />
        </Link>

        {/* Wishlist - Mobile */}
        <Link href="/wishlist">
          <img src="/asset/Navbar/heart.png" className="w-[28px]" alt="Wishlist" />
        </Link>

        {/* Cart - Mobile */}
        <Link href="/cart">
          <div className="relative p-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer">
            <img src="/asset/Navbar/cart.png" alt="Cart" className="w-[28px] h-[28px] object-contain" />
            {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-screen z-[9999]">
      <div className="w-full px-4 lg:px-0 py-4 lg:py-0 transition-all duration-300 bg-[#fff]">
        <div className="w-full lg:pt-[30px] lg:px-[30px] lg:pb-[20px] flex">
          <Link href="/" className="lg:w-[20%] w-[90%] lg:flex lg:justify-start justify-center items-center">
            <img className="lg:w-[100px] w-[50px]" src="/asset/Navbar/nutan.png" alt="logo" />
          </Link>

          <div className="hidden lg:w-[60%] lg:flex justify-start items-center">
            {navList}
          </div>

          <div className="lg:hidden lf:w-[33.33%] flex justify-start items-center" onClick={() => setOpenDrawer(true)}>
            <img src="/asset/Home/menu.png" className="w-[38px]" alt="Menu" />
          </div>

          <div className="lg:flex hidden lg:w-[20%] w-[33.33%] gap-8 justify-end items-center">
            {/* Account Dropdown */}
            <div className="relative" onMouseEnter={handleAccountMouseEnter} onMouseLeave={handleAccountMouseLeave}>              
  <div className="cursor-pointer relative text-black flex items-center gap-1">
    {isAuthenticated ? (
      <>
        <BsPerson className="text-[30px]" />
        {/* <span className="text-sm font-medium">My Profile</span> */}
      </>
    ) : (
      <>
        <BsPerson className="text-[30px]" />
        {/* <span className="text-sm font-medium">Login</span> */}
      </>
    )}
  </div>

  {openAccountDropdown && (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      {isAuthenticated ? (
        <>
          <div className="px-4 py-2 text-xs text-gray-500">Hi, {userProfile?.displayName}</div>
          <Link href="/viewProfile">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</div>
          </Link>
          <Link href={'/orders'} >
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Order</li>
              </Link>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <Link href="/login">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Login</div>
          </Link>
          <Link href="/register">
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Register</div>
          </Link>
        </>
      )}
    </div>
  )}
</div>


            {/* Search with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <img src="/asset/Navbar/search.png" className="w-[28px] cursor-pointer" alt="Search" onClick={() => setOpenDropdownSearch(!openDropdownSearch)} />
              {openDropdownSearch && (
                <div className="absolute right-0 mt-2 z-20 shadow-lg w-60 bg-white p-3 rounded border">
                  <input type="text" placeholder="Type to search..." className="w-full px-3 py-2 border border-gray-300 rounded text-black text-sm focus:outline-none" />
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <img src="/asset/Navbar/heart.png" className="w-[28px]" alt="Wishlist" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              aria-label="Open shopping cart"
              suppressHydrationWarning={true}
            >
              <img src="/asset/Navbar/cart.png" alt="Cart" className="w-[28px] h-[28px] object-contain" />
              
              {cartItems.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </div>
              )}
            </button>

          </div>

          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-screen h-screen bg-[#FFFFFF] z-[9998] px-6 pt-6 transform transition-transform duration-300 ${openDrawer ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end items-center mb-4">
          <RxCross1 className="text-[20px] cursor-pointer" onClick={() => setOpenDrawer(false)} />
        </div>
        {navListMobile}
      </div>
    </div>
  );
}