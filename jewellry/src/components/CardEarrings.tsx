import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ShoppingCart, Eye, Heart } from "lucide-react";

// Products interface to match the API response
interface Products {
  _id: string;
  title: string;
  price: number;
  description: string;
  mainimage: string;
}

const CardEarrings = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    axios
      .get<Products[]>("http://localhost:8085/earrings")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="relative group">
            <img
              src={`http://localhost:8085/public/${product.mainimage}`}
              alt={product.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                <Heart size={20} className="text-red-500" />
              </button>
              <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                <ShoppingCart size={20} className="text-gray-700" />
              </button>
              <Link href={`/details/${product._id}`}>
                <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                  <Eye size={20} className="text-gray-700" />
                </button>
              </Link>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
            <p className="text-center text-gray-600 font-medium">{product.price.toFixed(2)}$</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardEarrings;
