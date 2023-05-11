 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleForm = (e) => {
    e.preventDefault();

  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <form
        className="flex flex-col bg-white rounded shadow-lg p-8"
        onSubmit={handleForm}
      >
        <img
          className="rounded-lg w-2/4 h-auto mx-auto mb-2"
          src="https://static.wixstatic.com/media/6caf63_a83a2388007e4bec8f789dfe7818db84~mv2.jpg/v1/crop/x_0,y_53,w_1000,h_395/fill/w_230,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/CUSTOM%20-%20Rectangle%20(22).jpg"
          alt="smashmath logo"
        />
        <div className="flex justify-between mx-4 my-3">
          <button
            type="button"
            className="text-white bg-[#17026b] hover:bg-[#a8a2c1] focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none hover:cursor-pointer"
            onClick={() => navigate("/school-dashboard")}
          >
            School
          </button>
          <button
            type="button"
            className="text-white bg-[#17026b] hover:bg-[#a8a2c1] focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none hover:cursor-pointer"
            onClick={() => navigate("/parent-dashboard")}
          >
            Parent
          </button>
        </div>

        <label className="font-semibold text-xs" htmlFor="fullname">
          Full Name
        </label>
        <input
          className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 placeholder:text-sm"
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="font-semibold text-xs" htmlFor="email">
          Email
        </label>
        <input
          className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 placeholder:text-sm"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xs" htmlFor="password">
          password
        </label>
        <input
          className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 placeholder:text-sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="font-semibold text-xs mt-3" htmlFor="confirmPassword">
          confirm Password
        </label>
        <input
          className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 placeholder:text-sm"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="flex items-center justify-center bg-[#17026b] hover:bg-[#a8a2c1] h-10 px-6 w-64 bg- mt-8 rounded-sm font-semibold text-sm text-white "
          type="submit"
        >
          Sign Up
        </button>
        <div className="flex mt-6 justify-center text-xs">
        <span className="mx-2 text-[#181717] font-medium">Already have an account?</span>
          <Link className="text-[#17026b] font-bold" to="/login">
        Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
