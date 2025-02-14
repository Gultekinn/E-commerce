import { useRouter } from "next/router";
import React from "react";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const order = {
    id: orderId || "ORDER2341",
    createdAt: "18 Jul at 07:21",
    updatedAt: "19 Jul at 15:36",
    status: "Sent",
    customer: {
      name: "Tom Ellis",
      username: "@officialtomellis",
      profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7m4aSijfDn5ihwjmcVapDhcvIW2ZCs9uMgLkCXKvaJNV2tOJPzl8Pp-9y6cLj2grzqk&usqp=CAU", // Placeholder image
    },
    products: [
      { sku: "hearts", model: "iphone6", customization: { name: "Tom", color: "black" } },
      { sku: "flowers-pb", model: "", customization: { name: "Mr. Morningstar" } },
      { sku: "morning-stars-customized-cable", model: "", customization: { name: "Tom" } },
    ],
  };

  return (
    <div className="p-6 mt-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
        <div className={`bg-orange-400 h-2 rounded-full ${order.status === "Sent" ? "w-1/2" : "w-full"}`}></div>
      </div>
      <div className="flex justify-between items-center bg-white p-6 shadow-md rounded-lg">
        <div>
          <p className="text-gray-600">ORDER REFERENCE</p>
          <p className="text-xl font-bold">{order.id}</p>
          <p className="text-blue-500 cursor-pointer">See this Order</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">LAST UPDATED</p>
          <p className="text-xl font-bold">{order.updatedAt}</p>
        </div>
      </div>

      <div className="flex items-center mt-6 bg-white p-6 shadow-md rounded-lg">
        <img src={order.customer.profileImage} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="text-gray-600">INFLUENCER</p>
          <p className="text-xl font-bold">{order.customer.name}</p>
          <p className="text-blue-500 cursor-pointer">{order.customer.username}</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">SKU</th>
              <th className="py-2">MODEL</th>
              <th className="py-2">CUSTOMIZATION</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{product.sku}</td>
                <td className="py-2">{product.model || "-"}</td>
                <td className="py-2">
                  {product.customization.name && <p>name: {product.customization.name}</p>}
                  {product.customization.color && <p>color: <span className="inline-block w-4 h-4 bg-black rounded-full"></span></p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
