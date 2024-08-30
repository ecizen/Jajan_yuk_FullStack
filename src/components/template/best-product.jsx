import React, { useEffect, useRef, useState } from "react";
import GetBestProduct from "../../../actions/get-best-product";
import OptionCard from "@/components/molecules/explore-card";
import GetProduct from "../../../actions/get-product";
import GetCategory from "../../../actions/get-category";
import { useRouter } from "next/navigation";

export default function BestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const sliderRef = useRef(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleClick = (productId, storeId) => {
    router.push(`/shop/${productId}`);
    console.log("data berhasil didapatkan", productId);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await GetProduct();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await GetCategory();
      setCategories(fetchedProducts);
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!products) return <div>No best product found</div>;

  return (
    <section className="bg-white lg:px-8 px-4 lg:py-8 py-4">
      <h1 className="text-lg font-semibold text-black">Featured Listings</h1>
      <div className="mt-6">
        <OptionCard
          data={products}
          filter={categories}
          goDetail={handleClick}
        />
      </div>
    </section>
  );
}
