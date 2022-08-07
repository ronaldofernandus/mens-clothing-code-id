import React, { useState, useEffect } from "react";
import OrderTable from "../../components/OrderTable";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersByUserId,
  getFilteredOrdersByUserId,
} from "../../actions/shoppingActions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const OrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [unpaid, setUnpaid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [filterDone, setFilterDone] = useState(false);
  let pageAttribute = `?page=${page}`;

  useEffect(() => {
    if (unpaid === true) {
      setOrderStatus("unpaid");
    } else {
      setOrderStatus("");
    }
  }, [unpaid]);

  useEffect(() => {
    if (completed === true) {
      setOrderStatus("completed");
    } else {
      setOrderStatus("");
    }
  }, [completed]);

  useEffect(() => {
    if (cancelled === true) {
      setOrderStatus("cancelled");
    } else {
      setOrderStatus("");
    }
  }, [cancelled]);

  useEffect(() => {
    dispatch(getOrdersByUserId(pageAttribute));
  }, [page]);

  useEffect(() => {
    if (
      orderStatus === "unpaid" ||
      orderStatus === "completed" ||
      orderStatus === "cancelled"
    ) {
      dispatch(getFilteredOrdersByUserId(pageAttribute, orderStatus));
    } else {
      dispatch(getOrdersByUserId(pageAttribute));
    }
  }, [orderStatus]);

  return (
    <div className="py-3 p-24 3xl:px-48 3xl:ml-6 h-[820px]">
      <div className="container mx-auto h-[499px]">
        <h1 className="font-semibold text-center text-3xl text-darkColor mt-10">
          Your Orders
        </h1>
        <hr className="mt-5" />

        <div className="flex flex-wrap  w-full justify-end space-x-6 py-4">
          <button
            className="text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
            onClick={() => {
              navigate(`/user/orders`);
            }}
          >
            All
          </button>
          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              setUnpaid(!unpaid);
            }}
          >
            Unpaid
          </button>

          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              setCompleted(!completed);
            }}
          >
            Completed
          </button>

          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              setCancelled(!cancelled);
            }}
          >
            Cancelled
          </button>
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

        <hr className="mt-1" />

        <div className="p-5 border border-1 bg-gray-100 mt-5">
          {(action === "GET_ORDERS_BY_USER_ID" && status === "data") ||
          (action === "GET_FILTERED_ORDERS_BY_USER_ID" && status === "data") ? (
            <OrderTable data={data.data} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
