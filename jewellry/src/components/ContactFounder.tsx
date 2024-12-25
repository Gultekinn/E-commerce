'use client'
import React from 'react'
import ContactUs from './ContactUs'
import styles from "../../src/components/ContactFounder.module.css"

const ContactFounder = () => {
  return (
    <>
      <div className={styles.common}>
<div className={styles.sectionOne}>
<h2 className={styles.h2}>Message Us
</h2>
<p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo tempor, congue justo at, lobortis orci.</p>
<ul className={styles.contactList}>
  <li>📍 123 Fifth Avenue, New York, NY 10160</li>
  <li>✉️ contact@info.com</li>
  <li>📞 9-334-7565-9787</li>
</ul>


</div>

<div className={styles.sectionTwo}>
<ContactUs/>
</div>


      </div>
    </>
  )
}

export default ContactFounder
