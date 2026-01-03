import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white h-[80px] w-full flex justify-around items-center px-[5%] shadow-md sticky top-0 z-[1000]">
     
      <div className="text-[24px] font-extrabold text-blue-600 flex items-center gap-2 cursor-pointer">
        <span>🎓</span> AlumniConnect
      </div>

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

      <div className="flex gap-[15px] max-md:hidden">
        <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 text-blue-600 bg-transparent transition-all duration-300 hover:bg-blue-50">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                      Login
                    </Link>
        </button>
        <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:-translate-y-[1px]">
          <Link to="/signup">Join Network</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
