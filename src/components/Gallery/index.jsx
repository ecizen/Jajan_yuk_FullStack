"use client";



import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "./galery-tab";
import Image from "next/image";


const Gallery = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse justify-between">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full ">
  {images.map((image) => (
    <TabPanel key={image.id}>
      <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden ">
        <Image
          src={image.url}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw" // responsive image sizes
          alt="Image"
          className="object-cover object-center"
        />
      </div>
    </TabPanel>
  ))}
</TabPanels>
    </TabGroup>
  );
};

export default Gallery;