"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/features/favoritesSlice";
import { addToCart, removeFromCart } from "../../redux/features/cartSlice";

interface Products {
  _id: string;
  title: string;
  price: number;
  description: string;
  mainimage: string;
}

const CardEarrings = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);
  const cart = useSelector((state: any) => state.cart.items);

  useEffect(() => {
    axios
      .get<Products[]>("http://localhost:8085/earrings")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (priceRange !== "all") {
      filtered = products.filter((product) => {
        if (priceRange === "50-100") return product.price >= 50 && product.price <= 100;
        if (priceRange === "100-200") return product.price > 100 && product.price <= 200;
        if (priceRange === "200+") return product.price > 200;
        return true;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [priceRange, searchQuery, products]);

  const handleFavoriteClick = (product: Products) => {
    const isFavorited = favorites.some((item: Products) => item._id === product._id);
    if (isFavorited) {
      dispatch(removeFavorite(product._id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleCartClick = (product: Products) => {
    const isInCart = cart.some((item: Products) => item._id === product._id);
    if (isInCart) {
      dispatch(removeFromCart(product._id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="bg-white bg-opacity-70 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300 w-full md:w-auto"
        >
          <option value="all">All Prices</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200+">$200+</option>
        </select>

        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white bg-opacity-70 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-300 w-full md:w-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isFavorited = favorites.some((item: Products) => item._id === product._id);
          const isInCart = cart.some((item: Products) => item._id === product._id);

          return (
            <div
              key={product._id}
              className="relative rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative group">
                <img
                  src={`http://localhost:8085/public/${product.mainimage}`}
                  alt={product.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleFavoriteClick(product)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <Heart size={20} className={isFavorited ? "text-red-500" : "text-gray-700"} />
                  </button>
                  <button
                    onClick={() => handleCartClick(product)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title={isInCart ? "Remove from Cart" : "Add to Cart"}
                  >
                    <ShoppingCart size={20} className={isInCart ? "text-green-500" : "text-gray-700"} />
                  </button>
                  <Link href={`/details/${product._id}`}>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100" title="View Details">
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
          );
        })}
      </div>
    </div>
  );
};

export default CardEarrings;