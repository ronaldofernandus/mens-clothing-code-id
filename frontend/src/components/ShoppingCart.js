import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiClothes } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import { FaShoppingCart } from "react-icons/fa";
import AfterLoginRoutes from "../routers/AfterLoginRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import {
  getCartByUserId,
  checkout,
  editLineItem,
  deleteLineItem,
} from "../actions/shoppingActions";
import { useDispatch, useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";

const ShoppingCart = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("type") !== "user"
    ) {
      navigate("/login");
    }
    dispatch(getCartByUserId());
  }, []);

  useEffect(() => {
    if (action === "CHECKOUT" && status === "data")
      navigate("/user/orderDetail/" + data.id);
  }, [status]);

  async function editQty(id) {
    const { value: qty } = await Swal.fire({
      title: "Input the desired quantity",
      input: "number",
      inputLabel: "Update Quantity",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#041C32",
    });

    if (qty) {
      console.log(typeof id);
      console.log(typeof qty);
      dispatch(editLineItem(id, { qty: +qty })).then(() => {
        dispatch(getCartByUserId());
      });
    }
  }

  function deleteCartItem(id) {
    Swal.fire({
      title: "Are you sure you want to delete this item from Cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#041C32",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteLineItem(id)).then(() => {
          dispatch(getCartByUserId());
        });
      }
    });
  }

  const checkoutHandling = () => {
    Swal.fire({
      title: "Are you sure want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#041C32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(checkout());
      }
    });
  };

  return (
    <div className="flex w-full relative">
      <div
        className="text-xl right-[70px] lg:right-96 3xl:right-96 z-20 text-accentColor hover:text-white top-10 fixed cursor-pointer"
        onClick={() => setShowCart(!showCart)}
      >
        <FaShoppingCart />
      </div>
      <div
        className={`w-2 h-10 bg-white fixed top-16 right-[389px] 3xl:right-[388px] z-30 rounded-xl ${
          showCart ? "  block" : " hidden"
        }`}
      ></div>
      <div
        className={`flex transform top-[85px] -right-12 3xl:right-0 w-1/3 fixed h-96 overflow-auto ease-in-out transition-all duration-300 z-[3] ${
          showCart ? "  block" : " hidden"
        } `}
      >
        <div className="justify-between pt-6 w-3/4 bg-white shadow-xl rounded-xl">
          <div className=" text-xl text-center mt-2 text-darkColor font-semibold ">
            Shopping Bag
          </div>
          <hr className="mt-4 " />
          <div className="mx-auto flex justify-center">
            <ul className="my-2 ">
              {action === "GET_CART_BY_USER_ID" &&
              status === "data" &&
              data !== "loading" ? (
                data.lineItems.map((lineItem, index) => {
                  return (
                    <div key={index}>
                      <li className="my-2 flex  ">
                        <button className="flex items-center px-4 py-2 text-midColor ">
                          <GiClothes size={25} />
                          <span className="mx-4 font-normal">
                            {lineItem.Product.name}
                          </span>
                          <span className="font-normal">{lineItem.qty}</span>
                        </button>
                        <div className="border-r-[1px] mr-2 border-cyan-700"></div>
                        <button
                          className="mx-1 text-midColor hover:text-lightColor"
                          onClick={() => editQty(lineItem.id)}
                        >
                          <AiOutlineEdit />
                        </button>
                        <button
                          className="mx-3 text-midColor hover:text-red-600"
                          onClick={() => deleteCartItem(lineItem.id)}
                        >
                          <MdDelete />
                        </button>
                      </li>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {action === "GET_CART_BY_USER_ID" &&
              status === "data" &&
              data !== "loading" &&
              data.lineItems.length !== 0 ? (
                <li className="my-2 w-3/4 absolute right-0 bottom-5">
                  <button
                    className="flex bg-darkColor items-center py-3 px-8 text-white hover:bg-midColor rounded-md"
                    onClick={() => checkoutHandling()}
                  >
                    <span className="mx-4 font-medium">Checkout</span>
                  </button>
                </li>
              ) : (
                <li className="my-2 w-3/4 absolute right-6 top-32">
                  <button className="flex bg-gray-200 items-left  py-2 text-midColor rounded-md ">
                    <span className="mx-4 font-sm flex flex-col justify-center items-center">
                      <MdRemoveShoppingCart className="text-9xl" />
                      Empty Cart
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <aside className="flex border-r border-lightColor transform top-0 left-0 w-48 fixed h-screen ease-in-out transition-all duration-300 z-[3] -translate-x-[185px] hover:translate-x-0">
        <div className="bg-darkColor w-full">
          <div className="mx-auto h-full w-full">
            <ul className="my-2 h-full text-accentColor">
              <li className="py-10 text-2xl flex justify-center items-center">Filter</li>
              <hr/>
              <li className="pl-2 py-3">Categories</li>
              <li className="flex items-center mb-2">
                <Checkbox className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" color="blue" />
                <label>Tops</label>
              </li>
              <li className="flex items-center mb-2">
                <Checkbox className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" color="blue" />
                <label>Bottoms</label>
              </li>
              <li className="flex items-center mb-2">
                <Checkbox className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" color="blue" />
                <label>Accessories</label>
              </li>
              <li className="flex items-center mb-2">
                <Checkbox className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" color="blue" />
                <label>Grooming</label>
              </li>


            </ul>

          </div>


        </div>
      </aside> */}
      <main className="w-full max-h-full">
        <div className="sticky top-0 z-[2]">
          <Header />
        </div>
        <div className="sticky">
          <AfterLoginRoutes />
        </div>
        <div className="pt-2">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;
