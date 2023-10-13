import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CustomLoader } from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedButton, setSelectedButton] = useState("School");
  const [showPassword, setShowPassword] = useState(false);
  // const API_URL = 'https://api-dashboard-brr3fliswa-uc.a.run.app'
  const TestURL = "https://dev-api-dashboard-brr3fliswa-uc.a.run.app/api"
  const [loading, setLoading] = useState(false)


  const handleForm = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields must be filled");
    } else
      // if (password.length < 8 || password.length > 12 ) {
      //   toast.error("Password must be 8-12 characters long");
      // } else 
      if (!selectedButton) {
        toast.error("Please select either 'School' or 'Parent'");
      } else {
        // Here's an example of how you can check the dummy data
        // if (email === "abc@example.com" || password === "password123" || true) {
        setLoading(true)
        loginService()
        // } else {
        // toast.error("Invalid email or password");
        // }
      }
  };
  
  const loginService = () => {
    try {
      fetch(TestURL + '/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ "email": email, "password": password })
      })
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        if (response.data[1] != 200) {
          toast.error(response.data[0]?.error)
          return
        }

        toast.success("Login successful");
        localStorage.setItem('userEmail', email)
        localStorage.setItem('Status', response.data[0]?.Payment_Status)
        localStorage.setItem('token', response.data[0]?.jwt_token)
        if (selectedButton === "School") {
          navigate("/school-dashboard");
        } else {
          navigate("/parent-dashboard");
        }
      })
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      {loading && <CustomLoader />}
      <form
        className="flex flex-col bg-white rounded shadow-lg p-8"
        onSubmit={handleForm}
      >
        <img
          className="rounded-lg w-2/4 h-auto mx-auto mb-2"
          src="https://static.wixstatic.com/media/6caf63_a83a2388007e4bec8f789dfe7818db84~mv2.jpg/v1/crop/x_0,y_53,w_1000,h_395/fill/w_230,h_91,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/CUSTOM%20-%20Rectangle%20(22).jpg"
          alt="smashmath logo"
        />

        <div className="flex mt-6 -justify-center text-xs ">
          {/* <Link className="text-[#17026b] font-bold" style={{maxWidth: '15rem'}} to="#">
          If you are a teacher using SMASH Maths at School,If you are a teacher using SMASH Maths at School,If you are a teacher using SMASH Maths at School,If you are a teacher using SMASH Maths at School,
          </Link> */}
          <span className="mx-2 -text-gray-300" style={{maxWidth: '20rem'}}>If you are a teacher using SMASH Maths at School, choose School. If you are a
parent using SMASH Maths at Home, choose Parent</span>
          {/* <span className="mx-2 text-gray-300">If you are a teacher using SMASH Maths at School, </span>
<span className="mx-2 text-gray-300">choose School. If you are a parent using SMASH Maths</span>
<span className="mx-2 text-gray-300"> at Home, choose Parent</span> */}
          {/* <Link className="text-[#17026b] font-bold" to="/sign-up">
            Sign Up
          </Link> */}
        </div>

        <div className="flex justify-between border border-[#17026b] my-6 gap-1">
          <button
            type="button"
            className={`${selectedButton === "School" && 'bg-[#17026b] text-white'}  flex-1  focus:ring-blue-300 font-medium text-sm px-5 py-2.5 focus:outline-none hover:cursor-pointer`}
            onClick={() => setSelectedButton("School")}
          >
            School
          </button>
          <button
            type="button"
            className={`${selectedButton === "Parent" && 'bg-[#17026b] text-white'} flex-1 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 focus:outline-none hover:cursor-pointer`}
            onClick={() => setSelectedButton("Parent")}
          >
            Parent
          </button>
        </div>

        <label className="font-semibold text-xs" htmlFor="email">
          Email
        </label>
        <input
          className="flex items-center h-10 px-4 w-full bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 placeholder:text-sm"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <div className="relative flex items-center h-10 px-4 w-full bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2">
          <input
            className="flex-1 placeholder:text-sm focus:outline-none bg-inherit"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-0 mr-2 focus:outline-none "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.6 17.6a8 8 0 10-11.2-11.2"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          className="flex items-center justify-center bg-[#17026b] hover:bg-[#a8a2c1] h-10 px-6 w-full bg- mt-8 rounded-sm font-semibold text-sm text-white "
          type="submit"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          {/* <Link className="text-[#17026b] font-bold" to="#">
            Forgot Password
          </Link> */}
          {/* <span className="mx-2 text-gray-300">/</span> */}
          {/* <Link className="text-[#17026b] font-bold" to="/sign-up">
            Sign Up
          </Link> */}
        </div>
      </form>
    </div>
  );
};

export default Login;