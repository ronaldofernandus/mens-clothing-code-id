import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getBannerDetails } from "../../actions/miscActions";
import base_url from "../../helpers/base_url";
import Swal from "sweetalert2";

const BannerDetails = () => {
  const { id } = useParams();
  const url = base_url;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { action, status, data } = useSelector((state) => state.miscReducer);

  useEffect(() => {
    dispatch(getBannerDetails(id));
  }, []);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 min-h-screen py-5 no-scrollbar">
      <div>
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
            <h1 className="pl-5">Banner Details</h1>
          </div>
          <div className="mr-5">
            <button
              className=" text-darkColor hover:text-cyan-600 cursor-pointer"
              onClick={() => navigate(`/cms/editBanner/${data.id}`)}
            >
              <div className="flex items-center">
                <div className="">
                  <TbEdit className="text-2xl 3xl:text-3xl font-bold mr-1" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">EDIT</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
        <hr className="border-cyan-800 mx-5" />
        {action === "GET_BANNER_DETAILS" && status === "data" ? (
          <div>
            <div className="px-5 py-5">
              <label
                className="cursor-pointer custom-file-upload"
                htmlFor="file-upload"
              >
                <img
                  className="mx-auto object-cover w-screen"
                  src={`${url}/images/${data.filename}`}
                  alt="Flower and sky"
                  onClick={() =>
                    Swal.fire({
                      width: 1000,
                      imageUrl: url + "/images/" + data.filename,
                      imageHeight: 500,
                    })
                  }
                />
              </label>
            </div>
            <div className="py-2">
              <div className="px-5 py-2">
                <label className="block text-midColor text-lg font-bold pb-2">
                  Banner Message
                </label>
              </div>
              <div className="px-5 py-2 col-span-2">
                <textarea
                  type="text"
                  rows={5}
                  className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
                  value={data.body}
                  disabled
                ></textarea>
              </div>
              <div className="flex py-2">
                <label className="block text-midColor text-lg font-bold px-4">
                  Banner Status
                </label>
                {data.active === true ? (
                  <label
                    for="default-toggle"
                    class="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={data.active}
                      id="default-toggle"
                      className="sr-only peer"
                      disabled
                      checked
                    />
                    <div className="w-11 h-6 mb-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700"></div>
                  </label>
                ) : (
                  <label
                    for="default-toggle"
                    class="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={data.active}
                      id="default-toggle"
                      className="sr-only peer"
                      disabled
                    />
                    <div className="w-11 h-6 mb-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700"></div>
                  </label>
                )}
              </div>
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default BannerDetails;
