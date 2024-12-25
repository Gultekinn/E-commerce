import React from "react";
import styles from "../../src/pages/Contact.module.css"
import ContactFounder from "@/components/ContactFounder";
const Contact = () => {
  return (
    <>
      <section className={styles.contactUs}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p className={styles.subtitle}>Get in touch</p>
            <h1 className={styles.title}>Contact us</h1>
          </div>
        </div>
      </section>
      <ContactFounder/>
    </>
  );
};

export default Contact;
