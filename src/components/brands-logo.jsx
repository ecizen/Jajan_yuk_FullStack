
import images from "@/constant/data-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const BrandsLogo = () => {
  return (
    <div className="w-full bg-neutral-800">
          <Marquee>
         <div className="flex items-center lg:p-6 md:p-4 p-0 gap-12">
            <Image src={images.MackLogo} width={250} alt="brand"/>
            <Image src={images.NvidiaLogo} width={250} alt="brand"/>
            <Image src={images.AssusLogo} width={180} alt="brand"/>
            <Image src={images.Logitech} width={200} alt="brand"/>
            <Image src={images.Samssung} width={200} alt="brand"/>
            <Image src={images.MackLogo} width={250} alt="brand"/>
            <Image src={images.NvidiaLogo} width={250} alt="brand"/>
            <Image src={images.AssusLogo} width={180} alt="brand"/>
            <Image src={images.Logitech} width={200} alt="brand"/>
            <Image src={images.Samssung} width={200} alt="brand"/>
         </div>
          </Marquee>
    </div>
  );
};

export default BrandsLogo;
