import ForYou from "@/components/molecules/for-you";
import React from "react";

export default function ProductForYou() {
  return (
    <div className="overflow-hidden max-w-7xl">
      <section className=" max-h-screen bg-white lg:px-12 md:px-8 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Best Product You
          </h1>
        </div>
        <div className="mt-6">
          <ForYou />
        </div>
      </section>
    </div>
  );
}
