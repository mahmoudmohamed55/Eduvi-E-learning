import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { BookOpenText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* ================= Logo ================= */}

          <div>
            <div className="flex items-center gap-2">
              <BookOpenText
                className="text-secondary-500"
                size={30}
              />

              <h2 className="text-3xl font-bold text-ink-900">
                <span className="text-primary-600">
                  Edu
                </span>
                vi
              </h2>
            </div>

            <div className="mt-6 flex items-center gap-3">

              <a className="text-[#3B5998] hover:scale-110 transition-all" href="#">
                <FaFacebookF />
              </a>

              <a className="text-[#E1306C]  hover:scale-110 transition-all" href="#">
                <FaInstagram />
              </a>

              <a className="text-[#1DA1F2]  hover:scale-110 transition-all" href="#">
                <FaTwitter />
              </a>

              <a className="text-[#0077B5]  hover:scale-110 transition-all" href="#">
                <FaLinkedinIn />
              </a>

            </div>

            <p className="mt-6 text-sm text-neutral-500">
              ©2026 Eduvi.co
            </p>

            <p className="mt-3 text-sm leading-7 text-neutral-500">
              Eduvi is a registered trademark of Eduvi.co
            </p>

          </div>

          {/* ================= Courses ================= */}

          <div>

            <h3 className="footer-title">
              Courses
            </h3>

            <ul className="footer-list">

              <li><Link to="/">Classroom courses</Link></li>

              <li><Link to="/">Virtual classroom</Link></li>

              <li><Link to="/">E-learning courses</Link></li>

              <li><Link to="/">Video Courses</Link></li>

              <li><Link to="/">Offline Courses</Link></li>

            </ul>

          </div>

          {/* ================= Community ================= */}

          <div>

            <h3 className="footer-title">
              Community
            </h3>

            <ul className="footer-list">

              <li><Link to="/">Learners</Link></li>

              <li><Link to="/">Partners</Link></li>

              <li><Link to="/">Developers</Link></li>

              <li><Link to="/">Transactions</Link></li>

              <li><Link to="/">Blog</Link></li>

              <li><Link to="/">Teaching Center</Link></li>

            </ul>

          </div>

          {/* ================= Quick ================= */}

          <div>

            <h3 className="footer-title">
              Quick Links
            </h3>

            <ul className="footer-list">

              <li><Link to="/">Home</Link></li>

              <li><Link to="/">Professional Education</Link></li>

              <li><Link to="/">Courses</Link></li>

              <li><Link to="/">Admissions</Link></li>

              <li><Link to="/">Testimonial</Link></li>

              <li><Link to="/">Programs</Link></li>

            </ul>

          </div>

          {/* ================= More ================= */}

          <div>

            <h3 className="footer-title">
              More
            </h3>

            <ul className="footer-list">

              <li><Link to="/">Press</Link></li>

              <li><Link to="/">Investors</Link></li>

              <li><Link to="/">Terms</Link></li>

              <li><Link to="/">Privacy</Link></li>

              <li><Link to="/">Help</Link></li>

              <li><Link to="/">Contact</Link></li>

            </ul>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;