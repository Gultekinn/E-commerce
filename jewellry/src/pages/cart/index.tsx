"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash, Plus, Minus } from "lucide-react";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../../redux/features/cartSlice";
import Link from "next/link";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const totalAmount = cart.reduce((total: number, product: any) => total + product.price * product.quantity, 0);

  return (
    <div className="p-6 mt-24 flex flex-col md:flex-row gap-8">
      {/* Sepet Bölümü */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in your cart!</p>
        ) : (
          <div className="space-y-6">
            {cart.map((product: any) => (
              <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
               <Link href={`/details/${product._id}`}>
  <img
    src={`http://localhost:8085/public/${product.mainimage}`}
    alt={product.title}
    className="w-20 h-20 object-cover rounded-md cursor-pointer"
  />
</Link>

                <div className="flex-1 px-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDecreaseQuantity(product._id)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1 border rounded-md">{product.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(product._id)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sipariş Özeti & Ödeme */}
      {cart.length > 0 && (
        <div className="w-full md:w-1/3 p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-700">Total: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
          <div className="mt-4">
            <label className="block text-sm font-medium">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-2 border rounded-md mt-1" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Expiry Date</label>
              <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded-md mt-1" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">CVC</label>
              <input type="text" placeholder="123" className="w-full p-2 border rounded-md mt-1" />
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
