import { chooseUs } from "@/constant/data-why-coose";
import Image from "next/image";

const WyhCoosMeSection = () => {
    return (
        <section className="container h-max lg:px-12 md:px-8 px-6 lg:py-8 py-6 overflow-hidden">
                <div className=" flex flex-col  justify-center">
                    <h1 className="text-2xl font-bold text-neutral-900">Why Choose Us?</h1>
                    <div className="mt-8">
                         <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6"> 
                          {chooseUs.map ((chooseme) => (
                            <div key={chooseme.id} className="flex flex-col items-start p-4 bg-gray-100">
                                <Image src={chooseme.icon} alt={chooseme.title}/>
                                <div className="mt-4">
                                    <h1 className="text-xs  font-semibold text-neutral-800">{chooseme.title}</h1>
                                    <p className="text-xs mt-2 text-neutral-600 font-normal">{chooseme.description}</p>
                                </div>
                            </div>
                          ))}
                         </div>   
                    </div>
                </div>
        </section>
    )
}
export default WyhCoosMeSection;