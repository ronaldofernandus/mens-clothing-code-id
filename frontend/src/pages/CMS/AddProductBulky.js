import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos, MdUpload } from "react-icons/md";
import { saveAs } from "file-saver";
import file_template_add_product from "./Template_Add_Product/Template_Add_Product.rar";
import "tw-elements";
import { useDispatch, useSelector } from "react-redux";
import { createproductbulk } from "../../actions/cmsActions";

function AddProductBulky() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveFile = () => {
    saveAs(file_template_add_product, "template_add_product.rar");
  };

  const [images, setImages] = useState([]);
  const addProductbulkHandler = () => {
    let formData = new FormData();
    formData.append("filename", images);
    console.log(formData);
    dispatch(createproductbulk(formData));
  };

  useEffect(() => {
    if (action === "CREATE_BULK" && status === "data") {
      navigate("/cms/dashboard");
    }
  }, [data]);

  const fileHandler = (event) => {
    setImages(event.target.files[0]);
  };

  return (
    <>
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

          <div className="grid gap-4 grid-cols-2 divide-x-4">
            <div className="pl-5">
              <h1 className="font-bold text-cyan-900 uppercase">
                1. Download Templates Add at Once
              </h1>
              <p className="text-thin text-gray-400 mt-2 mb-3">
                You will receive a file containing the Product Upload Template.
                Use the file according to its function. follow the instructions
                in the form.
              </p>
              <br></br>
              <div className="box-content h-32 w-50 p-4 border-4 rounded-lg items-center flex">
                <div className="flex-1 px-4 py-2 m-10">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={saveFile}
                  >
                    <svg
                      className="fill-current w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>Download Template</span>
                  </button>
                </div>
              </div>
              <br></br>
              <br></br>
            </div>
            <div className="pl-5">
              <h1 className="font-bold text-cyan-900 uppercase">
                2. Upload the filled file
              </h1>
              <p className="text-thin text-gray-400 mt-2 mb-3">
                Fill in the form or template according to the instructions
                provided. Important! The File Format Must be Excel (.xlsx)
              </p>

              <br></br>
              <div className="box-content h-32 w-34 p-4 border-4 rounded-lg items-center flex text-ellipsis overflow-hidden">
                <label
                  for="file_upload"
                  className="cursor-pointer custom-file-upload"
                >
                  <div className="flex-1 px-6 py-4 m-14">
                    <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                      <MdUpload size={25} />
                      <span>Upload File</span>
                    </div>
                    <input
                      id="file_upload"
                      type="file"
                      className="hidden"
                      accept=".xlsx"
                      onChange={fileHandler}
                    />
                    {images ? (
                      <p className="text-thin text-gray-400">{images.name}</p>
                    ) : (
                      <p className="text-thin text-gray-400"></p>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 text-center">
          <button
            className="text-2xl py-2 border bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-1/3 text-white uppercase"
            name="upload_file"
            id="upload_file"
            onClick={() => {
              addProductbulkHandler();
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProductBulky;
