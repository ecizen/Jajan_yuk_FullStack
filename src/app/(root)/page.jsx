"use client";

import Container from "@/components/ui/container";
import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeroSection from "../../components/template/hero";
import ProductForYou from "../../components/template/for-you";
import BenefitSection from "../../components/template/we-benefit";
import WyhCoosMeSection from "../../components/template/why-coose-me";
import BestProduct from "../../components/template/best-product";
import TestimonialSection from "../../components/template/testimonial";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    console.log("Ter autentikasi", session);
  }
  return (
    <div className="">
      <HeroSection />
      <ProductForYou />
      <BenefitSection />
      <WyhCoosMeSection />
      <BestProduct />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
