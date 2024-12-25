import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from "../../components/Navbar/Header.module.css";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={120} height={50} />
      </div>

      {/* Hamburger Menu Icon */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars size={25} />
      </div>

      {/* Navigation Links for Desktop */}
      <ul className={`${styles.navListTwo} ${styles.desktopNav}`}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/About">About</Link>
        </li>
        <li>
          <select
            className={styles.categorySelect}
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue) {
                window.location.href = selectedValue;
              }
            }}
          >
            <option value="" disabled selected>
              Category
            </option>
            <option value="/NavPage/Rings">RINGS</option>
            <option value="/NavPage/Bracelets">BRACELETS</option>
            <option value="/NavPage/Earrings">EARRINGS</option>
            <option value="/NavPage/Necklaces">NECKLACES</option>
          </select>
        </li>
        <li className={styles.navItem}>
          <Link href="/Contact">Contact</Link>
        </li>
        <li className={styles.navItem}>
          <FaSearch size={20} />
        </li>
        <li className={styles.navItem}>
          <FaShoppingCart size={20} />
        </li>
      </ul>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className={styles.sidebar}>
          {/* Close Button */}
          <div className={styles.sidebarClose} onClick={toggleSidebar}>
            <FaTimes size={25} />
          </div>
          <ul className={styles.navListMobile}>
            <li className={styles.navItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/About">About</Link>
            </li>
            <li>
              <select
                className={styles.categorySelect}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue) {
                    window.location.href = selectedValue;
                  }
                }}
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="/NavPage/Rings">RINGS</option>
                <option value="/NavPage/Bracelets">BRACELETS</option>
                <option value="/NavPage/Earrings">EARRINGS</option>
                <option value="/NavPage/Necklaces">NECKLACES</option>
              </select>
            </li>
            <li className={styles.navItem}>
              <Link href="/Contact">Contact</Link>
            </li>
            <li className={styles.navItem}>
              <FaSearch size={20} />
            </li>
            <li className={styles.navItem}>
              <FaShoppingCart size={20} />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
