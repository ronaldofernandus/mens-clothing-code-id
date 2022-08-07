import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiTShirtAirFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { create } from "../../actions/cmsActions";
import { getPromos } from "../../actions/promoActions";

function AddProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const { actionPromo, statusPromo, dataPromo } = useSelector(
    (state) => state.promoReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    weight: 0,
    len: 0,
    width: 0,
    height: 0,
    PromoId: 0,
    category: "tops",
    condition: "available",
    imageSize: null,
  });

  const [images, setImages] = useState([]);
  const [sizeRows, setSizeRows] = useState([1]);

  const [sizeArr, setSizeArr] = useState([]);

  useEffect(() => {
    console.log(sizeArr);
  }, [sizeArr]);

  const addSize = () => {
    setSizeRows([...sizeRows, sizeRows.length + 1]);
    setSizeArr([
      ...sizeArr,
      {
        type: "",
        color: "",
        stock: 0,
      },
    ]);
  };

  const updateTypeChanged = (index, e) => {
    let newArr = [...sizeArr];
    newArr[index] = { ...newArr[index], type: e.target.value };
    setSizeArr(newArr);
  };

  const updateColorChanged = (index, e) => {
    let newArr = [...sizeArr];
    newArr[index] = { ...newArr[index], color: e.target.value };
    setSizeArr(newArr);
  };

  const updateStockChanged = (index, e) => {
    let newArr = [...sizeArr];
    newArr[index] = { ...newArr[index], stock: e.target.value };
    setSizeArr(newArr);
  };

  const addProductHandler = () => {
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("weight", form.weight);
    formData.append("len", form.len);
    formData.append("width", form.width);
    formData.append("PromoId", form.PromoId);
    formData.append("height", form.height);
    formData.append("category", form.category);
    formData.append("condition", form.condition);
    formData.append("imageSize", form.imageSize);

    if (sizeArr.length !== 0) {
      for (const sizeStock of sizeArr) {
        formData.append("sizes", sizeStock.type);
        formData.append("colors", sizeStock.color);
        formData.append("stocks", sizeStock.stock);
      }
    }

    if (images.length !== 0) {
      for (const image of images) {
        formData.append("filename", image);
      }
    }
    console.log(form);
    dispatch(create(formData));
  };

  useEffect(() => {
    if (action === "CREATE" && status === "data") {
      navigate("/cms/dashboard");
    }
  }, [data]);

  useEffect(() => {
    dispatch(getPromos());
  }, []);

  const addImagesHandler = (files) => {
    setImages([...images, ...files]);
  };

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 min-h-screen py-5 no-scrollbar">
      <div className="">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
          <h1 className="pl-5">Add Product</h1>
          <hr className="border-cyan-800 mx-5 mt-2" />
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
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
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
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Availability
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="condition"
              id="condition"
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md w-full"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Promo
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="condition"
              id="condition"
              onChange={(e) => setForm({ ...form, PromoId: e.target.value })}
            >
              <option value={0}>No Promo</option>
              {actionPromo === "GET_PROMOS" && statusPromo === "data"
                ? dataPromo.map((promo) => {
                    return <option value={promo.id}>{promo.nama_promo}</option>;
                  })
                : console.log(actionPromo, statusPromo, dataPromo)}
            </select>
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
                onChange={(e) => setForm({ ...form, len: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-cyan-900 text-lg font-bold pb-2">
                Width
              </label>
              <input
                type="number"
                className="border hover:border-cyan-800 focus:boder-darkColor p-2 rounded-md w-full"
                onChange={(e) => setForm({ ...form, width: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-cyan-900 text-lg font-bold pb-2">
                Height
              </label>
              <input
                type="number"
                className="border hover:border-cyan-800 focus:boder-darkColor p-2 rounded-md w-full"
                onChange={(e) => setForm({ ...form, height: e.target.value })}
              ></input>
            </div>
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="px-5 py-5">
          <h1 className="text-cyan-900 text-lg font-bold">
            Upload Images (Choose up to 5)
          </h1>
          <div className=" flex space-x-8">
            {images !== undefined ? (
              Array.from(images).map((img, index) => {
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
                          className="object-cover w-full h-40"
                          src={
                            img
                              ? URL.createObjectURL(img)
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                        />
                      </div>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) =>
                        setImages([...images, ...e.target.files])
                      }
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}

            {images.length === 0 && (
              <div className="flex">
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                  <div>
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-2xl text-end text-white">
                        <IoAddCircleOutline />
                      </div>
                      <div className="text-7xl">
                        <RiTShirtAirFill className="m-auto" />
                      </div>
                      <p className="text-center">ADD IMAGE</p>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => addImagesHandler(e.target.files)}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                  <div>
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-2xl text-end text-white">
                        <IoAddCircleOutline />
                      </div>
                      <div className="text-7xl">
                        <RiTShirtAirFill className="m-auto" />
                      </div>
                      <p className="text-center">ADD IMAGE</p>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => addImagesHandler(e.target.files)}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                  <div>
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-2xl text-end text-white">
                        <IoAddCircleOutline />
                      </div>
                      <div className="text-7xl">
                        <RiTShirtAirFill className="m-auto" />
                      </div>
                      <p className="text-center">ADD IMAGE</p>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => addImagesHandler(e.target.files)}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                  <div>
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-2xl text-end text-white">
                        <IoAddCircleOutline />
                      </div>
                      <div className="text-7xl">
                        <RiTShirtAirFill className="m-auto" />
                      </div>
                      <p className="text-center">ADD IMAGE</p>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => addImagesHandler(e.target.files)}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 my-5 w-36 h-36 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
                  <div>
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-2xl text-end text-white">
                        <IoAddCircleOutline />
                      </div>
                      <div className="text-7xl">
                        <RiTShirtAirFill className="m-auto" />
                      </div>
                      <p className="text-center">ADD IMAGE</p>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) => addImagesHandler(e.target.files)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mb-2" />
        <div className="px-5 py-2">
          <label className="block text-cyan-900 text-lg font-bold pb-2">
            Upload Size Chart
          </label>
          {form.imageSize === null ? (
            <div className="flex-shrink-0 my-5 w-full h-40 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
              <div>
                <label
                  className="cursor-pointer custom-file-upload"
                  htmlFor="imageSize"
                >
                  <div className="text-7xl pt-6">
                    <AiOutlinePlusCircle className="m-auto" />
                  </div>
                  <p className="text-center">ADD SIZE CHART</p>
                </label>
                <input
                  className="hidden"
                  type="file"
                  accept="image"
                  name="imageSize"
                  id="imageSize"
                  onChange={(e) =>
                    setForm({ ...form, imageSize: e.target.files[0] })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="flex-shrink-0 my-5 w-full h-40 bg-white text-gray-500 p-2 cursor-pointer hover:scale-125 shadow-lg rounded mx-2">
              <div>
                <label
                  className="cursor-pointer custom-file-upload"
                  htmlFor="imageSize"
                >
                  <div className="text-7xl">
                    <img
                      className="object-cover w-full h-40"
                      src={
                        form.imageSize
                          ? URL.createObjectURL(form.imageSize)
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
                    />
                  </div>
                </label>
                <input
                  className="hidden"
                  type="file"
                  accept="image"
                  name="imageSize"
                  id="imageSize"
                  onChange={(e) =>
                    setForm({ ...form, imageSize: e.target.files[0] })
                  }
                />
              </div>
            </div>
          )}
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="grid grid-cols-2">
          <div className="px-5 py-2">
            <div className="py-4 text-lg font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
              <h1>Size Variant, Color and Stock</h1>
            </div>
          </div>
          <div className="px-5 py-2 text-right">
            <button className="p-2" onClick={() => addSize()}>
              <h1 className="pl-5 text-base font-bold text-cyan-700 hover:text-cyan-900 ">
                Add Rows
              </h1>
            </button>
          </div>
          <table className="table-auto">
            <tbody>
              {sizeRows.length !== 0 ? (
                sizeRows.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td className="pl-5 w-[900vw]">
                        <input
                          placeholder="Size Type (S/M/L/US/UK)"
                          type="text"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          onChange={(e) => updateTypeChanged(index, e)}
                        />
                      </td>
                      <td className="pl-5 w-[300vw]">
                        <input
                          placeholder="Color"
                          type="text"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          onChange={(e) => updateColorChanged(index, e)}
                        />
                      </td>
                      <td className="pl-5 w-[220vw]">
                        <input
                          placeholder="Stock"
                          type="number"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          onChange={(e) => updateStockChanged(index, e)}
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
        <div className="px-5 py-5 text-center">
          <button
            className="text-2xl py-2 border bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-1/3 text-white uppercase"
            name="condition"
            id="condition"
            onClick={() => {
              addProductHandler();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
