import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkAuthAndRedirect = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      switch (role) {
        case "Admin":
          return <Navigate to="/admindb" replace />;
        case "Organizer":
          return <Navigate to="/orgdb" replace />;
        case "User":
          return <Navigate to="/userdb" replace />;
        default:
          return null;
      }
    }
    return null;
  };

  const onSubmit = async (data) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const response = await api.post("/users/login", loginData);
      console.log("Login Response:", response.data);

      const { message, token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        if (user.role === "Admin") {
          window.location.href = "/admindb";
        } else if (user.role === "Organizer") {
          window.location.href = "/orgdb";
        } else if (user.role === "User") {
          window.location.href = "/userdb";
        } else {
          alert("Invalid user role");
        }
      } else {
        alert(message || "Login failed: Invalid response data");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  const authRedirect = checkAuthAndRedirect();
  if (authRedirect) return authRedirect;

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-10">
      <div className="bg-white shadow-md rounded-lg w-96 p-6">
        <h1 className="text-lg font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>
          <button className="bg-blue-500 text-white rounded px-4 py-2 w-full text-sm hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
