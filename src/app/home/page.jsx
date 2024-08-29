'use client'
import React, { useEffect, useState } from "react";

import OptionCard from "@/components/explore-card";
import GetProduct from "../../../actions/get-product";

export default function BestProduct() {
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

  if (loading) return <div>Loading...</div>;
  if (!products) return <div>No best product found</div>;

  return (
    <section className='bg-white lg:px-8 px-4 lg:py-8 py-4'>
    <h1 className='lg:text-2xl text-xl text-black font-semibold'>Choose easily here</h1>
    <p className='text-sm mt-2 text-gray-400'>makes it easier for you to search by filtering destinations by category</p>
    <div className='mt-6'>
       <OptionCard data={products}/>
    </div>
 </section>
  )
}
