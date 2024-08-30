import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import MainFooter from "../atoms/main-footer";

const Footer = () => {
  return (
    <footer className="overflow-hidden  bg-white  p-8">
      <h1 className="text-2xl text-black font-semibold lg:text-center">
        JAJAN.YUK
      </h1>
      <div className="mt-12 lg:flex justify-center">
        <MainFooter />
      </div>
      <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 pt-8 border-t gap-y-4">
        <p className="text-gray-600 text-xs">English</p>
        <div className=" flex items-center gap-8 lg:justify-center md:justify-center ">
          <FontAwesomeIcon icon={faInstagram} width={24} height={24} />
          <FontAwesomeIcon icon={faTiktok} width={24} height={24} />
          <FontAwesomeIcon icon={faLinkedin} width={24} height={24} />
          <FontAwesomeIcon icon={faWhatsapp} width={24} height={24} />
        </div>
        <div className="sm:hidden md:block hidden">
          <p className=" text-xs text-black lg:text-right">
            &copy; 2024 Jajan.Yuk, Inc. All rights reserved
          </p>
        </div>
      </div>
      <p className=" text-xs text-black text-center mt-6 md:hidden lg:hidden">
        &copy; 2024 Jajan.Yuk, Inc. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
