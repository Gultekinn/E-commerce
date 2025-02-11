import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Minus, Plus } from "lucide-react"; 

interface Detailss {
  title: string;
  price: number;
  category: string[];
  description: string;
  mainimage: string;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Detailss | null>(null);
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
        console.log(`Fetching: http://localhost:8085/${path}/${id}`);
        const res = await axios.get<Detailss>(`http://localhost:8085/${path}/${id}`);

        if (res.data) {
          setData(res.data);
          found = true; 
          break; 
        }
      } catch (err) {
        console.error(`Hata: ${path}/${id} bulunamadı.`);
      }
    }

    if (!found) {
      console.error("Ürün hiçbir kategoride bulunamadı!");
      setData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady && id) getProductDetails();
  }, [id, router.isReady]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data ? (
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`http://localhost:8085/public/${data.mainimage}`}
            alt={data.title}
            className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <p className="text-xl font-semibold text-gray-900 mb-4">Price: ${data.price}</p>
            <p className="text-gray-600 mb-4">Kateqoriya: {data.category.join(", ")}</p>

            {/* Ölçü Seçimi */}
            <div className="mb-4">
              <p className="font-medium text-gray-700 mb-2">Size:</p>
              <div className="flex gap-2">
                {["14", "15", "16", "17"].map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-4 py-2 border rounded-lg ${
                      size === sizeOption
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Adet Kontrolü */}
            <div className="mb-6 flex items-center gap-4">
              <p className="font-medium text-gray-700"> Count:</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium text-gray-900">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Sepete Ekle */}
            <button className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all">
              Add to basket
            </button> <br /><br />

            <button className="w-full py-3 bg-white-800 text-black-700 border-2 font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-all">
              Add to favorite
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Ürün bulunamadı!</p>
      )}
    </div>
  );
};

export default Detail;
