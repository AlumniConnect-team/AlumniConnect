import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white h-[80px] w-full flex justify-around items-center px-[5%] box-border shadow-md sticky top-0 z-[1000]">
      {/* Logo */}
      <div className="text-[24px] font-extrabold text-blue-600 flex items-center gap-2 cursor-pointer">
        <span>🎓</span> AlumniConnect
      </div>

      {/* Links */}
      <ul className="list-none flex gap-[100px] m-0 p-0 max-md:hidden">
        <li>
          <a
            href="#"
            className="no-underline text-gray-800 font-semibold text-[16px] transition-colors duration-300 hover:text-blue-600"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline text-gray-800 font-semibold text-[16px] transition-colors duration-300 hover:text-blue-600"
          >
            Search Alumni
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline text-gray-800 font-semibold text-[16px] transition-colors duration-300 hover:text-blue-600"
          >
            Events
          </a>
        </li>
        <li>
          <a
            href="#"
            className="no-underline text-gray-800 font-semibold text-[16px] transition-colors duration-300 hover:text-blue-600"
          >
            Dashboard
          </a>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-[15px] max-md:hidden">
        <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 text-blue-600 bg-transparent transition-all duration-300 hover:bg-blue-50">
          Login
        </button>

        <button className="px-[24px] py-[10px] rounded-md font-semibold text-[14px] border-2 border-blue-600 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:-translate-y-[1px]">
          Join Network
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
