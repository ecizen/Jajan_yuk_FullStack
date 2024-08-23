"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GetProduct from "../../../../actions/get-product"; // Adjust the import path as needed
import ProductList from "@/components/product-list"; // Adjust the import path as needed
import GetProductSearch from "../../../../actions/get-product-search";
import { Expand, MapIcon } from "lucide-react";
import Currency from "@/components/ui/currency";
import Image from "next/image";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return; // Prevent fetching if searchQuery is empty
  
      setLoading(true);
      try {
        const fetchedProducts = await GetProductSearch({ search: searchQuery });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
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
                className="aspect-square object-cover rounded-md group-hover:brightness-50 transition-all ease-in-out duration-300" // Corrected the optional chaining
              />
               <div className="inset-x-0 absolute bottom-3 left-[40%] right-[50%] hidden group-hover:block transition-all duration-300 ease-in-out  " >
                <div className=" bg-white h-8 w-8 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 hover:scale-105 transition-all duration-300 ease-in-out ">
                  <Expand />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-black truncate">{product.description}</p> 
              <Currency  value={product?.price}/>
              <div className=" lg:flex  mt-2  sm:hidden hidden space-x-2 items-center">
                <MapIcon className="" width={16}/>
                <p className="text-[12px] text-gray-900 ">{product.location}</p>
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
}
