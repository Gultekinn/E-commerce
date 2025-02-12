"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { removeFavorite } from "../../../redux/features/favoritesSlice";
import { addToCart } from "../../../redux/features/cartSlice";
import Link from "next/link";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);

  const handleRemoveFavorite = (productId: string) => {
    dispatch(removeFavorite(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="p-4 mt-40">
      <h1 className="text-2xl font-semibold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite items yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((product: any) => (
            <div key={product._id} className="relative rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative group">
                {/* ✅ Fotoğrafa tıklayınca detay sayfasına yönlendir */}
                <Link href={`/details/${product._id}`}>
                  <img
                    src={`http://localhost:8085/public/${product.mainimage}`}
                    alt={product.title}
                    className="w-full h-72 object-cover cursor-pointer"
                  />
                </Link>

                {/* 🛒 Sepete, favoriden kaldırma ve detay butonları */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Favorilerden kaldır */}
                  <button
                    onClick={() => handleRemoveFavorite(product._id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title="Remove from Favorites"
                  >
                    <Heart size={20} className="text-red-500" />
                  </button>

                  {/* Sepete ekle */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} className="text-gray-700" />
                  </button>

                  {/* Detay sayfasına git */}
                  <Link href={`/details/${product._id}`}>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100" title="View Details">
                      <Eye size={20} className="text-gray-700" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
