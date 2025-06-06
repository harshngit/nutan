"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaUser } from "react-icons/fa";
const navItems = [
  {
    label: "Home",
    href: "/",
    children: [
      // { label: "Brand Story", href: "/brand-story" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "About",
    href: "",
  },
  {
    label: "Contact",
    href: "",
  },
];
export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(false);

  const isActive = (href) => pathname === href;
  const [openDropdowncart, setOpenDropdowncart] = useState(false);

  const handleMouseEntercart = () => setOpenDropdown(true);
  const handleMouseLeavecart = () => setOpenDropdown(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 150); // delay to allow smooth mouse movement
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);


  const navList = (
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-3 lg:gap-3 text-white uppercase font-normal !text-sm tracking-wide">
      {navItems.map((item, idx) => {
        const hasChildren = item.children && item.children.length > 0;
        const isParentActive =
          isActive(item.href) || item.children?.some((child) => isActive(child.href));

        return (
          <li key={idx} className="relative">
            <div
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`group px-3 py-2 transition lg:text-[16px] block ${isParentActive ? "text-black" : "text-black"
                  }`}
              >
                {item.label}
              </Link>

              {/* Dropdown */}
              {hasChildren && openDropdown === item.label && (
                <div className="absolute left-0 mt-1 z-20 shadow-lg w-48">
                  {item.children.map((child, i) => (
                    <Link key={i} href={child.href}>
                      <div
                        className={`px-4 py-2 transition cursor-pointer ${isActive(child.href)
                          ? "bg-[#89898933] text-lightgrey"
                          : "bg-[#DDDDDD33] hover:bg-[#DDDDDD33] hover:border-[1px] text-lightgrey border-[#89898933]"
                          }`}
                      >
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
    <ul className="flex flex-col lg:flex-row items-start lg:items-center lg:flex-wrap gap-[40px] lg:gap-4 text-white uppercase font-medium !text-sm tracking-wide">

      <div className="flex flex-col items-center relative">
        <div className="flex justify-center items-center gap-2">
          <Link href="/forhim">
            <li className="cursor-pointer text-[20px] text-[#2F3435] ">
              Home
            </li>
          </Link>
          <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {/* {isOpen ? <img className="w-[20px]" src="asset/up.png" alt="dropdown icon" /> : <img className="w-[20px]" src="asset/down.png" alt="dropdown icon" />} */}
          </div>
        </div>

        {/* {isOpen && (
          <div className="absolute top-4 mt-2 left-0 rounded w-[200px] z-10">
            <li>
              <Link
                href="/brand-story"
                className="block px-4 py-2 text-[15px] text-[#2F3435] hover:bg-gray-100 "
              >
                Brand Story
              </Link>
            </li>
          </div>
        )} */}
      </div>



      <li className="">
        <Link
          href=""
          className="cursor-pointer text-[20px] text-[#2F3435]   transition"
        >
          Shop
        </Link>
      </li>

      <li className="">
        <Link
          href="/shop"
          className="cursor-pointer text-[20px] text-[#2F3435]   transition"
        >
          About
        </Link>
      </li>
      <li className="">
        <Link
          href=""
          className="cursor-pointer text-[20px] text-[#2F3435]   transition"
        >
          Contact
        </Link>
      </li>
      {/* <li className="">
        <Link
          href="/wishlist"
          className="cursor-pointer text-[20px] text-[#2F3435]   transition"
        >
          Wishlist
        </Link>
      </li> */}

    </ul>
  );
  return (
    <div className=" font-poppins fixed top-0 left-0 w-screen z-[9999]">
      {/* <div className='bg-black w-full px-1 py-1 flex justify-center items-center'>
        <div className='font-400  text-[11px] text-white'>
          Complimentary U.S. No-Rush Shipping on orders of $95 or more. Shop now
        </div>
      </div> */}
      <div
        className={`w-full px-4 lg:px-0 py-4 lg:py-0 transition-all duration-300 bg-[#fff]`}
      >
        <div className="w-full lg:pt-[30px] lg:pl-[30px] lg:pb-[20px] flex">
          <Link href="/"
            className="lg:w-[33%] w-[90%] lg:flex lg:justify-start justify-center items-center"
          >
            <div className="">
              <img
                className="lg:w-[100px] w-[50px] "
                src="/asset/Navbar/nutan.png"
                alt="logo"
              />
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:w-[35%] lg:flex justify-center items-center ">
            {/* <div className="">
              <img src="/asset/Home/menu.png" className="w-[38px]" alt="Menu" />
            </div> */}
            <div>{navList}</div>
          </div>
          <div className="lg:hidden  lf:w-[33.33%] flex justify-start items-center"
            onClick={() => setOpenDrawer(true)}>
            <img src="/asset/Home/menu.png" className="w-[38px]" alt="Menu" />
          </div>
          {/* Logo */}

          {/* menu */}
          <div className="lg:flex hidden lg:w-[30%] w-[33.33%] gap-8 justify-center items-center">
            <Link href="">
              <img src="/asset/Navbar/account.png" className="w-[28px]" alt="" />
            </Link>
            <Link href="">
              <img src="/asset/Navbar/search.png" className="w-[28px]" alt="" />
            </Link>
            <Link href="">
              <img src="/asset/Navbar/heart.png" className="w-[28px]" alt="" />
            </Link>
            <Link href="">
              <img src="/asset/Navbar/cart.png" className="w-[28px]" alt="" />
            </Link>
          </div>

          {/* Mobile Icon */}
          {/* <div
            variant="text"
            className="text-black lg:hidden w-[50px] h-[50px] flex justify-center items-center"
            onClick={() => setOpenDrawer(true)}
          >

          </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-screen h-screen bg-[#FFFFFF] z-[9998] px-6 pt-6 transform transition-transform duration-300 ${openDrawer ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-end items-center mb-4">
          <div
            variant="text"
            className="text-black"
            onClick={() => setOpenDrawer(false)}
          >
            <RxCross1 className="text-[20px] " />
          </div>
        </div>
        {navListMobile}
        {/* <div className="mt-5">
          <ul className="flex flex-col justify-start items-start gap-[15px]">
            <li className="cursor-pointer text-[14px] text-[#2F3435] font-light  uppercase">FAQS</li>
            <li className="cursor-pointer text-[14px] text-[#2F3435] font-light  uppercase">Testimonials</li>
            <li className="cursor-pointer text-[14px] text-[#2F3435] font-light  uppercase">We work with</li>
            <li className="cursor-pointer text-[14px] text-[#2F3435] font-light  uppercase">Send Inquiry</li>
            <li className="cursor-pointer text-[14px] text-[#2F3435] font-light  uppercase">Book your visit</li>
          </ul>
        </div> */}
        {/* <div className="flex justify-start item-center gap-5 mt-5">
          <Link href="">
            <img className="w-[24px]" src="/asset/navbar/Facebook.png" alt="" />
          </Link>
          <Link href="">
            <img className="w-[24px]" src="/asset/navbar/Instagram.png" alt="" />
          </Link>
          <Link href="">
            <img className="w-[24px]" src="/asset/navbar/Linkedin.png" alt="" />
          </Link>
        </div> */}
        {/* <div className="flex justify-center item-center">
          <img className="w-screen h-[134px]" src="/asset/navbar/havdorblack.png" alt="" />
        </div> */}
      </div>
    </div>
  );
}
