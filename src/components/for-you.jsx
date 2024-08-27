"use client";
import { useEffect, useState } from "react";
import GetProduct from "../../actions/get-product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Currency from "./ui/currency";
import { Expand, Map, MapIcon } from "lucide-react";
import { bouncy } from "ldrs";

const ForYou = ({ title }) => {
  const router = useRouter();
  const handleClick = (productId, storeId) => {
    router.push(`/shop/${productId}`);
    console.log("data berhasil didapatkan", productId);
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await GetProduct();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div>
    <h1 className="text-xl font-semibold mb-4">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.slice(0,4).map((product) => (
            <div
              key={product.id}
              className="bg-white cursor-pointer group  rounded-xl border p-3 space-y-4"
            >
              <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                  onClick={() => handleClick(product.id)}
                  fill
                  alt="image"
                  src={product?.images?.[0]?.url || "/fallback-image.jpg"}
                  className="aspect-square object-cover rounded-md group-hover:brightness-50 group-hover:scale-105 transition-all ease-in-out duration-300" // Corrected the optional chaining
                />
                <div className="inset-x-0 absolute bottom-3 left-[40%] right-[50%] hidden group-hover:block transition-all duration-300 ease-in-out  ">
                  <div className=" bg-white h-8 w-8 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out ">
                    <Expand />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-black truncate">
                  {product.description}
                </p>
                <Currency value={product?.price} />
                <div className=" lg:flex  mt-2  sm:hidden hidden space-x-2 items-center">
                  <MapIcon className="" width={16} />
                  <p className="text-[12px] text-gray-900 ">
                    {product.location}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default ForYou;
