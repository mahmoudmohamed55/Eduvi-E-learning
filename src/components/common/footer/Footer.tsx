
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { BookOpenText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-neutral-200 bg-[#f8f5ff] rounded-tl-2xl rounded-tr-2xl mt-auto">
      <div className=" py-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center gap-2">
            

            <h2 className="text-3xl font-bold text-ink-900 flex items-center ">
              <span className="text-primary-600 ">Edu</span>vi
              <BookOpenText size={32} className="text-secondary-500 ml-2" />
            </h2>
            <p className="mt-5 max-w-lg leading-8  text-neutral-500">
              Learn today. Build your future with modern online education.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xl">
            <a href="#" className="text-[#1877F2] transition hover:scale-110">
              <FaFacebookF />
            </a>

            <a href="#" className="text-[#E1306C] transition hover:scale-110">
              <FaInstagram />
            </a>

            <a href="#" className="text-[#1DA1F2] transition hover:scale-110">
              <FaTwitter />
            </a>

            <a href="#" className="text-[#0A66C2] transition hover:scale-110">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
