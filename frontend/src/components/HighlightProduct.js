import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsSortPrice,
  getProductsPopular,
} from "../actions/cmsActions";

import base_url from "../helpers/base_url";
import intToRupiah from "../helpers/rupiah";
import {
  oneStar,
  twoStars,
  threeStars,
  fourStars,
  fiveStars,
} from "../helpers/stars";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Pagination, Navigation]);

const HighlightProduct = () => {
  const url = base_url;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [prodPopular, setProdPopular] = useState([]);

  const {
    actionSort,
    statusSort,
    dataSort,
    actionPopular,
    statusPopular,
    dataPopular,
  } = useSelector((state) => state.cmsReducer);

  useEffect(() => {
    if (actionSort === "GET_PRODUCTS_SORT_PRICE" && statusSort === "data") {
      setProduct(dataSort);
    }
  }, [statusSort]);

  useEffect(() => {
    dispatch(getProductsSortPrice(10));
  }, []);

  useEffect(() => {
    if (actionPopular === "GET_PRODUCTS_POPULAR" && statusPopular === "data") {
      setProdPopular(dataPopular);
    }
  }, [statusPopular]);

  useEffect(() => {
    dispatch(getProductsPopular(10));
  }, []);

  return (
    <>
      <div className="relative px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between border-solid border-2 bg-darkColor">
        <h1 className=" text-xl text-gray-100 font-semibold w-[150px]">
          Produk Termurah
        </h1>
        {/* <MdKeyboardArrowLeft className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} /> */}
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          <div>
            <Swiper
              spaceBetween={5}
              slidesPerView={5}
              navigation
              pagination
              className="h-[420px]"
            >
              {dataSort.data &&
                dataSort.data.map((data) => (
                  <SwiperSlide>
                    <div className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300">
                      <img
                        className="w-[200px] h-[300px]"
                        alt=""
                        src={`${url}/images/${data.ProductImages[0].filename}`}
                        onClick={() => navigate(`/user/details/${data.id}`)}
                      />
                      <p className="px-2 justify-between text-start text-gray-200 w-[200px] truncate overflow-hidden">
                        {data.name}
                      </p>
                      <div className="flex justify-between px-2 ">
                        <div>
                          <div>
                            <s>
                              <p className="text-start text-red-800 font-bold">
                                Rp. {intToRupiah(data.price)}{" "}
                              </p>
                            </s>
                            <p className="text-start font-bold text-accentColor text-xl">
                              Rp. {intToRupiah(data.finalPrice)}{" "}
                            </p>
                          </div>
                          {/* <div className="flex grid-cols-5 mt-1 text-start">
                            <div className="flex col-span-2 w-12 text-start">
                              <div className="text-amber-500 text-lg flex text-start">
                                {data.rating === 1
                                  ? oneStar
                                  : data.rating === 2
                                  ? twoStars
                                  : data.rating === 3
                                  ? threeStars
                                  : data.rating === 4
                                  ? fourStars
                                  : fiveStars}
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="text-sm text-gray-200">
                          <p className="text-[12px] capitalize text-end">
                            {data.category}
                          </p>
                          <p className="font-semibold text-end">
                            Sold: {data.totalSold}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        {/* < MdKeyboardArrowRight className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} /> */}
      </div>

      <div className="relative px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between border-solid border-2 bg-darkColor">
        <h1 className=" text-xl text-gray-100 font-semibold w-[150px]">
          Produk Terlaris
        </h1>
        {/* <MdKeyboardArrowLeft className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} /> */}
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          <div>
            <Swiper
              spaceBetween={5}
              slidesPerView={5}
              navigation
              pagination
              className="h-[420px]"
            >
              {dataPopular.data &&
                dataPopular.data.map((populer) => (
                  <SwiperSlide>
                    <div className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300">
                      <img
                        className="w-[200px] h-[300px]"
                        alt=""
                        src={`${url}/images/${populer.ProductImages[0].filename}`}
                        onClick={() => navigate(`/user/details/${populer.id}`)}
                      />
                      <p className="px-2 justify-between text-start text-gray-200 w-[200px] overflow-ellipsis overflow-hidden">
                        {populer.name}
                      </p>
                      <div className="flex justify-between px-2 ">
                        <div>
                          <div>
                            <s>
                              <p className="text-start text-red-800 font-bold">
                                Rp. {intToRupiah(populer.price)}{" "}
                              </p>
                            </s>
                            <p className="text-start font-bold text-accentColor text-xl">
                              Rp. {intToRupiah(populer.finalPrice)}{" "}
                            </p>
                          </div>
                          {/* <div className="flex grid-cols-5 mt-1 text-start">
                            <div className="flex col-span-2 w-12 text-start">
                              <div className="text-amber-500 text-lg flex text-start">
                                {populer.rating === 1
                                  ? oneStar
                                  : populer.rating === 2
                                  ? twoStars
                                  : populer.rating === 3
                                  ? threeStars
                                  : populer.rating === 4
                                  ? fourStars
                                  : fiveStars}
                              </div>
                            </div>
                          </div> */}
                        </div>
                        <div className="text-sm text-gray-200">
                          <p className="text-[12px] capitalize text-end">
                            {populer.category}
                          </p>
                          <p className="font-semibold text-end">
                            Sold: {populer.totalSold}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        {/* < MdKeyboardArrowRight className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} /> */}
      </div>
    </>
  );
};

export default HighlightProduct;
