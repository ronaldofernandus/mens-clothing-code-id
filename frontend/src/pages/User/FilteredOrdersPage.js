import React, { useEffect } from "react";
import OrderTable from "../../components/OrderTable";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingActions";

const FilteredOrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query } = useParams();
  // console.log(query);

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, []);

  // useEffect(() => {
  //   console.log(action, "||", status, "||", data, "||");
  // }, [status]);

  return (
    <div className="py-3 p-24 3xl:px-48 3xl:ml-6">
      <div className="container mx-auto h-[499px]">
        <h1 className="font-semibold text-center text-3xl text-midColor mt-10">
          Your Orders
        </h1>
        <hr className="mt-5" />
        <div className="flex flex-wrap  w-full justify-end space-x-6 py-4">
          <button
            className="text-base rounded-md border-bottom text-midColor border-0 px-3 font-semibold"
            onClick={() => {
              navigate(`/user/orders`);
            }}
          >
            All
          </button>
          <button
            className={
              query === "unpaid"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/unpaid`);
            }}
          >
            Unpaid
          </button>

          <button
            className={
              query === "ready"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/ready`);
            }}
          >
            Completed
          </button>

          <button
            className={
              query === "cancelled"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/cancelled`);
            }}
          >
            Cancelled
          </button>
        </div>
        <div className="p-5 border border-1 bg-gray-100 mt-5">
          {action === "GET_ORDERS_BY_USER_ID" && status === "data" ? (
            <OrderTable
              data={data.filter((order) => order.status.includes(query))}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredOrdersPage;
