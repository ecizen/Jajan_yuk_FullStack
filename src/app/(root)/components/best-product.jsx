import React, { useEffect, useState } from "react";
import GetBestProduct from "../../../../actions/get-best-product";

export default function BestProduct() {
  const [bestProduct, setBestProduct] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const loadBestProduct = async () => {
        setLoading(true);
        const fetchedBestProduct = await GetBestProduct();
        setBestProduct(fetchedBestProduct);
        setLoading(false);
        console.log();
    }
    loadBestProduct();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!bestProduct) return <div>No best product found</div>;

  return (
    <div className="min-h-screen">
        {bestProduct.map((unguls) =>(
            <div key={unguls.product?.id}>
                <p className="text-black">{unguls.product?.name}</p>
                <p className="text-black">{unguls.product?.location}</p>
                <p className="text-black">{unguls.product?.description}</p>
            </div>
        ))}
    </div>
  )
}
