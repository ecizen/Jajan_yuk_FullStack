import images from "@/constant/data-image";
import Image from "next/image";
import Slider from "react-slick";

const Banner= () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  

  return (
    <Slider {...settings} className=" w-full">
      <Image  className="h-[400px]" src={images.Banner1}/>
    </Slider>
  );
};

export default Banner