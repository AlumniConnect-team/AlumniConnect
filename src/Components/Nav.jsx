import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white h-[80px] w-full flex items-center px-[5%] shadow-md sticky top-0 z-[1000]">
      <div className="flex-1 flex justify-start">
        <Link
          to="/"
          className="text-[24px] font-extrabold text-blue-600 flex items-center gap-2 cursor-pointer no-underline"
        >
          <span>🎓</span> AlumniConnect
        </Link>
      </div>

      <ul className="list-none flex flex-[2] justify-center gap-8 m-0 p-0 max-lg:hidden">
        <li>
          <Link
            to="/"
            className="no-underline text-gray-800 font-semibold text-[15px] hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="no-underline text-gray-800 font-semibold text-[15px] hover:text-blue-600 transition-colors"
          >
            Search Alumni
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            className="no-underline text-gray-800 font-semibold text-[15px] hover:text-blue-600 transition-colors"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="no-underline text-gray-800 font-semibold text-[15px] hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Jobs & Referrals
          </Link>
        </li>
      </ul>

      <div className="flex-1 flex justify-end gap-[15px] max-md:hidden items-center">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="inline-block px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 text-blue-600 bg-transparent transition-all duration-300 hover:bg-blue-50 cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:-translate-y-[1px] no-underline"
            >
              Join Network
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-800 font-bold text-[15px] hover:text-blue-600 transition-colors mr-2"
            >
              My Account
            </Link>
            <button
              onClick={handleLogout}
              className="px-[20px] py-[8px] rounded-md font-semibold text-[14px] border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;