import { Button } from "@/components/ui/button";
import { benefit } from "@/constant/data-benefit";
import images from "@/constant/data-image";
import Image from "next/image";

const BenefitSection = () => {
  return (
    <section className="md:px-8 px-6 lg:py-12 py-6">
      <div className=" lg:flex-row flex-col flex">
        <div className="lg:w-2/4">
          <Image
            src={images.benefitUi}
            className=" md:block hidden  flex-grow"
            alt="benefitImage"
          />
        </div>
        <div className="lg:w-2/4 p-8 lg:flex-row flex-col flex lg:justify-center items-center bg-[#e5e5e7] flex-grow ">
          <Image
            src={images.benefitUi}
            className=" md:hidden block mb-4   flex-grow"
            alt="benefitImage"
          />
          <div>
            <h1 className="  text-3xl font-semibold max-w-md ">
              Get A Fair Price For Your Car Sell To Us Today
            </h1>
            <p className="text-[12px] text-neutral-900 max-w-md mt-4">
              We are committed to providing our customers with exceptional
              service, competitive pricing, and a wide range of.
            </p>
            <div className="mt-4 space-y-4">
              {benefit.map((benefit) => (
                <div key={benefit.id} className="space-x-2 flex items-center">
                  <Image src={benefit.icon} alt="icon" />
                  <p className=" text-xs font-medium text-black">
                    {benefit.benefit}
                    
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex lg:justify-start justify-end">
                <Button
                    variant="default"
                    className="bg-neutral-900 text-white hover:bg-black transition-all duration-300 ease-in-out"
                >Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
