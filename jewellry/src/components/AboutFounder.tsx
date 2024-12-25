import React from 'react'
import styles from '../../src/components/AboutFounder.module.css';

const AboutFounder = () => {
  return (
    <section className={styles.aboutFounder}>
      <div className={styles.textSection}>
        <p className={styles.subtitle}>Mattis velit eget</p>
        <h1 className={styles.title}>ABOUT THE FOUNDER</h1>
        <p className={styles.highlight}>
          Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit.
        </p>
        <div className={styles.divider}></div>
        <p className={styles.description}>
          Sed ut fringilla dolor. Morbi suscipit a nunc eu finibus. Nam rutrum mattis velit eget
          volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor velit.
          Vestibulum finibus felis non massa commodo molestie at id justo. Quisque sollicitudin elit
          sit amet facilisis euismod. Fusce at arcu sed.
        </p>
        <p className={styles.description}>
          Nam rutrum mattis velit eget volutpat. Fusce egestas mi urna, id pulvinar ipsum dictum eget.
        </p>
      </div>
      <div className={styles.imageSection}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCdUBULTDmpju4ek4_mFvKyoBjSh66NsmHQ3McJ5oxySYS3KVw_64PJEyZGcxlnd1xrU&usqp=CAU"
          alt="Founder"
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default AboutFounder;
