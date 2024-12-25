import React from "react";
import styles from '../../components/Navbar/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>BLINGG</h2>
          <p>JEWELRY STORE</p>
        </div>
        <div className={styles.column}>
          <h3>About us</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Shop</h3>
          <ul>
            <li>Rings</li>
            <li>Bracelets</li>
            <li>Earrings</li>
            <li>Necklaces</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Address</h3>
          <p>123 Fifth Avenue, New York, NY 10160</p>
          <p>contact@info.com</p>
          <p>929-242-6868</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright © 2024 Blingg Jewelry | Powered by Blingg Jewelry</p>
      </div>
    </footer>
  );
};

export default Footer;
