"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import BarLink from "@/components/ui/bar-breadcump";
import Gallery from "@/components/Gallery";
import Info from "@/components/info";
import Currency from "@/components/ui/currency";
import { bouncy } from "ldrs";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";


bouncy.register();


const ProductPage = () => {

  const {data: session} = useSession(null);
  const [users, setUsers] = useState(null);
  const router = useRouter()


  const params = useParams();

  const [count, setCount] = useState(1);

  const PlusJumlah = () => {
    setCount(count + 1);
  };

  const MinusJumlah = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [params.id]);

  

  if (loading)
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
        </div>
      );
    }
  if (!product) return <div>Product not found</div>;

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </div>
    );
  }


  const handleAddToCart = async () => {
    try {
      const response = await axios.post("/api/carts", {
        productId: product.id,
        userId: session.user.id,
        quantity: count,
        name: product.name,
        image: product.image?.images,
        location: product.store?.name,
        price: product.price,
        description: product.description,
      });
      
      if (response.status === 201) {
        toast.success("Successfully add to cart");
        console.log("Product added to cart successfully!");
      } else {
        toast.error("Error adding product")
        console.error("Error adding product to cart:", response.status);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-0">
    <div>
      <BarLink />
    </div>
    <Container>
      <section className="min-h-screen lg:px-12 sm:px-8 px-6 py-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-8 space-y-6">
          <div className="lg:px-6 px-0">
            <Gallery images={product.images} />
          </div>
          <div>
            <Info
              title={product.name}
              description={product.description}
              namaToko={product.store?.name}
            />
            <Currency
              className="text-neutral-800 font-semibold lg:text-2xl text-sm"
              value={product.price}
            />
            <div className="flex items-center space-y-0 my-6">
              <button
                onClick={PlusJumlah}
                className="px-4 py-2 bg-neutral-800 rounded-l-md"
              >
                <Plus width={12} className="text-white" />
              </button>
              <Input
                value={count}
                readOnly
                className="rounded-none px-2 w-[65px] text-center"
              />
              <button
                onClick={MinusJumlah}
                className="px-4 py-2 bg-neutral-800 rounded-r-md"
              >
                <Minus width={12} className="text-white" />
              </button>
            </div>
            <div className="lg:flex-row flex-col flex gap-2 items-center">
              <Button
                variant="default"
                onClick={handleAddToCart} // Add to cart action here
                className="lg:w-auto md:w-auto sm:w-full w-full bg-white text-black border border-neutral-800 hover:text-white"
              >
                Add to Cart
              </Button>
              <Button
                variant="default"
                className="lg:w-auto md:w-auto sm:w-full w-full bg-neutral-900 text-white"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  </div>

  );
};

export default ProductPage;
