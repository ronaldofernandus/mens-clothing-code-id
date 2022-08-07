import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="text-darkColor">
      <div className="grid p-20 md:grid-cols-3 sm:grid-cols-1 bg-gray-200  ">
        <div className=" flex items-center 3xl:mx-auto ">
          <div className="flex grid-cols-4 text-6xl space-x-4">
            <div className="">
              <AiFillInstagram />
            </div>
            <div className="">
              <AiFillFacebook />
            </div>
            <div className="">
              <AiFillTwitterSquare />
            </div>
            <div className="">
              <AiFillYoutube />
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col text-center  ml-12 m-1">
          <h1 className=" text-2xl text-darkColor font-semibold">About</h1>
          <p className="text-sm text-justify text-darkColor mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas
            sequi similique culpa, quia exercitationem eos porro blanditiis
            quidem impedit esse animi tenetur illo eius velit magni? Est placeat
            sequi eaque ratione!
          </p>
        </div>
        <div className="ml-96 space-y-1">
          <h1 className="font-semibold">Quick Links:</h1>
          <p
            className="text-sm cursor-pointer"
            onClick={() => navigate("/user/home")}
          >
            Home
          </p>
          <p
            className="text-sm cursor-pointer"
            onClick={() => navigate("/user/orders")}
          >
            Order
          </p>
          <p
            className="text-sm cursor-pointer"
            onClick={() => navigate("/user/profile")}
          >
            User
          </p>
        </div>
      </div>
      <div className="flex text-center text-white bg-darkColor h-16">
        <div className="m-auto text-xl text-accentColor">
          <p>&copy;Copyright 2022 Men's Clothing</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
