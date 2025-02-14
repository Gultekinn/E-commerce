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
    <div className="p-6 mt-32 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600">
          <p className="text-lg">No favorite items yet!</p>
          <Link href="/" className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product: any) => (
            <div key={product._id} className="relative rounded-xl bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative group">
                {/* ✅ Fotoğrafa tıklayınca detay sayfasına yönlendir */}
                <Link href={`/details/${product._id}`}>
                  <img
                    src={`http://localhost:8085/public/${product.mainimage}`}
                    alt={product.title}
                    className="w-full h-80 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* 🛒 Butonlar */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Favorilerden kaldır */}
                  <button
                    onClick={() => handleRemoveFavorite(product._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition"
                    title="Remove from Favorites"
                  >
                    <Heart size={22} className="text-red-500" />
                  </button>

                  {/* Sepete ekle */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={22} className="text-gray-700" />
                  </button>

                  {/* Detay sayfasına git */}
                  <Link href={`/details/${product._id}`}>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition" title="View Details">
                      <Eye size={22} className="text-gray-700" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-gray-600 font-medium">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
