import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl text-white font-extrabold py-4 shadow-md mt-20">
        {activeTab === "login" && "Login"}
        {activeTab === "signup" && "Sign Up"}
      </div>

      {/* Tabs for switching between forms */}
      <div className="min-h-screen flex justify-center items-start pt-0 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
          <div className="tabs mb-4 flex justify-center">
            <button
              onClick={() => handleTabClick("login")}
              className={`tab tab-bordered w-1/2 ${
                activeTab === "login" ? "tab-active" : ""
              }`}
            >
              Login
            </button>

            <button
              onClick={() => handleTabClick("signup")}
              className={`tab tab-bordered w-1/2 ${
                activeTab === "signup" ? "tab-active" : ""
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Render the Login or Signup component */}
          <div>{activeTab === "login" ? <Login /> : <Signup />}</div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
