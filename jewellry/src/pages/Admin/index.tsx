import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    mainimage: null,
  });
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi state'i ekledik

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8085/rings");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/rings/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      mainimage: null,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    if (formData.mainimage) {
      formDataToSend.append("mainimage", formData.mainimage);
    }

    try {
      if (selectedProduct) {
        await axios.put(
          `http://localhost:8085/rings/${selectedProduct._id}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await axios.post(
          "http://localhost:8085/rings",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      setIsModalOpen(false);
      setIsAddProductModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Failed to save product.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Arama fonksiyonu

  return (
    <div className="p-6 mt-40">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

      <div className="mb-6 flex justify-between">
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="space-y-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border-b-2 border-gray-300 pb-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:8085/public/${product.mainimage}`}
                alt={product.title}
                className="w-24 h-24 object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="bracelets">Bracelets</option>
              </select>
              <input
                type="file"
                name="mainimage"
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="bracelets">Bracelets</option>
              </select>
              <input
                type="file"
                name="mainimage"
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
