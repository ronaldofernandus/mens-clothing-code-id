import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos, MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBannerDetails, editBanner, clear } from "../../actions/miscActions";
import base_url from "../../helpers/base_url";

const EditBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const url = base_url;
  const { action, status, data } = useSelector((state) => state.miscReducer);

  const [form, setForm] = useState({
    filename: null,
    fileType: "image/jpg",
    body: "",
    active: false,
  });
  const [imageIsUploaded, setImageIsUploaded] = useState(false);

  const editBannerHandler = () => {
    let formData = new FormData();
    formData.append("filename", form.filename);
    formData.append("fileType", form.fileType);
    formData.append("body", form.body);
    formData.append("active", form.active);
    dispatch(editBanner(id, formData));
  };

  useEffect(() => {
    dispatch(getBannerDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (action === "GET_BANNER_DETAILS" && status === "data") {
      setForm({
        filename: data.filename,
        fileType: data.fileType,
        body: data.body,
        active: data.active,
      });
    } else if (action === "EDIT_BANNER" && status === "data") {
      dispatch(clear()).then(() => {
        navigate(`/cms/banner`);
      });
    }
  }, [data, dispatch]);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 min-h-screen py-5 no-scrollbar">
      <div>
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
          <h1 className="pl-5">Edit Banner</h1>
        </div>
        <hr className="border-cyan-800 mx-5" />
        {data.filename !== undefined && imageIsUploaded === false ? (
          <div className="px-5 py-5">
            <label
              className="cursor-pointer custom-file-upload"
              htmlFor="file-upload"
            >
              <img
                className="mx-auto object-cover w-screen"
                src={
                  form.filename
                    ? url + "/images/" + data.filename
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="Flower and sky"
              />
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="image"
              accept="image"
              onChange={(e) => {
                setForm({ ...form, filename: e.target.files[0] });
                setImageIsUploaded(true);
              }}
            />
          </div>
        ) : form.filename !== undefined && imageIsUploaded === true ? (
          <div className="px-5 py-5">
            <label
              className="cursor-pointer custom-file-upload"
              htmlFor="file-upload"
            >
              <img
                className="mx-auto object-cover w-screen"
                src={
                  form.filename
                    ? URL.createObjectURL(form.filename)
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="Flower and sky"
              />
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="image"
              accept="image"
              onChange={(e) => {
                setForm({ ...form, filename: e.target.files[0] });
              }}
            />
          </div>
        ) : (
          console.log(imageIsUploaded, form.filename)
        )}

        <div className="py-2">
          <div className="px-5 py-2">
            <label className="block text-midColor text-lg font-bold pb-2">
              Banner Message
            </label>
          </div>
          <div className="px-5 py-2 col-span-2">
            <textarea
              type="text"
              rows={5}
              className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            ></textarea>
          </div>
          <div className="flex py-2">
            <label className="block text-midColor text-lg font-bold px-4">
              Activate Banner ?
            </label>
            <label
              for="default-toggle"
              class="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={form.active}
                id="default-toggle"
                className="sr-only peer"
                onChange={(e) => setForm({ ...form, active: !form.active })}
              />
              <div className="w-11 h-6 mb-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-700"></div>
            </label>
          </div>
          <div className="px-5 py-5 text-center">
            <button
              className="text-2xl py-2 border bg-midColor hover:bg-darkColor p-2 rounded-md w-1/3 text-white uppercase"
              name="condition"
              id="condition"
              onClick={editBannerHandler}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
