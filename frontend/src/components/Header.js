import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoMdLogOut } from "react-icons/io";

import Swal from "sweetalert2";

const Header = () => {
  return (
    // bg-gradient-to-r from-cyan-600 to-cyan-900
    <div className="bg-darkColor">
      <div className="container flex py-3 mx-auto border-0">
        <div className="w-4/12 3xl:w-3/12 lg:h-20 3xl:ml-3 flex justify-center items-center">
          <Link
            to="/user/home"
            className="text-2xl text-white font-semibold flex items-center"
          >
            {/* <GiLoincloth className="text-xl mr-2 "/> */}
            <span className="text-lg ml-6 lg:ml-0 lg:text-3xl name-com font-semibold bg-clip-text text-accentColor">
              MEN'S CLOTHING
            </span>
          </Link>
        </div>

        <div className="w-4/12 flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium text-accentColor">
            <Link
              to="/user/"
              className="inline-block rounded hover:text-white text-base"
              aria-current="page"
            >
              Home
            </Link>

            <Link
              to="/user/orders"
              className="inline-block border-b  hover:text-white md:border-0 text-base"
            >
              Orders
            </Link>

            <Link
              to="/user/profile"
              className="inline-block border-b  hover:text-white md:border-0 text-base"
            >
              User
            </Link>
          </div>
        </div>

        <div className="w-4/12 flex justify-center items-center">
          <div className=" flex flex-col justify-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-accentColor lg:mr-4 3xl:-mr-[137px] ">
            <Link
              to="/login"
              className="text-3xl hover:text-white md:inline sm:block py-2"
              onClick={() => {
                Swal.fire("Logout Success!", "See you later!", "success");
                localStorage.clear();
              }}
            >
              <IoMdLogOut />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
