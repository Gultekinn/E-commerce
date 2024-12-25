import { Inter } from "next/font/google";
import styles from "../pages/Home.module.css";
import PopularProduct from "@/components/PopularProduct";
import LogoSlider from "@/components/LogoSlider";
import TrendSection from "../components/TrendSection";
import Bussines from "@/components/Bussines";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>    <div className={styles.background}>
      <div className={styles.content}>
        <h1 className={styles.title}>New Collection</h1>
        <p className={styles.description}>The new ring sensation</p>
        <p className={styles.details}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <button className={styles.shopnowbtn}>Shop Now</button>
      </div>
    </div>
    <LogoSlider/>
    <PopularProduct/>
  <TrendSection/>
  <Bussines/>
 
    </>

  );
}
