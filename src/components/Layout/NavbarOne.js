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
  { 
    label: "All Category", 
    href: "/allproduct", 
    hasDropdown: true,
    isAllCategory: true,
    children: [
       {
        title: "Bags & Carry Items",
        image: "/asset/categories/phone-cases.jpg",
        items: [
          { label: "Laptop Bags", href: "/bag/laptopbags" },
          { label: "Tote Bags", href: "/bag/totebags" },
          { label: "Tech Organizers", href: "/bag/techorganizers" },
          { label: "Drawstring Pouches", href: "/bag/drawstringpouches" },
          { label: "Welcome Kit Bags", href: "/bag/welcomekitbags" }
        ],
        viewAllLink: "/bag"
      },
      {
        title: "Tech & Gadgets",
        image: "/asset/categories/watch-accessories.jpg",
        items: [
          { label: "Wireless Chargers", href: "/technology/wirelesschargers" },
          { label: "Charging Cables", href: "/technology/chargingcables" },
          { label: "Wireless Mice", href: "/technology/wirelessmice" },
          { label: "Tech Gift Sets", href: "/technology/techgiftsets" },
          { label: "USB Essentials", href: "/technology/usbessentials" }
        ],
        viewAllLink: "/technology"
      },
      {
        title: "Office & Stationery",
        image: "/asset/categories/charging-solutions.jpg",
        items: [
          { label: "Eco Notebooks", href: "/office/econotebooks" },
          { label: "Leather Folders", href: "/office/leatherfolders" },
          { label: "Sticky Notes & Memo Pads", href: "/office/stickynotes" },
          { label: "Eco Pens & Writing Tools", href: "/office/ecopens" },
          { label: "Executive Stationery", href: "/office/executivestationery" }
        ],
        viewAllLink: "/office"
      },
      {
        title: "Drinkware",
        image: "/asset/categories/tech-addons.jpg",
        items: [
          { label: "Reusable Bottles", href: "/drinkware/reusablebottles" },
          { label: "Eco Mugs with Lids", href: "/drinkware/ecomugs" },
          { label: "Stainless Steel Tumblers", href: "/drinkware/stainlesssteel" },
          { label: "Sippers with Straps", href: "/drinkware/sipperswithstraps" }
        ],
        viewAllLink: "/drinkware"
      },
      {
        title: "Gift Sets & Kits",
        image: "/asset/categories/laptop-bags.jpg",
        items: [
          { label: "Welcome Kits", href: "/giftsets/welcomekits" },
          { label: "Festive Gift Sets", href: "/giftsets/festivegiftsets" },
          { label: "Corporate Combo Packs", href: "/giftsets/corporatecombopacks" },
          { label: "Custom Bundles (Build Your Own)", href: "/giftsets/custombundles" }
        ],
        viewAllLink: "/giftsets"
      },
      {
        title: "Eco Lifestyle",
        image: "/asset/categories/stands.jpg",
        items: [
          { label: "Bamboo Cutlery Sets", href: "/ecolifestyle/bamboocutlerysets" },
      { label: "Eco Coasters", href: "/ecolifestyle/ecocoasters" },
      { label: "Cork & Wheat Straw Accessories", href: "/ecolifestyle/corkwheatstraw" },
      { label: "Recycled Material Goods", href: "/ecolifestyle/recycledmaterialgoods" }
        ],
        viewAllLink: "/ecolifestyle"
      },
      {
        title: "Events & Conference Essentials",
        image: "/asset/categories/organisers.jpg",
        items: [
          { label: "Biodegradable Lanyards", href: "/events/biodegradablelanyards" },
          { label: "Name Card Holders (future)", href: "/events/namecardholders" },
          { label: "Eco Folders", href: "/events/ecofolders" },
          { label: "Conference Giveaways", href: "/events/conferencegiveaways" }
        ],
        viewAllLink: "/events"
      }
    ]
  },
  { 
    label: "Bags", 
    href: "/bag", 
    hasDropdown: true,
    children: [
      { label: "Laptop Bags", href: "/bag/laptopbags", icon: "💼" },
      { label: "Tote Bags", href: "/bag/totebags", icon: "🎒" },
      { label: "Tech Organizers", href: "/bag/techorganizers", icon: "🎒" },
      { label: "Drawstring Pouches", href: "/bag/drawstringpouches", icon: "👜" },
      { label: "Welcome Kit Bags", href: "/bag/welcomekitbags", icon: "🎒" }
    ]
  },
  { 
    label: "Gift Sets", 
    href: "/giftsets",
    hasDropdown: true,
    children: [
      { label: "Welcome Kits", href: "/giftsets/welcomekits", icon: "🎁" },
      { label: "Festive Gift Sets", href: "/giftsets/festivegiftsets", icon: "💼" },
      { label: "Corporate Combo Packs", href: "/giftsets/corporatecombopacks", icon: "🎄" },
      { label: "Custom Bundles (Build Your Own)", href: "/giftsets/custombundles", icon: "⭐" }
    ]
  },
  { 
    label: "Drinkware", 
    href: "/drinkware",
    hasDropdown: true,
    children: [
      { label: "Reusable Bottles", href: "/drinkware/reusablebottles", icon: "☕" },
      { label: "Eco Mugs with Lids", href: "/drinkware/ecomugs", icon: "💧" },
      { label: "Stainless Steel Tumblers", href: "/drinkware/stainlesssteel", icon: "🥤" },
      { label: "Sippers with Straps", href: "/drinkware/sipperswithstraps", icon: "🌡️" }
    ]
  },
  { 
    label: "Technology", 
    href: "/technology",
    hasDropdown: true,
    children: [
      { label: "Wireless Chargers", href: "/technology/wirelesschargers", icon: "🔋" },
      { label: "Charging Cables", href: "/technology/chargingcables", icon: "💾" },
      { label: "Wireless Mice", href: "/technology/wirelessmice", icon: "🔊" },
      { label: "Tech Gift Sets", href: "/technology/techgiftsets", icon: "🎧" },
      { label: "USB Essentials", href: "/technology/usbessentials", icon: "⚡" }
    ]
  },
  { 
    label: "Office", 
    href: "/stationary",
    hasDropdown: true,
    children: [
      { label: "Eco Notebooks", href: "/office/econotebooks", icon: "🗂️" },
      { label: "Leather Folders", href: "/office/leatherfolders", icon: "📁" },
      { label: "Sticky Notes & Memo Pads", href: "/office/stickynotes", icon: "📅" },
      { label: "Eco Pens & Writing Tools", href: "/office/ecopens", icon: "💳" },
      { label: "Executive Stationery", href: "/office/executivestationery", icon: "💳" }
    ]
  },
  { 
    label: "Eco Lifestyle", 
    href: "/ecolifestyle",
    hasDropdown: true,
    children: [
      { label: "Bamboo Cutlery Sets", href: "/ecolifestyle/bamboocutlerysets", icon: "📓" },
      { label: "Eco Coasters", href: "/ecolifestyle/ecocoasters", icon: "🖊️" },
      { label: "Cork & Wheat Straw Accessories", href: "/ecolifestyle/corkwheatstraw", icon: "📋" },
      { label: "Recycled Material Goods", href: "/ecolifestyle/recycledmaterialgoods", icon: "📂" }
    ]
  },
  { 
    label: "Events", 
    href: "/events",
    hasDropdown: true,
    children: [
      { label: "Biodegradable Lanyards", href: "/events/biodegradablelanyards", icon: "📓" },
      { label: "Name Card Holders (future)", href: "/events/namecardholders", icon: "🖊️" },
      { label: "Eco Folders", href: "/events/ecofolders", icon: "📋" },
      { label: "Conference Giveaways", href: "/events/conferencegiveaways", icon: "📂" }
    ]
  }
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
  const [mobileDropdowns, setMobileDropdowns] = useState({});

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

  // Toggle mobile dropdown
  const toggleMobileDropdown = (label) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

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
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-3 lg:gap-0 text-white font-[poppins] font-medium !text-xs tracking-wide">
      {navItems.map((item, idx) => {
        const hasChildren = item.hasDropdown && item.children && item.children.length > 0;
        const isParentActive = isActive(item.href) || item.children?.some((child) => isActive(child.href));

        return (
          <li key={idx} className="relative group">
            <div 
              onMouseEnter={() => handleMouseEnter(item.label)} 
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Link href={item.href} className={`group px-4 py-3 transition lg:text-[15px] block flex items-center ${
                isParentActive ? "text-white bg-[#5A4A2E]" : "text-white hover:text-[#EAD987]"
              } rounded-md`}>
                {item.label}
                {item.hasDropdown && (
                  <IoChevronDownOutline className="ml-1 w-3 h-3" />
                )}
              </Link>
              
              {/* Desktop Dropdown - Full Width for All Category, Regular for Others */}
              {hasChildren && openDropdown === item.label && (
                item.isAllCategory ? (
                  // All Category Mega Menu
                  <div className="fixed left-0 top-[140px] w-full z-50 bg-white shadow-2xl border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-8 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-8">
                        {item.children.map((category, i) => (
                          <div key={i} className="flex flex-col">
                            {/* Category Image */}
                            <div className="mb-4 relative group">
                              <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-32 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                                onError={(e) => {
                                  e.target.src = "/placeholder-image.jpg"; // Fallback image
                                }}
                              />
                            </div>
                            
                            {/* Category Title */}
                            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">
                              {category.title}
                            </h3>

                            {/* Category Items */}
                            <ul className="space-y-1 mb-4">
                              {category.items.map((item, idx) => (
                                <li key={idx}>
                                  <Link 
                                    href={item.href}
                                    className="text-sm text-gray-600 hover:text-[#6B5A3F] transition-colors duration-150 block py-1"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            
                            {/* View All Link */}
                            <Link 
                              href={category.viewAllLink}
                              className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors duration-150 mt-auto"
                            >
                              View All +
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular Category Dropdown - Full Width
                  <div className="fixed left-0 top-[140px] w-full z-50 bg-white shadow-2xl border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-8 py-8">
                      {/* <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        {item.label} Categories
                      </h3> */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {item.children.map((child, i) => (
                          <Link key={i} href={child.href}>
                            <div className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:shadow-md hover:scale-105 ${
                              isActive(child.href) ? "bg-gray-100 shadow-md" : ""
                            }`}>
                              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl hover:from-[#6B5A3F] hover:to-[#5A4A2E] hover:text-white transition-all duration-200">
                                {child.icon}
                              </div>
                              <span className="text-sm font-semibold text-gray-700 hover:text-[#6B5A3F] text-center transition-colors">
                                {child.label}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );

  const navListMobile = (
    <div className="flex flex-col gap-[40px]">
      <ul className="flex flex-col gap-[20px] text-black uppercase font-semibold !text-sm tracking-wide">
        {navItems.map((item, idx) => {
          const hasChildren = item.hasDropdown && item.children && item.children.length > 0;
          const isDropdownOpen = mobileDropdowns[item.label];
          
          return (
            <li key={idx} className="w-full">
              <div className="flex items-center justify-between">
                <Link href={item.href} className="flex-1">
                  {item.label}
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="p-2 hover:bg-gray-100 rounded-md"
                  >
                    <IoChevronDownOutline 
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                )}
              </div>
              
              {/* Mobile Dropdown */}
              {hasChildren && isDropdownOpen && (
                <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                  {item.isAllCategory ? (
                    // All Category Mobile Layout
                    item.children.map((category, i) => (
                      <div key={i} className="mb-4">
                        <h4 className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wider">
                          {category.title}
                        </h4>
                        {category.items.slice(0, 3).map((subItem, idx) => (
                          <Link 
                            key={idx}
                            href={`${category.viewAllLink}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => setOpenDrawer(false)}
                          >
                            <div className="py-1 text-xs text-gray-600 hover:text-[#6B5A3F] transition-colors">
                              {subItem}
                            </div>
                          </Link>
                        ))}
                        <Link 
                          href={category.viewAllLink}
                          onClick={() => setOpenDrawer(false)}
                        >
                          <div className="text-xs text-teal-600 font-medium mt-1">
                            View All +
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    // Regular Category Mobile Layout
                    item.children.map((child, i) => (
                      <Link 
                        key={i} 
                        href={child.href}
                        onClick={() => setOpenDrawer(false)}
                      >
                        <div className="flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-[#6B5A3F] transition-colors">
                          <span className="text-base">{child.icon}</span>
                          <span className="capitalize font-normal">{child.label}</span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </li>
          );
        })}

        {/* Authentication Links */}
        <li className="border-t border-gray-200 pt-4">
          {isAuthenticated ? (
            <>
              <Link href="/myaccount" className="block py-2">My Account</Link>
              <button 
                onClick={() => { handleLogout(); setOpenDrawer(false); }} 
                className="block py-2 text-left w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2">Login</Link>
              <Link href="/register" className="block py-2">Register</Link>
            </>
          )}
        </li>
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
                className="w-full px-4 py-2.5 pr-12 bg-gray-300 text-gray-800 rounded-full focus:outline-none  text-base font-semibold"
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
      <div className="hidden lg:block w-full bg-[#3B3310] px-8 py-2">
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
            <Link href="/Contact" className="hover:text-[#EAD987] transition-colors">
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
        <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
          {navListMobile}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}