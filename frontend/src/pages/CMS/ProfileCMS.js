import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userActions";
import url from "../../helpers/base_url";
import { RiEdit2Line } from "react-icons/ri";

const ProfileCMS = () => {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return status === "data" && action === "GET_USER" ? (
    <div>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 px-10 lg:px-32 lg:ml-52 3xl:ml-12">
        <div className="md:col-span-6 sm:col-span-12 sm:min-h-screen mx-auto">
          <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
            <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-darkColor flex items-center">
              <MdOutlineArrowBackIos className="mr-1" /> Back
            </h1>
          </div>
          <div className="max-w-xl">
            <div
              className=" relative"
              onClick={() => navigate(`/cms/editProfile`)}
            >
              <h1 className="text-base rounded-md  text-darkColor font-bold top-2 right-0 absolute hover:text-cyan-600 hover:scale-125 cursor-pointer">
                EDIT
              </h1>
            </div>
            <img
              className="w-full rounded-full shadow-lg"
              src={url + "/images/" + data.avatar}
              alt=""
            />
            <div className="mt-3">
              <div className="text-2xl text-center mt-1 uppercase font-semibold text-darkColor">
                {data.username}
              </div>
            </div>
          </div>
        </div>
        <div className="border-r w-5  m-5" />
        <div className="mt-20 3xl:mt-24 ">
          <div className="absolute top-2">
            <h1 className="text-2xl font-bold pt-10 pb-1 text-darkColor underline">
              Profile Details
            </h1>
          </div>

          <h1 className="text-xl font-semibold pt-10 pb-1 text-darkColor">
            User Type
          </h1>
          <p className="text-justify mb-3 text-darkColor">
            {data.type === "cms" && "Admin"}
          </p>
          <hr />
          <h1 className="pt-3 text-lg font-semibold text-darkColor">Email</h1>
          <p className="mb-3 text-darkColor">{data.email}</p>
          <hr />
          <h1 className="pt-3 text-lg font-semibold text-darkColor">
            Birthday
          </h1>
          <p className="mb-3 text-darkColor">
            <span className="">{String(data.birthday).slice(0, 10)}</span>
          </p>
          <hr />
          <h1 className="pt-3 text-lg font-semibold text-darkColor">Gender</h1>
          <p className="mb-3 text-darkColor">{data.gender || "Male"}</p>
          <hr />
          <h1 className="pt-3 text-lg font-semibold text-darkColor">Joined</h1>
          <p>{String(data.createdAt).slice(0, 10)}</p>
        </div>
      </div>
    </div>
  ) : status === "loading" ? (
    "loading"
  ) : status === "error" ? (
    data
  ) : (
    String(data)
  );
};

export default ProfileCMS;
