import React from "react";
import styles from "../../src/components/Bussines.module.css";
const Bussines = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <h6 className={styles.h6}>best in business</h6>
          <h2 className={styles.h2}>Why choose us</h2>
          <h4 className={styles.h4}>
            Cras malesuada dolor sit amet est egestas ullamcorper. Nullam in
            tortor mi. Maecenas vulputate libero
          </h4>
          
        </div>

        <div className={styles.common}>
          <div className={styles.card1}>
            <img
              src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-04.png"
              alt="card1"
            />
            <h5 className={styles.h5}>Big Discounts</h5>
            <p className={styles.p}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </p>
          </div>
          <div className={styles.card2}>
            <img
              src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-01.png"
              alt="card2"
            />
            <h5 className={styles.h5}>Free Shipping</h5>
            <p  className={styles.p}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </p>
          </div>
          <div className={styles.card3}>
            <img src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-02.png" alt="card3" />
          <h5  className={styles.h5}>Secure Payments
          </h5>
          <p className={styles.p}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </p>
          </div>
          <div className={styles.card4}>
            <img src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-03.png" alt="card4" />
            <h5  className={styles.h5}>Order Tracking
            </h5>
            <p className={styles.p}>
              Integer euismod blandit nunc sit amet sollicitudin. Fusce quis
              orci viverra, cursus justo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bussines;
