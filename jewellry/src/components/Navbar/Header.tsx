"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ShoppingCart, Heart, LogIn, UserPlus, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const cartItems = useSelector((state: any) => state.cart.items); // Sepet verisini çekiyoruz

  const router = useRouter();

  // Navbar scroll kontrolü
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Sayfa değişiminde dropdown ve sidebar kapatma
  useEffect(() => {
    const handleRouteChange = () => {
      setIsDropdownOpen(false);
      setIsSidebarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isNavbarVisible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/">
          <Image src={logo} alt="Logo" width={120} height={50} />
        </Link>

        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-gray-700 hover:text-red-700">
              Home
            </Link>
          </li>
          <li>
            <Link href="/About" className="text-gray-700 hover:text-red-700">
              About
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 cursor-pointer hover:text-red-700"
            >
              Categories
            </button>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40"
              >
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/NavPage/Rings">Rings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/NavPage/Bracelets">Bracelets</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/NavPage/Earrings">Earrings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href="/NavPage/Necklaces">Necklaces</Link>
                </li>
              </motion.ul>
            )}
          </li>
          <li>
            <Link href="/Contact" className="text-gray-700 hover:text-red-700">
              Contact
            </Link>
          </li>
          <li>
          
          </li>
        </ul>

        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/favorites">
            <Heart size={22} className="text-gray-700 hover:text-red-500" />
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link href="/login">
            <button className="flex items-center border-gray-700 text-gray-700 rounded-md hover:text-red-700">
              <LogIn size={18} className="mr-2" />
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <Menu size={25} onClick={() => setIsSidebarOpen(true)} />
        </div>
      </div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6"
      >
        <div className="flex justify-end">
          <X size={25} onClick={() => setIsSidebarOpen(false)} />
        </div>
        <ul className="mt-6 space-y-4">
          <li>
            <Link
              href="/"
              className="text-gray-700 hover:text-red-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/About"
              className="text-gray-700 hover:text-red-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={toggleDropdown}
              className="text-gray-700 cursor-pointer hover:text-red-700"
            >
              Categories
            </button>
            {isDropdownOpen && (
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-2">
                <li>
                  <Link href="/NavPage/Rings" onClick={() => setIsSidebarOpen(false)}>
                    Rings
                  </Link>
                </li>
                <li>
                  <Link href="/NavPage/Bracelets" onClick={() => setIsSidebarOpen(false)}>
                    Bracelets
                  </Link>
                </li>
                <li>
                  <Link href="/NavPage/Earrings" onClick={() => setIsSidebarOpen(false)}>
                    Earrings
                  </Link>
                </li>
                <li>
                  <Link href="/NavPage/Necklaces" onClick={() => setIsSidebarOpen(false)}>
                    Necklaces
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/Contact"
              className="text-gray-700 hover:text-red-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="mt-6 flex space-x-4">
          <Link href="/favorites">
            <Heart size={22} className="text-gray-700 hover:text-red-500" />
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Header;
