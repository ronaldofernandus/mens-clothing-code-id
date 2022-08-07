import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { getProductById } from "../../actions/cmsActions";
import {
  addToCart,
  getCartByUserId,
  addViews,
} from "../../actions/shoppingActions";
import { TbEdit } from "react-icons/tb";
import intToRupiah from "../../helpers/rupiah";

import Swal from "sweetalert2";

import base_url from "../../helpers/base_url";

const ProductDetailsUser = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(addViews(id));
    dispatch(getProductById(id));
  }, []);

  const [dropdownSizeStock, setDropdownSizeStock] = useState([]);
  const [modalQtySize, setModalQtySize] = useState(false);
  const [itemToCart, setItemToCart] = useState({
    qty: 0,
    ProductId: 0,
    ProductStockId: 0,
  });
  const [listOfQuantity, setListOfQuantity] = useState([]);

  useEffect(() => {
    if (
      dropdownSizeStock &&
      dropdownSizeStock.length > 0 &&
      itemToCart.ProductStockId !== 0
    ) {
      const listQty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      setListOfQuantity([
        ...listQty.filter(
          (value) =>
            value <=
            dropdownSizeStock[
              +dropdownSizeStock
                .map((productStock) => productStock.id)
                .indexOf(+itemToCart.ProductStockId)
            ].stock
        ),
      ]);
    }
  }, [itemToCart.ProductStockId]);

  useEffect(() => {
    if (action === "GET_PRODUCT_BY_ID" && status === "data") {
      // setDropdownSizeStock(data.ProductStocks.reduce((a, product) => (product.stock > 0) ? ({ ...a, [product.size]: product.size.toUpperCase() }) : ({ ...a }), {}))
      data.ProductStocks.forEach((productStock) => {
        setDropdownSizeStock([
          ...dropdownSizeStock,
          {
            id: productStock.id,
            size: productStock.size,
            color: productStock.color,
            stock: productStock.stock,
          },
        ]);
      });
    }
  }, [status]);

  const addToCartHandler = () => {
    dispatch(addToCart(itemToCart)).then(() => {
      dispatch(getCartByUserId());
    });

    // console.log(itemToCart);
  };

  async function inputQty(qty) {
    // const { value: qty } = await Swal.fire({
    //   title: "Input Size and Quantity",
    //   input: "select",
    //   inputOptions: dropdownSizeStock,
    //   inputPlaceholder: "Enter Size",
    //   confirmButtonColor: "#041C32",
    //   html:'<input id="swal-input1" class="swal2-input" placeholder="Enter Quantity">',

    //   preconfirm: () => {
    //     let resolution = document.getElementById ('swal-input1').value;
    //     console.log(resolution)
    //  }
    // });

    if (qty >= 1 && qty <= data.stock) {
      dispatch(addToCart(itemToCart)).then(() => {
        dispatch(getCartByUserId());
      });
    } else if (qty < 1) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must be a positive integer!",
        "error"
      );
    } else if (qty > data.stock) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must not be higher than the Product Stock!",
        "error"
      );
    }
  }

  return (
    <>
      {action === "GET_PRODUCT_BY_ID" &&
      status === "data" &&
      data !== "loading" ? (
        <div>
          {modalQtySize ? (
            <div className="overflow-y-auto fixed z-10 flex justify-center items-center inset-0 h-modal w-full">
              <div className="bg-darkColor lg:w-4/12 w-11/12 pb-5 rounded-md">
                <div className="grid grid-cols-12 py-3">
                  <div className="col-span-11 flex justify-center item-center">
                    <p className="text-white text-2xl">
                      Enter Size and Quantity
                    </p>
                  </div>
                  <div className="flex justify-center item-center">
                    <button
                      className="text-right text-white text-2xl"
                      onClick={() => setModalQtySize(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
                <hr className="mx-5 mb-2" />
                <div className="grid grid-cols-2 w-full pb-5">
                  <div className="flex justify-center">
                    <div className="w-10/12">
                      <p className="text-white text-center">Size</p>
                      <select
                        type="select"
                        name="size"
                        id="size"
                        onChange={(e) =>
                          setItemToCart({
                            ...itemToCart,
                            ProductStockId: e.target.value,
                            ProductId: id,
                          })
                        }
                        className="block w-10/12 mx-auto h-10 rounded-md"
                      >
                        <option>Choose</option>
                        {dropdownSizeStock.map((product, index) => {
                          return (
                            <option key={index} value={product.id}>
                              {product.size + " - " + product.color}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-10/12">
                      {/* <p className="text-white text-center">Quantity</p> */}
                      {/* <input
                        className="block w-10/12 mx-auto h-10 rounded-md"
                        type="number"
                        onChange={(e) =>
                          setItemToCart({ ...itemToCart, qty: e.target.value })
                        }
                      ></input> */}
                      <p className="text-white text-center">Quantity</p>
                      <select
                        type="select"
                        name="size"
                        id="size"
                        onChange={(e) =>
                          setItemToCart({ ...itemToCart, qty: e.target.value })
                        }
                        className="block w-10/12 mx-auto h-10 rounded-md"
                      >
                        <option>Choose</option>
                        {listOfQuantity && itemToCart.ProductStockId !== 0
                          ? listOfQuantity.map((value) => {
                              return (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-white px-10 rounded-md py-2 text-darkColor"
                    onClick={addToCartHandler}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className="px-16 lg:px-24 3xl:px-[218px] mt-4  relative z-10 flex cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <h1 className="text-md hover:text-lightColor font-semibold text-darkColor flex items-center">
              <MdOutlineArrowBackIos className="mr-1" /> Back
            </h1>
          </div>
          <div className="-mt-5 grid md:grid-cols-12 sm:grid-cols-1 lg:px-20 3xl:px-[200px]">
            <div className="md:col-span-4 sm:col-span-12 sm:min-h-screen mx-auto ">
              <div className="flex px-5">
                <h1 className="text-lg flex items-center pt-10 pb-5 text-darkColor font-bold"></h1>
              </div>
              <div className="max-w-sm lg:mr-16 3xl:max-w-lg px-5 rounded overflow-hidden">
                <Swiper spaceBetween={50} slidesPerView={1}>
                  {action === "GET_PRODUCT_BY_ID" && data !== "loading"
                    ? data.ProductImages.map((img, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <img
                              className=""
                              src={`${url}/images/${img.filename}`}
                            ></img>
                          </SwiperSlide>
                        );
                      })
                    : "Loading"}
                </Swiper>
                <div className="flex justify-center items-center">
                  <div className="font-bold text-xl text-center mt-2 text-darkColor">
                    {data.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-r w-5 border-gray-200 3xl:ml-12" />
            <div className="md:col-span-7 sm:col-span-12 overflow-scroll no-scrollbar ">
              <div className="p-5">
                <h1 className="text-xl font-bold pt-10 pb-1 text-darkColor">
                  Description
                </h1>
                <p className="text-justify mb-3 text-darkColor">{data.desc}</p>
                <hr />
                <h1 className="pt-3 text-lg font-bold text-darkColor">
                  Category
                </h1>
                <p className="mb-3 text-darkColor capitalize">
                  {data.category}
                </p>
                <hr />
                <h1 className="pt-3 text-lg font-bold text-darkColor">
                  Availability
                </h1>
                <p className="mb-3 text-darkColor capitalize">
                  {data.condition}
                </p>
                <hr />
                <h1 className="pt-3 text-lg font-bold text-darkColor capitalize">
                  Available Sizes
                </h1>
                <div className="mb-3 text-darkColor">
                  <div className="my-3">
                    <img
                      src={url + "/images/" + data.imageSize}
                      onClick={() =>
                        Swal.fire({
                          width: 1000,
                          imageUrl: url + "/images/" + data.imageSize,
                          imageHeight: 500,
                        })
                      }
                    />
                  </div>
                  <table className="border-collapse border border-slate-500 w-full">
                    <thead>
                      <tr className="p-2">
                        <th className="border border-slate-600 py-1 px-3 bg-darkColor text-white">
                          Size
                        </th>
                        <th className="border border-slate-600 py-1 px-3 bg-darkColor text-white">
                          Stock
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.ProductStocks.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td className="border border-slate-700 py-1 px-3">
                              {product.size}
                            </td>
                            <td className="border border-slate-700 py-1 px-3 text-right">
                              {product.stock}
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td className="border border-slate-700 py-1 px-3 font-semibold bg-gray-200 text-center">
                          Total Stocks
                        </td>
                        <td className="border border-slate-700 py-1 px-3 font-semibold text-right bg-gray-200">
                          {data.ProductStocks.reduce(
                            (prev, { stock }) => prev + stock,
                            0
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr />
                <h1 className="pt-3 text-lg font-bold text-darkColor ">
                  Views
                </h1>
                <p className="mb-3 text-darkColor">{data.views}</p>
                <hr />
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="flex">
                      <h1 className="pt-3 text-lg font-bold text-darkColor">
                        Price -
                      </h1>
                      <div className="pt-3 pl-1 text-lg font-bold text-red-800">
                        {data.Promo.potongan_harga}% OFF!
                      </div>
                    </div>

                    <div className="flex">
                      <s>
                        <p className="mb-3 text-red-800 font-semibold">
                          Rp. {intToRupiah(data.price)}
                        </p>
                      </s>
                      <p className="mb-3 ml-3 text-darkColor font-bold">
                        Rp. {intToRupiah(data.finalPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="pt-3 text-lg font-bold text-darkColor">
                      Total Sold
                    </h1>
                    <p>{data.totalSold}</p>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="flex justify-center mt-5 w-full 3xl:mt-6">
                  <button
                    className="bg-darkColor text-white hover:bg-lightColor p-4 font-semibold rounded-md w-full"
                    onClick={
                      () =>
                        // inputQty()
                        setModalQtySize(true)
                      // console.log(dropdownSizeStock)
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductDetailsUser;
