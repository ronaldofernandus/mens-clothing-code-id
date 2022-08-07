import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiClothes, GiBlackFlag } from "react-icons/gi";
import { IoMdPricetags } from "react-icons/io";
import url from "../helpers/base_url";
import { FaUserLock } from "react-icons/fa";

import CMSRoute from "../routers/CMSRoute";
import Swal from "sweetalert2";

function SideBarCMS() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showLoggedProfile, setShowLoggedProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("type") === "user"
    ) {
      navigate("/user/home");
    } else if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("type") !== "cms"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex">
      <aside
        className={`flex transform top-0 left-0 w-96 fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-[3] ${
          showDashboard ? "translate-x-0" : "-translate-x-3/4"
        } `}
      >
        <div className="justify-between border-r-4 border-darkColor pt-6 w-3/4 bg-darkColor">
          <div className="flex flex-col items-center text-6xl">
            <FaUserLock className="  font-semibold text-accentColor" />
            <div className=" text-lg h-2/12 font-semibold mt-2 text-accentColor mb-6">
              Admin
            </div>
          </div>
          <hr />
          <div className="flex justify-center">
            <ul className="">
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-accentColor rounded-md hover:text-white "
                  onClick={() => navigate("/cms/dashboard")}
                >
                  <GiClothes size={25} />
                  <span className="mx-4 font-medium">Products</span>
                </button>
              </li>
              <hr className="w-[280px]" />
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-accentColor rounded-md hover:text-white"
                  onClick={() => navigate("/cms/promos")}
                >
                  <IoMdPricetags size={25} />
                  <span className="mx-4 font-medium">Promos</span>
                </button>
              </li>
              <hr />
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-accentColor rounded-md hover:text-white"
                  onClick={() => navigate("/cms/banner")}
                >
                  <GiBlackFlag size={25} />
                  <span className="mx-4 font-medium">Banner Management</span>
                </button>
              </li>
              <hr />
            </ul>
          </div>
        </div>
        {/* <div className="w-1/4 flex justify-center items-center max-h-screen">
          <div className="h-14 w-14 bg-gradient-to-r from-cyan-600 to-cyan-900 rounded-full flex justify-center items-center">
            <button
              className="h-12 w-12 bg-lightColor text-darkColor text-2xl flex justify-center items-center rounded-full"
              onClick={() => setShowDashboard(!showDashboard)}
            >
              <HiMenu />
            </button>
          </div>
        </div> */}
      </aside>
      <main className="mx-auto w-full">
        <div className="justify-end flex pr-10 pt-7">
          <button onClick={() => setShowLoggedProfile(!showLoggedProfile)}>
            <img
              className="w-16 h-16 object-cover rounded-full"
              src={url + "/images/" + localStorage.getItem("avatar")}
            />
          </button>
          <aside
            className={`bg-white shadow-sm shadow-stone-300 flex transform top-[100px] mr-6 border right-0 w-[100px] fixed p-5 overflow-auto ease-in-out transition-all duration-300 z-[3] ${
              showLoggedProfile ? "  block" : " hidden"
            } `}
          >
            <div>
              <ul>
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    Swal.fire("Logout Success!", "See you later!", "success");
                    navigate("/login");
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="container mx-auto">
          <CMSRoute />
        </div>
      </main>
    </div>
  );
}

export default SideBarCMS;
