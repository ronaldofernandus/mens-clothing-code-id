import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { GiLoincloth } from "react-icons/gi";
import { RiTShirtAirFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

import { ProductCardContainerCMS } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const CMSSearchedDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12">
      <div className="flex items-center justify-between p-4 mb-2">
        <div className="mt-3 shadow-sm">
          <a href="" className="flex items-center">
            <GiLoincloth className="text-3xl text-darkColor mr-2 " />
            <span className="lg:text-3xl name-com font-extrabold text-transparent text-8xl bg-clip-text bg-darkColor ">
              MEN'S CLOTHING
            </span>
          </a>
        </div>
        <div className="flex">
          <input
            className="rounded mt-6 p-2 w-full search outline-1 outline-lightColor"
            placeholder="Search"
          ></input>
          <button
            className="ml-1 mt-6 p-3 rounded bg-white text-lightColor hover:bg-darkColor hover:text-white"
            onClick={() => navigate("/cms/dashboard")}
          >
            <ImCross />
          </button>
        </div>
      </div>

      <div className="solid"></div>

      <div className="p-3 flex justify-end">
        <div className="flex flex-col space-x-2 p-3  rounded w-fit ">
          <div className="space-x-5">
            <button
              className="text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/`);
              }}
            >
              All
            </button>
            <button
              className={
                query === "tops"
                  ? "text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold"
                  : "text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              }
              onClick={() => {
                navigate(`/cms/dashboard/tops`);
              }}
            >
              Tops
            </button>

            <button
              className={
                query === "bottoms"
                  ? "text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold"
                  : "text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              }
              onClick={() => {
                navigate(`/cms/dashboard/bottoms`);
              }}
            >
              Bottoms
            </button>

            <button
              className={
                query === "accessories"
                  ? "text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold"
                  : "text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              }
              onClick={() => {
                navigate(`/cms/dashboard/accessories`);
              }}
            >
              Accesories
            </button>

            <button
              className={
                query === "grooming"
                  ? "text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold"
                  : "text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              }
              onClick={() => {
                navigate(`/cms/dashboard/grooming`);
              }}
            >
              Grooming
            </button>
          </div>
        </div>
      </div>
      <div className="solid"></div>

      <div className=" m-2 mt-6">
        <h1 className="text-xl text-darkColor uppercase"> Products List</h1>
        <p className="text-thin text-gray-400 mt-2">
          You can select and customize one of <br></br> your product
        </p>
      </div>

      {/* card */}
      <div className="overflow-scroll max-h-screen no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
        status === "data" &&
        (query === "tops" ||
          query === "bottoms" ||
          query === "accessories" ||
          query === "grooming") ? (
          <ProductCardContainerCMS
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <ProductCardContainerCMS
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
      {/* end of card */}
      <div className="fixed right-20 bottom-8">
        <button onClick={() => navigate("/cms/add")}>
          <IoMdAddCircle size={50} className="text-darkColor " />
        </button>
      </div>
      <div className="fixed right-16 z-10 bottom-14">
        <button onClick={() => navigate("/cms/add")}>
          <RiTShirtAirFill size={40} className="text-darkColor mr-1 mb-1.5" />
        </button>
      </div>
    </div>
  );
};

export default CMSSearchedDashboard;
