import { Link, NavLink } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineShoppingBag,
  HiOutlineXMark,
  HiOutlineAcademicCap,
  HiOutlineSquares2X2,
  HiOutlineHeart,
} from "react-icons/hi2";
import { FiUser } from "react-icons/fi";

import { BookOpenText } from "lucide-react";
import { useState } from "react";
import { NavLi } from "./NavLi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky rounded-2xl  top-2 left-0 right-0 z-999 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpenText
            size={30}
            className="text-secondary-500"
            strokeWidth={2.3}
          />

          <h2 className="text-3xl font-bold text-ink-900">
            <span className="text-primary-600">Edu</span>vi
          </h2>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
    md:hidden
    cursor-pointer
    flex
    items-center
    justify-center
    h-11
    w-11
    rounded-xl
    border
    border-neutral-200
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:border-primary-300
    hover:bg-primary-50
    hover:text-primary-600
    active:scale-95
  "
        >
          {isOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <NavLi name="Courses" />

            <NavLi name="Favorites" />

            <NavLi name="Categories" />
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-7">
          <Link
            to="/cart"
            className="group flex items-center gap-2 text-sm font-medium"
          >
            <div className="relative">
              <HiOutlineShoppingBag
                size={22}
                className="text-secondary-500 transition group-hover:scale-110"
              />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-500 text-[10px] font-bold text-white">
                0
              </span>
            </div>

            <span className="hidden md:block text-ink-900 hover:text-primary-600">Cart</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 text-sm font-medium text-ink-900 transition hover:text-primary-600"
          >
            <span className="hidden md:block">My Account</span>

            <FiUser size={21} className="text-primary-600 hover:scale-110" />
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="
      absolute
      left-4
      right-4
      top-24
      z-50
      overflow-hidden
      rounded-3xl
      border
      border-neutral-200
      bg-white
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      md:hidden
    "
        >
          <ul className="p-3">
            <NavLi
              name="Courses"
              onclick={() => setIsOpen(false)}
              icon={<HiOutlineAcademicCap size={20} />}
            />

            <NavLi
              name="Categories"
              onclick={() => setIsOpen(false)}
              icon={<HiOutlineSquares2X2 size={20} />}
            />

            <NavLi
              name="Favorites"
              onclick={() => setIsOpen(false)}
              icon={<HiOutlineHeart size={20} />}
            />

            <NavLi
              name="Cart"
              onclick={() => setIsOpen(false)}
              icon={<HiOutlineShoppingBag size={20} />}
            />
          </ul>

          <div className="border-t border-neutral-200 p-4">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="
          flex
          items-center
          justify-center
          rounded-xl
          bg-primary-600
          px-5
          py-3
          font-semibold
          text-white
          transition
          hover:bg-primary-700
        "
            >
              My Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
