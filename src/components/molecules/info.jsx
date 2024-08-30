'use client'

import images from "@/constant/data-image";
import { Minus, Plus, Rat, Star, Stars, Store, } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Info = ({ title, description, price, namaToko, jumlah }) => {
   
  return (
    <div>
      <div className=" flex items-center gap-2">
        <div className="px-4 py-3 rounded-full bg-neutral-900 max-w-max">
          <Store className=" text-white" width={16} />
        </div>
        <p className=" text-sm text-black font-semibold">{namaToko}</p>
      </div>   
      <h1 className=" lg:text-3xl text-3xl font-semibold text-black mt-6">
        {title}
      </h1>
        <div className=" flex items-center gap-x-2 mt-4">
           <Image src={images.star}  alt="starIcon" className=" w-3"/>
           <Image src={images.star}  alt="starIcon" className=" w-3"/>
           <Image src={images.star}  alt="starIcon" className=" w-3"/>
           <Image src={images.star}  alt="starIcon" className=" w-3"/>
           <Image src={images.star}  alt="starIcon" className=" w-3"/>
        </div>
      <div className="mt-4">
        <p className="lg:text-xs sm:text-sm text-xs text-gray-700">
          {description}
        </p>
      </div>
      <h1 className=" lg:text-2xl text-lg font-semibold text-purple-600 mt-6">
        {price}
      </h1>
    </div>
  );
};

export default Info;
