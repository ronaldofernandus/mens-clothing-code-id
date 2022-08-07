import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import {
  getOrder,
  updatePayment,
  cancelOrder,
} from "../../actions/shoppingActions";

import {
  getCity,
  getProvince,
  getProvinces,
  getCitiesByProvinceId,
  checkCost,
} from "../../actions/rajaOngkirActions";

import Modal from "react-modal";
import Swal from "sweetalert2";
import StripeContainer from "../../components/StripeContainer";

import base_url from "../../helpers/base_url";
import intToRupiah from "../../helpers/rupiah";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const id = Number(useParams().id);

  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );

  const {
    actionProvinces,
    statusProvinces,
    dataProvinces,
    actionProvince,
    statusProvince,
    dataProvince,
    actionCity,
    statusCity,
    dataCity,
  } = useSelector((state) => state.rajaOngkirReducer);

  const { actionCities, statusCities, dataCities } = useSelector(
    (state) => state.rajaOngkirReducer
  );

  const { actionCost, statusCost, dataCost } = useSelector(
    (state) => state.rajaOngkirReducer
  );

  useEffect(() => {
    dispatch(getOrder(+id));
  }, []);

  const [shippingCost, setShippingCost] = useState(0);
  const [provinceId, setProvinceId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [shippingDetail, setShippingDetail] = useState({
    origin: 152,
    destination: 0,
    weight: 1,
    courier: "",
  });

  const [shippingData, setShippingData] = useState({
    destinationCityId: 0,
    destinationCityName: "",
    destinationProvinceId: 0,
    destinationProvinceName: "",
    fullAddress: "",
    expeditionCode: "",
    expeditionService: "",
    cost: 0,
  });

  useEffect(() => {
    dispatch(getProvinces());
  }, []);

  useEffect(() => {
    let attr = `?province=${provinceId}`;
    dispatch(getCitiesByProvinceId(attr));
  }, [provinceId]);

  useEffect(() => {
    if (
      shippingDetail.courier !== "" &&
      shippingDetail.destination !== 0 &&
      shippingDetail.weight !== 0
    ) {
      dispatch(checkCost(shippingDetail));
    }
    console.log(shippingDetail);
  }, [shippingDetail]);

  useEffect(() => {
    if (action === "GET_ORDER" && status === "data") {
      setShippingDetail({ ...shippingDetail, weight: data.totalWeight });
    }
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(55, 49, 52, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpenModal(false);
    dispatch(updatePayment(id, shippingData)).then(() => {
      dispatch(getOrder(+id));
    });
  }

  const cancelOrderHandler = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#008080",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(cancelOrder(id)).then(() => {
          dispatch(getOrder(+id));
        });
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StripeContainer
          totalDue={Number(data.totalDue) + Number(shippingCost)}
        />
        <div align="center" className="py-5">
          <button
            className="bg-gray-500  text-white p-3 rounded font-semibold"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      {action === "GET_ORDER" && status === "data" && data !== "Loading" ? (
        <div className="w-full ">
          <div
            className="px-16 lg:px-24 3xl:px-[100px] mt-4  relative z-10 flex cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <h1 className="text-lg hover:text-cyan-600 font-semibold text-darkColor flex items-center">
              <MdOutlineArrowBackIos className="mr-1" /> Back
            </h1>
          </div>
          <h1 className="font-semibold text-center text-3xl text-darkColor mt-5">
            Order Summary
          </h1>
          <hr className="mt-5 mx-24" />

          <hr className="mx-24" />
          <div className="container mx-auto px-24">
            {/* <h1 className="font-semibold text-lg text-center">Detail</h1> */}
            <div className="py-5">
              <table>
                <tbody>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-darkColor">
                        Transaction
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        {data.paymentTrasaction !== null ? (
                          <p className="mb-4 md:ml-4 text-darkColor">
                            : {data.paymentTrasaction.toUpperCase()}
                          </p>
                        ) : (
                          <p className="mb-4 md:ml-4 text-darkColor">: -</p>
                        )}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-darkColor">
                        Order Date
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        <p className="mb-4 md:ml-4 text-darkColor">
                          : {String(data.createdAt).slice(0, 10)}
                        </p>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-darkColor">
                        Status
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        {data.status === "unpaid" ? (
                          <p className="mb-4 md:ml-4 text-darkColor font-bold">
                            <span className="text-darkColor font-normal">
                              :{" "}
                            </span>
                            {data.status.toUpperCase()}
                          </p>
                        ) : data.status === "completed" ? (
                          <p className="mb-4 md:ml-4 text-green-700 font-bold">
                            <span className="text-darkColor font-normal">
                              :{" "}
                            </span>{" "}
                            COMPLETED
                          </p>
                        ) : (
                          <p className="mb-4 md:ml-4 text-red-700 font-bold">
                            <span className="text-darkColor font-normal">
                              :{" "}
                            </span>{" "}
                            {data.status.toUpperCase()}
                          </p>
                        )}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-24 ">
            <table
              className="border w-full text-sm lg:text-base"
              cellSpacing="0"
            >
              <thead className="bg-gray-200 ">
                <tr className="h-12 uppercase">
                  <th className=" text-center text-darkColor">Image</th>
                  <th className="text-center text-darkColor">Product</th>
                  <th className="text-center">
                    <span className="lg:hidden text-darkColor" title="Quantity">
                      Qty
                    </span>
                    <span className="hidden lg:inline text-darkColor">
                      Quantity
                    </span>
                  </th>
                  <th className="text-center text-darkColor">Unit price</th>
                  <th className="text-center text-darkColor">Total price</th>
                </tr>
              </thead>
              <tbody className="text-center py-10">
                {data.Products.map((product, index) => {
                  return (
                    <tr key={index} className="text-center ">
                      <td className="text-center flex justify-center">
                        <Link to="#">
                          <img
                            src={
                              base_url +
                              "/images/" +
                              product.ProductImages[0].filename
                            }
                            className="w-20 h-25 "
                            alt="Thumbnail"
                          />
                        </Link>
                      </td>
                      <td className="text-center text-darkColor">
                        <Link to="#">
                          <p className="mb-2 md:ml-4">{product.name}</p>
                        </Link>
                      </td>
                      <td className="text-center text-darkColor">
                        <span className="text-sm lg:text-base font-medium">
                          {product.LineItem.qty}
                        </span>
                      </td>
                      <td className="text-center text-darkColor">
                        <span className="text-sm lg:text-base font-medium">
                          {product.finalPrice}
                        </span>
                      </td>
                      <td className="text-center text-darkColor">
                        <span className="text-sm lg:text-base font-bold text-darkColor">
                          {product.finalPrice * product.LineItem.qty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex mr-12 mt-5 mb-10  justify-center">
              <div className="bg-white w-2/3 justify-center rounded-lg h-[350px] mr-8">
                <h1 className="font-semibold text-base text-center mt-2 text-darkColor">
                  Shipping Detail
                </h1>
                <hr className="mt-2" />
                {data.Shipping ? (
                  <div className="py-5">
                    <div className="grid grid-cols-2">
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Province :
                        </label>
                      </div>
                      <div className="px-3 py-2">
                        <select className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5">
                          <option>
                            {data.Shipping.destinationProvinceName}
                          </option>
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          City :
                        </label>
                      </div>
                      <div className="px-3 py-2">
                        <select className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5">
                          <option>{data.Shipping.destinationCityName}</option>
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Shipping Service :
                        </label>
                      </div>
                      <div className="px-3 pt-2">
                        <select className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5">
                          <option>{data.Shipping.expeditionCode}</option>
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Service :
                        </label>
                      </div>

                      <div className="px-3 pt-2">
                        <select className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5">
                          <option key={-1} value={0}>
                            {data.Shipping.expeditionService}
                          </option>
                        </select>
                      </div>

                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Address :
                        </label>
                      </div>
                      <div className="px-3 pt-2">
                        <textarea
                          className="border"
                          cols={35}
                          value={data.Shipping.fullAddress}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-5">
                    <div className="grid grid-cols-2">
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Province :
                        </label>
                      </div>
                      <div className="px-3 py-2">
                        <select
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
                          onChange={(e) => {
                            let provinceData = e.target.value.split(",");
                            setShippingData({
                              ...shippingData,
                              destinationProvinceId: provinceData[0],
                              destinationProvinceName: provinceData[1],
                            });
                            setProvinceId(provinceData[0]);
                          }}
                        >
                          <option>Choose Province</option>
                          {actionProvinces === "GET_PROVINCES" &&
                          statusProvinces === "data"
                            ? dataProvinces.rajaongkir.results.map(
                                (province) => {
                                  return (
                                    <option
                                      key={province.province_id}
                                      value={`${province.province_id},${province.province}`}
                                    >
                                      {province.province}
                                    </option>
                                  );
                                }
                              )
                            : console.log(actionProvinces, statusProvinces)}
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          City :
                        </label>
                      </div>
                      <div className="px-3 py-2">
                        <select
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
                          onChange={(e) => {
                            let cityData = e.target.value.split(",");
                            setShippingDetail({
                              ...shippingDetail,
                              destination: cityData[0],
                            });
                            setShippingData({
                              ...shippingData,
                              destinationCityId: cityData[0],
                              destinationCityName:
                                cityData[1] + " " + cityData[2],
                            });
                          }}
                        >
                          <option value={0}>Choose City</option>
                          {actionCities === "GET_CITIES_BY_PROVINCE_ID" &&
                          statusCities === "data"
                            ? dataCities.rajaongkir.results.map((city) => {
                                return (
                                  <option
                                    key={city.city_id}
                                    value={`${city.city_id},${city.type},${city.city_name}`}
                                  >
                                    {city.type + " " + city.city_name}
                                  </option>
                                );
                              })
                            : console.log(actionCities, statusCities)}
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Shipping Service :
                        </label>
                      </div>
                      <div className="px-3 pt-2">
                        <select
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
                          onChange={(e) => {
                            setShippingDetail({
                              ...shippingDetail,
                              courier: e.target.value,
                            });
                            setShippingData({
                              ...shippingData,
                              expeditionCode: e.target.value,
                            });
                          }}
                        >
                          <option value="">Choose Shipping Service : </option>
                          <option value="jne">JNE</option>
                          <option value="tiki">Tiki</option>
                          <option value="pos">Pos</option>
                        </select>
                      </div>
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Service :
                        </label>
                      </div>
                      {actionCost === "CHECK_COST" &&
                      statusCost === "data" &&
                      shippingDetail.courier !== "" &&
                      shippingDetail.destination !== 0 ? (
                        <div className="px-3 pt-2">
                          <select
                            className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
                            onChange={(e) => {
                              let serviceData = e.target.value.split(",");
                              setShippingData({
                                ...shippingData,
                                expeditionService: serviceData[0],
                                cost: serviceData[1],
                              });
                              setShippingCost(serviceData[1]);
                            }}
                          >
                            <option key={-1} value={0}>
                              Choose Service
                            </option>
                            {dataCost.result
                              ? dataCost.result[0].costs.map((service) => {
                                  return (
                                    <option
                                      key={service.service}
                                      value={`${service.description},${service.cost[0].value}`}
                                    >
                                      {service.description} - Rp
                                      {service.cost[0].value}
                                    </option>
                                  );
                                })
                              : console.log(actionCost, statusCost)}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="pl-8 pt-4">
                        <label className="font-semibold text-midColor">
                          Address :
                        </label>
                      </div>
                      <div className="px-3 pt-2">
                        <textarea
                          className="border"
                          cols={35}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              fullAddress: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white w-1/3 justify-center rounded-lg h-[350px] ml-8">
                <h1 className="font-semibold text-base text-center mt-2 text-darkColor">
                  Subtotal
                </h1>
                <hr className="mt-2" />
                <div className="py-5">
                  <table align="center">
                    <tbody>
                      <tr className="">
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-darkColor text-md">Price</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <div className="mb-4 md:ml-4 text-darkColor font-semibold ">
                              <span className="text-darkColor font-normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(data.subtotal)}
                            </div>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-darkColor text-md">Discount</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 text-darkColor font-semibold">
                              {data.discount !== 0
                                ? `-${intToRupiah(data.discount)}`
                                : `: ${intToRupiah(data.discount)}`}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-darkColor text-md">Tax</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-semibold text-darkColor">
                              <span className="text-darkColor font normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(data.tax)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-darkColor text-md">
                            Shipping Cost
                          </h1>
                        </td>
                        {data.Shipping !== null ? (
                          <td>
                            <Link to="#">
                              <p className="mb-4 md:ml-4 font-semibold text-darkColor">
                                <span className="text-darkColor font normal">
                                  :{" "}
                                </span>{" "}
                                {intToRupiah(data.Shipping.cost)}
                              </p>
                            </Link>
                          </td>
                        ) : (
                          <td>
                            <Link to="#">
                              <p className="mb-4 md:ml-4 font-semibold text-darkColor">
                                <span className="text-darkColor font normal">
                                  :{" "}
                                </span>{" "}
                                {intToRupiah(shippingCost)}
                              </p>
                            </Link>
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-darkColor text-md">Total</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <div className="mb-4 md:ml-4 font-bold text-darkColor text-lg">
                              <span className="text-darkColor font-normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(
                                Number(data.totalDue) + Number(shippingCost)
                              )}
                              <hr className="font-bold " />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div align="center">
                    {data.status === "unpaid" ? (
                      <div className="grid grid-cols-2">
                        <button
                          className="text-white bg-amber-600 hover:bg-amber-700 font-bold p-3 mt-5"
                          onClick={() => cancelOrderHandler()}
                        >
                          CANCEL ORDER
                        </button>
                        {shippingCost != 0 ? (
                          <button
                            className="text-white bg-green-500 hover:bg-green-600 font-bold p-3 mt-5"
                            onClick={() => setOpenModal(true)}
                          >
                            PAY NOW
                          </button>
                        ) : (
                          <div className="text-white bg-gray-500 font-bold p-3 mt-5">
                            PAY NOW
                          </div>
                        )}
                      </div>
                    ) : data.status === "cancelled" ? (
                      <div className="text-gray-50 bg-red-400 font-bold p-3 mt-5">
                        CANCELLED
                      </div>
                    ) : (
                      <div className="text-gray-50 bg-green-400 font-bold p-3 mt-5">
                        ORDER HAS BEEN PAID
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetailsPage;
