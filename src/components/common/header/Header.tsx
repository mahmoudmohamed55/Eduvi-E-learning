import { Link } from "react-router-dom";

import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineAcademicCap,
  HiOutlineSquares2X2,
  HiOutlineHeart,
  HiOutlineBookOpen,
} from "react-icons/hi2";

import { FiLogOut, FiUser } from "react-icons/fi";
import { BookOpenText } from "lucide-react";

import { NavLi } from "./NavLi";
import useHeader from "@hooks/useHeader";

const Header = () => {
  const { isOpen, setIsOpen, handleLogout, data, loading } = useHeader();

  return (
    <header className="sticky left-0 right-0 top-2 z-999 rounded-2xl border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex h-11 w-11 cursor-pointer items-center justify-center
            rounded-xl border border-neutral-200 bg-white shadow-sm
            transition-all duration-300
            hover:border-primary-300 hover:bg-primary-50
            hover:text-primary-600 active:scale-95
            md:hidden
          "
        >
          {isOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-0 sm:gap-4 md:gap-3 lg:gap-8">
            <NavLi name="Courses" />
            <NavLi name="Favorites" />
            <NavLi name="Categories" />
            <NavLi name="Enrollments" />
          </ul>
        </nav>

        {/* User Actions */}
        <div className="hidden items-center gap-7 md:flex">
          {loading ? (
            // Initial loading only
            <div className="flex items-center gap-5">
              <div className="h-5 w-20 animate-pulse rounded-md bg-neutral-200" />
              <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-200" />
            </div>
          ) : data?.user ? (
            <>
              {/* My Account */}
              <Link
                to="/profile"
                className="group flex items-center gap-2 text-sm font-medium text-ink-900 transition hover:text-primary-600"
              >
                <span>Profile</span>

                <FiUser
                  size={21}
                  className="text-primary-600 transition group-hover:scale-110"
                />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-900 transition hover:text-red-500"
              >
                <span>Logout</span>

                <FiLogOut
                  size={21}
                  className="text-red-500 transition group-hover:scale-110"
                />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="group flex items-center gap-2 text-sm font-medium text-ink-900 transition hover:text-primary-600"
            >
              <span>Login</span>

              <FiUser
                size={21}
                className="text-primary-600 transition group-hover:scale-110"
              />
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute left-4 right-4 top-24 z-50 overflow-hidden
            rounded-3xl border border-neutral-200 bg-white
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
              name="Enrollments"
              onclick={() => setIsOpen(false)}
              icon={<HiOutlineBookOpen size={20} />}
            />
          </ul>

          <div className="border-t border-neutral-200 p-4">
            {loading ? (
              <div className="h-11 w-full animate-pulse rounded-xl bg-neutral-200" />
            ) : data?.user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="
                  flex items-center justify-center rounded-xl
                  bg-primary-600 px-5 py-3 font-semibold text-white
                  transition hover:bg-primary-700
                "
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="
                  mt-3 flex items-center justify-center rounded-xl
                  bg-red-500 px-5 py-3 font-semibold text-white
                  transition hover:bg-red-600
                "
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="
                  flex items-center justify-center rounded-xl
                  bg-primary-600 px-5 py-3 font-semibold text-white
                  transition hover:bg-primary-700
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
