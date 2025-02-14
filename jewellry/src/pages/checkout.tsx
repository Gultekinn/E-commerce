import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Checkout = () => {
  const cart = useSelector((state: any) => state.cart.items);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const router = useRouter();

  const totalAmount = cart.reduce(
    (total: number, product: any) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = async () => {
    const response = await fetch("http://localhost:8085/orders/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart,
        totalAmount: totalAmount,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/thank-you/${data.orderId}`);
    } else {
      alert(data.message || "Error creating order");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <p className="text-gray-700 mt-2">
            Total: <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2 bg-gray-200 p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="w-1/2 bg-gray-200 p-4 rounded-lg shadow-md">
              <label className="block text-sm font-medium">CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default Checkout;
