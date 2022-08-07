import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import { MdAddAPhoto } from "react-icons/md";
import Swal from "sweetalert2";

function RegisterCMS() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    avatar: null,
  });

  const registerHandler = () => {
    if (form.password === form.confirmPass) {
      let formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("avatar", form.avatar);
      formData.append("type", "cms");
      dispatch(register(formData));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and Confirm Password must be same",
      });
    }
  };

  useEffect(() => {
    if (action === "REGISTER" && status === "data") {
      navigate("/login");
    }
  }, [data, dispatch]);

  return (
    <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-96 rounded-md">
      <div className="p-14">
        <div className="py-4 text-3xl font-bold text-darkColor text-center 3xl:mt-12 3xl:mb-8">
          Register Admin
          <hr className="border-midColor mx-5 mt-2" />
        </div>
        <div className="px-5 py-5">
          <div className="mx-auto my-5 w-40 h-40 bg-white border-4 border-midColor relative rounded-full flex justify-center items-center">
            <label
              className="cursor-pointer custom-file-upload"
              htmlFor="file-upload"
            >
              <img
                className="mx-auto object-cover w-36 h-36 rounded-full"
                src={
                  form.avatar
                    ? URL.createObjectURL(form.avatar)
                    : "assets/images/admin2.png"
                }
                alt="Profile Picture"
              />
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="image"
              accept="image"
              onChange={(e) => {
                setForm({ ...form, avatar: e.target.files[0] });
              }}
            />
            <div className=" bg-midColor rounded-full absolute top-0 right-0 px-2 py-2">
              <div className="text-2xl text-white">
                <MdAddAPhoto />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="px-5 py-2">
            <label className="block text-midColor text-lg font-bold pb-2">
              Username
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-midColor text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-midColor text-lg font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-midColor text-lg font-bold pb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="border hover:border-green-800 focus:border-midColor p-2 rounded-md bg-white w-full"
              onChange={(e) =>
                setForm({ ...form, confirmPass: e.target.value })
              }
            ></input>
          </div>
        </div>
        <div className="px-5 py-8 mt-3">
          <button
            className="text-2xl py-2 border text-white bg-midColor hover:bg-darkColor p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => registerHandler()}
          >
            Register
          </button>
          <h1 className="text-md mt-3 text-midColor text-center">
            Have an account ?{" "}
            <button
              className="font-bold text-lightColor hover:text-darkColor"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RegisterCMS;
