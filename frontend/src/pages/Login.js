import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Swal from "sweetalert2";

function Login() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      if (localStorage.getItem("type") === "user") {
        Swal.fire("Login Success!", "Welcome!", "success");
        navigate("/user/home");
      } else if (localStorage.getItem("type") === "cms") {
        Swal.fire("Login Success!", "Logged in as Admin", "success");
        navigate("/cms/dashboard");
      }
    }
  }, [data]);

  const loginHandler = () => {
    dispatch(login(form));
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="lg:w-[500px] md:w-3/5 sm:w-96 bg-midColor rounded-md">
        <div className="p-10">
          <div className="py-4 text-2xl font-bold text-white text-center">
            Login
          </div>
          <hr className="border-white mx-5 mb-4" />

          <div className="px-5 py-2">
            <label className="block text-white text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="border hover:border-green-800 focus:border-white p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-white text-lg font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="border hover:border-green-800 focus:border-white p-2 rounded-md bg-white w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-6">
            <button
              className="text-2xl py-2 border text-white uppercase bg-midColor hover:bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
              onClick={() => loginHandler()}
            >
              Login
            </button>

            <h1 className="text-md mt-5 text-center text-white">
              Doesn't have an account ?{" "}
              <div className="flex justify-between mt-3">
                <button
                  className="font-bold text-white hover:text-lightColor"
                  onClick={() => navigate("/registerUser")}
                >
                  Register User
                </button>
                <button
                  className="font-bold text-white hover:text-lightColor"
                  onClick={() => navigate("/registerCMS")}
                >
                  Register Admin
                </button>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
