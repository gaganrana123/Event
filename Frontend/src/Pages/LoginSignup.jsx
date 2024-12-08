import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("User"); // Role state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Logs the form data
  };

  return (
    <>
      {/* Top Bar */}
      <div className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl text-white font-extrabold py-4 shadow-md mt-20">
        {activeTab === "login" && "Login"}
        {activeTab === "signup" && "Sign Up"}
      </div>

      {/* Form Container */}
      <div className="min-h-screen flex justify-center items-start pt-0 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
          {/* Tabs for switching between forms */}
          <div className="tabs mb-4 flex justify-center">
            <button
              onClick={() => handleTabClick("login")}
              className={`tab tab-bordered w-1/2 ${
                activeTab === "login" ? "tab-active" : ""
              }`}
            >
              <label className="block text-sm font-medium hover:text-blue-500 hover:font-bold">
                Login
              </label>
            </button>

            <button
              onClick={() => handleTabClick("signup")}
              className={`tab tab-bordered w-1/2 ${
                activeTab === "signup" ? "tab-active" : ""
              }`}
            >
              <label className="block text-sm font-medium hover:text-blue-500 hover:font-bold">
                Sign Up
              </label>
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>
              <button className="btn btn-primary w-full">Login</button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium"
                >
                  {role === "User" ? "Full Name" : "Organizer Name"}
                </label>
                <input
                  id="fullname"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder={role === "User" ? "Enter your full name" : "Enter your organization name"}
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">
                    {role === "User" ? "Full Name is required" : "Organizer Name is required"}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Create a password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  className="input input-bordered w-full"
                  {...register("role")}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Organizer">Organizer</option>
                </select>
              </div>

              {/* Additional Fields Based on Role */}
              {role === "User" && (
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium"
                  >
                    Contact Number
                  </label>
                  <input
                    id="contact"
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter your contact number"
                    {...register("contact", { required: true })}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm">Contact is required</p>
                  )}
                </div>
              )}

              {role === "Organizer" && (
                <>
                  <div>
                    <label
                      htmlFor="organizationAddress"
                      className="block text-sm font-medium"
                    >
                      Organization Address
                    </label>
                    <input
                      id="organizationAddress"
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter your organization address"
                      {...register("organizationAddress", { required: true })}
                    />
                    {errors.organizationAddress && (
                      <p className="text-red-500 text-sm">
                        Organization Address is required
                      </p>
                    )}
                  </div>
                </>
              )}

              <button className="btn btn-primary w-full">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
