import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import intToRupiah from "../../helpers/rupiah";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import base_url from "../../helpers/base_url";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="p-5">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="pl-5">Product Detail</h1>
            </div>
            <div className="mr-5">
              <button
                className=" text-darkColor hover:text-cyan-600 cursor-pointer"
                onClick={() => navigate(`/cms/edit/${id}`)}
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
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>
        {action === "GET_PRODUCT_BY_ID" &&
        status === "data" &&
        data !== "loading" ? (
          console.log(data)
        ) : (
          <></>
        )}
        <div className="px-5 pb-10">
          <div className=" flex space-x-8">
            {data.ProductImages !== undefined ? (
              data.ProductImages.map((img, index) => {
                return (
                  <div
                    className="flex-shrink-0 flex-col my-5 w-36 h-36   shadow-lg rounded-md cursor-pointer"
                    key={index}
                  >
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-7xl">
                        <img
                          className="object-cover w-full h-40 hover:scale-125"
                          src={
                            img
                              ? url + "/images/" + img.filename
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          onClick={() =>
                            Swal.fire({
                              width: 1000,
                              imageUrl: url + "/images/" + img.filename,
                              imageHeight: 500,
                            })
                          }
                        />
                      </div>
                    </label>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 ">
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Name
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              disabled
              value={data.name}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Description
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <textarea
              rows="15"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={data.desc}
              disabled
            ></textarea>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Category
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="category"
              id="category"
              value={data.category}
              disabled
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Condition
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="condition"
              id="condition"
              value={data.condition}
              disabled
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={data.weight}
              disabled
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              value={intToRupiah(data.finalPrice)}
              disabled
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Promo
            </label>

            {action === "GET_PRODUCT_BY_ID" && status === "data" ? (
              <select
                className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
                name="condition"
                id="condition"
                disabled
              >
                {data.Promo ? (
                  data.Promo.nama_promo !== null ? (
                    <option>{data.Promo.nama_promo}</option>
                  ) : (
                    <option>No Promo</option>
                  )
                ) : (
                  <option>No Promo</option>
                )}
              </select>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="px-5 py-5">
          <h1 className="text-cyan-900 text-lg font-bold pb-5">
            Dimensional Weight (in inches)
          </h1>
          <div className="grid grid-cols-3">
            <div className="px-5 py-2">
              <label className="block text-cyan-900 text-lg font-bold pb-2">
                Length
              </label>
              <input
                type="number"
                className="border hover:border-cyan-800 focus:boder-darkColor p-2 rounded-md w-full"
                value={data.len}
                disabled
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-cyan-900 text-lg font-bold pb-2">
                Width
              </label>
              <input
                type="number"
                className="border hover:border-cyan-800 focus:boder-darkColor p-2 rounded-md w-full"
                value={data.width}
                disabled
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-cyan-900 text-lg font-bold pb-2">
                Height
              </label>
              <input
                type="number"
                className="border hover:border-cyan-800 focus:boder-darkColor p-2 rounded-md w-full"
                value={data.height}
                disabled
              ></input>
            </div>
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="px-5 py-2">
          <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
            <h1 className="pl-5">Size Chart</h1>
            <div className="px-5 py-2">
              <div className="flex-shrink-0 my-5 w-full h-40 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                <div>
                  <label
                    className="cursor-pointer custom-file-upload"
                    htmlFor="imageSize"
                  >
                    <div className="text-7xl">
                      {action === "GET_PRODUCT_BY_ID" && status === "data" ? (
                        <img
                          className="object-cover w-full h-40"
                          src={url + "/images/" + data.imageSize}
                          onClick={() =>
                            Swal.fire({
                              width: 1000,
                              imageUrl: url + "/images/" + data.imageSize,
                              imageHeight: 500,
                            })
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <table className="table-auto">
            <tbody>
              {data.ProductStocks !== undefined ? (
                data.ProductStocks.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td className="pl-5 w-[900vw]">
                        <input
                          type="text"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          value={row.size}
                          disabled
                        />
                      </td>
                      <td className="pl-5 w-[300vw]">
                        <input
                          placeholder="Color"
                          type="text"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          value={row.color}
                          disabled
                        />
                      </td>
                      <td className="pl-5 w-[220vw]">
                        <input
                          placeholder="Stock"
                          type="number"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          value={row.stock}
                          disabled
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
