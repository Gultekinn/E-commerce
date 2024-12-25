import React, { useEffect, useState } from "react";
import styles from "../../src/components/CardRing.module.css";
import axios from "axios";

// API'den dönen verilerin doğru şekilde eşleşmesi için Products arayüzünü güncelleyin
interface Products {
  title: string;
  price: number;
  category: string[];
  description: string;
  mainimage: string; // Yerel API'deki anahtar ismini kontrol edin
}

const CardRing = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    axios
      .get<Products[]>("http://localhost:8085/rings")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      {products.map((data, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={`http://localhost:8085/public/${data.mainimage}`} // Görüntüyü doğru çekmek için path'i kontrol edin
              alt="Product"
              className={styles.productImage}
            />
          </div>
          <div className={styles.details}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.description}>{data.description}</p>
            <p className={styles.note}>
              *This item will be custom made upon your order. Please allow up to 3
              weeks for delivery.
            </p>
            <div className={styles.sizeContainer}>
              <span className={styles.label}>Size</span>
              <div className={styles.sizes}>
                <button className={styles.size}>14</button>
                <button className={styles.size}>15</button>
                <button className={`${styles.size} ${styles.active}`}>16</button>
                <button className={styles.size}>16.5</button>
                <button className={styles.size}>17</button>
              </div>
            </div>
            <div className={styles.quantityContainer}>
              <span className={styles.label}>Quantity</span>
              <div className={styles.quantity}>
                <button className={styles.quantityButton}>-</button>
                <span className={styles.quantityValue}>1</span>
                <button className={styles.quantityButton}>+</button>
              </div>
            </div>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{data.price}$</span>
            </div>
            <button className={styles.addToCartButton}>ADD TO CART</button>
            <button className={styles.addToFavoritesButton}>
              Add to favorites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardRing;
