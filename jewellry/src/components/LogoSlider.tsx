import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import styles from "../../src/components/LogoSlider.module.css";

const LogoSlider = () => {
  const logos = [
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-003.png",
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-002.png",
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-008.png",
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-007.png",
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-005.png",
    "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/logo-004.png",
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <img src={logo} alt={`Logo ${index + 1}`} className={styles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LogoSlider;
