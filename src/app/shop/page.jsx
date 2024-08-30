"use client";

import ProductList from "@/components/molecules/product-list";
import Container from "@/components/ui/container";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

const HomePage = () => {
  const [loading, setLoading] = useState();
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 bg-gray-100 min-h-screen">
      <Container>
        {/* <div className="">
          <ProductList title="Product List" />
        </div> */}
      </Container>
    </div>
  );
};

export default HomePage;
