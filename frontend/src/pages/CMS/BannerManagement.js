import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BannerContainer } from "../../components/";
import {
  getBanners,
  getActiveBanners,
  getInactiveBanners,
} from "../../actions/miscActions";

const BannerManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [option, setOption] = useState("");
  const [sorter, setSorter] = useState("");
  const [order, setOrder] = useState("");
  const { action, status, data } = useSelector((state) => state.miscReducer);
  let pageAttribute = `?page=${page}&limit=5`;

  useEffect(() => {
    if (option === "newest") {
      setSorter("createdAt");
      setOrder("asc");
      let sortAttribute = `${pageAttribute}&sorter=${sorter}&order=${order}`;
      dispatch(getBanners(sortAttribute));
    } else if (option === "oldest") {
      setSorter("createdAt");
      setOrder("desc");
      let sortAttribute = `${pageAttribute}&sorter=${sorter}&order=${order}`;
      dispatch(getBanners(sortAttribute));
    } else if (option === "active") {
      dispatch(getActiveBanners());
    } else if (option === "inactive") {
      dispatch(getInactiveBanners());
    } else {
      dispatch(getBanners(pageAttribute));
    }
  }, [page, option]);
  return (
    <div className="px-10 lg:px-16 lg:ml-52 3xl:ml-12">
      <div className="flex items-center justify-between p-4 mb-2">
        <div className="mt-3 shadow-sm">
          <p className="text-2xl font-extrabold text-darkColor">
            Banner Management Page
          </p>
          <div className="w-2/3">
            <p className="text-md font-extralight text-gray-500 pt-3">
              You can set some banners to be displayed in the User Home Page.
              Only active banners will be shown
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="pl-4 pt-2">
          <div className="flex justify-end space-x-10">
            <div className="flex items-center">
              <label className=" text-darkColor text-sm mr-4">Sort: </label>
              <select
                className="border hover:border-cyan-800 focus:border-cyan-900 w-full rounded-md bg-white py-1 px-4 text-darkColor text-sm"
                name="condition"
                id="condition"
                onChange={(e) => setOption(e.target.value)}
              >
                {/* <option value="featured">Featured</option> */}
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="text-4xl flex justify-center items-center ">
              {data.page > 1 ? (
                <button onClick={() => setPage(page - 1)}>
                  <MdKeyboardArrowLeft className="text-gray-400" />
                </button>
              ) : (
                ""
              )}
              <p className="text-sm">{data.page}</p>
              {data.page < data.totalPage ? (
                <button onClick={() => setPage(page + 1)}>
                  <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="">
          {(action === "GET_BANNERS" && status === "data") ||
          (action === "GET_ACTIVE_BANNERS" && status === "data") ||
          (action === "GET_INACTIVE_BANNERS" && status === "data") ? (
            <BannerContainer data={data.data} />
          ) : (
            console.log(action, data)
          )}
        </div>

        <div className="fixed right-28 bottom-9">
          <button
            className="text-darkColor hover:text-cyan-600"
            onClick={() => navigate("/cms/addBanner")}
          >
            <div className="flex">
              <IoMdAddCircle size={50} />
              <h1 className="text-base rounded-md font-bold pt-3 pl-1">
                BANNER
              </h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerManagement;
