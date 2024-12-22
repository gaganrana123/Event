import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      {/* Top Bar */}
      <div className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl text-white font-extrabold py-4 shadow-md mt-20">
        {activeTab === "login" && "Login"}
        {activeTab === "signup" && "Sign Up"}
      </div>

      {/* Tabs for switching between forms */}
      <div className="min-h-screen flex justify-center items-start pt-0 bg-gray-100">
        <div className="rounded-lg w-full max-w-md p-6">
          {/* Green Layered Buttons for Tab Switch */}
          <div className="mb-4 flex justify-center bg-green-400 p-1 rounded-full">
            <button
              onClick={() => setActiveTab("login")}
              className={`font-bold w-1/2 text-white py-1 px-4 rounded-full ${
                activeTab === "login" ? "bg-green-600" : "bg-green-400"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveTab("signup")}
              className={`font-bold w-1/2 text-white py-1 px-4 rounded-full ${
                activeTab === "signup" ? "bg-green-600" : "bg-green-400"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Render the Login or Signup component */}
          <div>
            {activeTab === "login" ? (
              <Login setActiveTab={setActiveTab} />
            ) : (
              <Signup setActiveTab={setActiveTab} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;