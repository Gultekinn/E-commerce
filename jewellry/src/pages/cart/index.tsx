"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash, Heart, Eye } from "lucide-react";
import { removeFromCart } from "../../../redux/features/cartSlice";
import Link from "next/link";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-4 mt-40">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in your cart!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((product: any) => (
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

                {/* 🗑️ Sepetten kaldırma, favorilere ekleme ve detay butonları */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Sepetten kaldır */}
                  <button
                    onClick={() => handleRemoveFromCart(product._id)}
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                    title="Remove from Cart"
                  >
                    <Trash size={20} className="text-red-500" />
                  </button>

                  {/* Favorilere ekle */}
                  <Link href={`/favorites`}>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100" title="Add to Favorites">
                      <Heart size={20} className="text-red-500" />
                    </button>
                  </Link>

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

export default Cart;
