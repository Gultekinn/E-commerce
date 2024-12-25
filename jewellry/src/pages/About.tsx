import React from 'react'
import styles from "../../src/pages/About.module.css"
import AboutFounder from '@/components/AboutFounder'
const About = () => {
  return (
    <>
       <section className={styles.aboutUs}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p className={styles.subtitle}>A few words</p>
          <h1 className={styles.title}>ABOUT US</h1>
        </div>
      </div>
    </section>
    <AboutFounder/>
    </>
  )
}

export default About
