import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white h-[80px] w-full flex justify-around items-center px-[5%] shadow-md sticky top-0 z-[1000]">
      {/* Logo */}
      <div className="text-[24px] font-extrabold text-blue-600 flex items-center gap-2 cursor-pointer">
        <span>🎓</span> AlumniConnect
      </div>

      {/* Links */}
      <ul className="list-none flex gap-[100px] m-0 p-0 max-md:hidden">
        <li>
          <Link
            to="/"
            className="no-underline text-gray-800 font-semibold text-[16px] hover:text-blue-600"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="no-underline text-gray-800 font-semibold text-[16px] hover:text-blue-600"
          >
            Search Alumni
          </Link>
        </li>
        <li>
          <Link
            to="/events"
            className="no-underline text-gray-800 font-semibold text-[16px] hover:text-blue-600"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="no-underline text-gray-800 font-semibold text-[16px] hover:text-blue-600"
          >
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-[15px] max-md:hidden">
        <Link to="/login">
          <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] bg-blue-600 text-white hover:bg-blue-700">
            Join Network
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
