import React from "react";
import styles from "../../src/components/TrendSection.module.css";

const TrendSection = () => {
  return (
    <>
      <div className={styles.container}>
        {/* card1 */}
        <div className={styles.divone}>
          <div className={styles.textt}>
            <h6 className={styles.h6}>Unique pieces</h6>
            <h2 className={styles.h2}>Be always on trend</h2>
            <p className={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className={styles.shopnowbtn}>Shop Now</button>
          </div>
        </div>
        {/* card2 */}
        <div className={styles.divtwo}>
            <img className={styles.images} src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/bg-02.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default TrendSection;
