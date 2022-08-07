import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="container lg:mt-1 p-10">
      <div className="grid lg:grid-cols-5 gap-2 3xl:gap-28">
        <div className="lg:w-[150px] xl:w-[200px] 3xl:w-[250px]">
          <img
            src="../assets/images/tops.webp"
            alt="category"
            className="w-full h-auto cursor-pointer object-cover"
            onClick={() => {
              navigate(`/user/home/tops`);
            }}
          />
        </div>
        <div className="lg:w-[150px] xl:w-[200px] 3xl:w-[250px]">
          <img
            src="../assets/images/pants.webp"
            alt="category"
            className="w-full h-auto cursor-pointer object-cover"
            onClick={() => {
              navigate(`/user/home/bottoms`);
            }}
          />
        </div>
        <div className="lg:w-[150px] xl:w-[200px] 3xl:w-[250px]">
          <img
            src="../assets/images/hats.webp"
            alt="category"
            className="w-full h-auto cursor-pointer object-cover"
            onClick={() => {
              navigate(`/user/home/hats`);
            }}
          />
        </div>
        <div className="lg:w-[150px] xl:w-[200px] 3xl:w-[250px]">
          <div className="relative">
            <img
              src="../assets/images/6.webp"
              alt="category"
              className="w-full lg:h-[150px] xl:h-[200px] 3xl:h-[250px] cursor-pointer object-cover"
              onClick={() => {
                navigate(`/user/home/accessories`);
              }}
            />
            <p className="absolute top-0 left-0 text-cyan-900 font-medium 3xl:text-xl xl:text-lg lg:text-sm md:text-5xl text-3xl 3xl:p-2 xl:p-2 lg:p-1 md:p-6 p-4">
              Accessories <BsArrowRight className="text-base font-medium" />
            </p>
          </div>
        </div>
        <div className="lg:w-[150px] xl:w-[200px] 3xl:w-[250px]">
          <div className="relative">
            <img
              src="../assets/images/groom.webp"
              alt="category"
              className="w-full lg:h-[150px] xl:h-[200px] 3xl:h-[250px] cursor-pointer object-cover"
              onClick={() => {
                navigate(`/user/home/grooming`);
              }}
            />
            <p className="absolute top-0 left-0 text-cyan-900 font-medium 3xl:text-xl xl:text-lg lg:text-sm md:text-5xl text-3xl 3xl:p-2 xl:p-2 lg:p-1 md:p-6 p-4">
              Grooming <BsArrowRight className="text-base font-medium" />
            </p>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default Category;
