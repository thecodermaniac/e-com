// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import closeIcon from "../assets/close.png";
import signupimg from "../assets/logo_vector.svg";
import eye from "../assets/view.png";
import eyeClosed from "../assets/hide.png";
import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

// eslint-disable-next-line react/prop-types
const Login = ({ setmodal }) => {
  const dispatch = useAppDispatch();
  const [show, setshow] = useState(true);
  const [existUser, setExistUser] = useState({
    name: "",
    password: "",
  });
  const handleToggle = () => {
    setshow((prev) => !prev);
  };
  async function handleLogin() {
    const username = existUser.name;
    const password = existUser.password;
    await dispatch(login({ username, password }));
  }
  return (
    <div className="flex flex-col  relative">
      <img
        src={closeIcon}
        className="absolute top-[-10px] right-[-10px] md:right-4 md:top-0 text-3xl cursor-pointer w-6"
        onClick={() => {
          setmodal((prev) => !prev);
        }}
      />
      <div className="flex mr-2 text-3xl  font-[580] text-gray-700 font-[Montserrat] md:hidden">
        Welcome Back !!
      </div>
      <div className="md:flex justify-center hidden">
        <img src={signupimg} alt={"sign up"} className="h-32" />
      </div>
      <label className="font-[600] text-grayText tracking-[0.15em]">
        UserName
      </label>
      <input
        type="text"
        className="border-2 px-2 rounded-md bg-slate-200 mt-2 p-1 py-2"
        onChange={(e) => {
          setExistUser({ ...existUser, name: e.target.value });
        }}
      />
      <label className="font-[600] text-grayText tracking-[0.15em]">
        Password
      </label>
      <div className="relative">
        {!show && (
          <img
            className="absolute top-5 right-1 w-5"
            src={eye}
            onClick={handleToggle}
          />
        )}
        {show && (
          <img
            className="absolute top-5 right-1 w-5"
            src={eyeClosed}
            onClick={handleToggle}
          />
        )}
        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          className="border-2 rounded-md bg-slate-200 mt-2 w-[100%] p-1 py-2"
          onChange={(e) => {
            setExistUser({ ...existUser, password: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-center">
        <button
          className=" flex px-10 justify-center py-2 mt-3 rounded-md w-full bg-mainColor items-center text-white drop-shadow-2xl font-[550]"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
