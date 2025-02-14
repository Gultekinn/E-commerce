import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {  Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { toggleFavorite } from "../../../redux/features/favoritesSlice";

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string[];
  description: string;
  mainimage: string;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.items);
  const cart = useSelector((state: any) => state.cart.items);
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | null>(null);

  const getProductDetails = async () => {
    if (!id) return;
    setLoading(true);

    const possiblePaths = ["rings", "bracelets", "earrings", "necklaces"];
    let found = false;

    for (const path of possiblePaths) {
      try {
        const res = await axios.get<Product>(`http://localhost:8085/${path}/${id}`);
        if (res.data) {
          setData(res.data);
          found = true;
          break;
        }
      } catch (err) {
        console.error(`Error: ${path}/${id} not found.`);
      }
    }

    if (!found) setData(null);
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady && id) {
      getProductDetails();
      const savedQuantity = localStorage.getItem(`quantity_${id}`);
      if (savedQuantity) {
        setQuantity(parseInt(savedQuantity));
      }
    }
  }, [id, router.isReady]);


  const handleAddToCart = () => {
    if (data) {
      dispatch(addToCart({ ...data, quantity }));
    }
  };
  

  return (
    <div className="p-6 max-w-5xl mx-auto mt-20 bg-white rounded-lg shadow-lg">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : data ? (
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`http://localhost:8085/public/${data.mainimage}`}
            alt={data.title}
            className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{data.title}</h1>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <p className="text-2xl font-semibold text-gray-900 mb-4">${(data.price * quantity).toFixed(2)}</p>
            <p className="text-gray-600 mb-4">Category: {data.category.join(", ")}</p>

            <div className="mb-4">
              <p className="font-medium text-gray-700 mb-2">Select Size:</p>
              <div className="flex gap-2">
                {["14", "15", "16", "17"].map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-4 py-2 border rounded-lg transition-all hover:bg-gray-800 hover:text-white ${
                      size === sizeOption ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

          
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all mb-3"
            >
              Add to Basket
            </button>

            <button
              onClick={() => dispatch(toggleFavorite(data))}
              className={`w-full py-3 border-2 font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                favorites.some((fav: Product) => fav._id === data._id)
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              <Heart size={20} /> {favorites.some((fav: Product) => fav._id === data._id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>

          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Product not found!</p>
      )}
    </div>
  );
};

export default Detail;
