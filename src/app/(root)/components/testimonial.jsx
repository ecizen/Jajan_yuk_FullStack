import Slider from "react-slick";
import "./style.css";
import { testimonial } from "@/constant/data-testimonials";
import Image from "next/image";
import images from "@/constant/data-image";

const TestimonialSection = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
          {
            breakpoint: 768, // max-width for mobile and small screens
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ],
      };

  return (
    <section className=" lg:px-8 md:px-8 px-6 py-8 bg-neutral-900 overflow-hidden">
      <div className=" w-full">
        <div>
          <div>
            <h1 className="text-xl text-neutral-100 font-semibold">
              Testimonials
            </h1>
            <p className="text-xs text-neutral-100 mt-2">
              Our testimonials section showcase and satisfaction of store and
              user
            </p>
          </div>
        </div>
          <div className="mt-4">
            <Slider {...settings} className="w-full">
                {testimonial.map((testi)=>(
                    <div key={testi.id} className=" cursor-pointer flex items-center w-full rounded-lg relative">
                        <div className="w-full bg-white px-8 py-6 rounded-lg     ">
                            <div className=" flex justify-between items-center">
                                <p className="text-sm font-semibold">{testi.role}</p>
                                <Image alt="icon" src={images.kutip} className="w-6"/>
                            </div>
                            <div className="mt-8">
                                <p className="text-xs  leading-relaxed">{testi.description}</p>
                            </div>
                            <div className="mt-6 flex space-x-4 items-center">
                                <Image src={testi.userProfile} alt="profile" className="w-10"/>
                                <div>
                                    <p className="text-xs font-semibold text-neutral-800">{testi.name}</p>
                                    <p className="text-xs text-neutral-700">{testi.organitation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
          </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
