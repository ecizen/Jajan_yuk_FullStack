"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Currency from "../../../../components/ui/currency"; 

const ProductByCategoryPage = () => {
  const router = useRouter();
 const params = useParams()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchProductBycategory = async () => {
        try {
          const response = await fetch(`/api/products?category=${params.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductBycategory();
    }
  }, [params.id]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white cursor-pointer group rounded-xl border p-3 space-y-4"
          >
            <div className="aspect-square rounded-xl bg-gray-100 relative">
              <Image
                onClick={() => router.push(`/product/${product.id}`)}
                fill
                alt="image"
                src={product?.images?.[0]?.url || "/fallback-image.jpg"}
                className="aspect-square object-cover rounded-md group-hover:brightness-50 transition-all ease-in-out duration-300"
              />
            </div>
            <div>
              <p className="text-xs text-black truncate">{product.description}</p> 
              <Currency value={product?.price} />
              <div className="lg:flex mt-2 sm:hidden hidden space-x-2 items-center">
                <p className="text-[12px] text-gray-900 ">{product.location}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No products available for this category.</div>
      )}
    </div>
  );
};

export default ProductByCategoryPage;
