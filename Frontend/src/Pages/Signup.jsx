import { useForm } from "react-hook-form";
import api from '../utils/api';

const Signup = ({ setActiveTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare userInfo from form data
      const userInfo = {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        role: data.role
      };

      // Make API request to sign up user
      const response = await api.post('/users/signup', userInfo);

      // Log response for debugging
      console.log("Signup Response:", response.data);

      const { message, user } = response.data;

      if (user) {
        // Show success message
        alert(message || "Signup successful! Please login.");
        
        // Switch to login tab after successful signup
        setActiveTab("login");
      } else {
        alert("Signup failed: Invalid response data");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      
      // Improved error handling
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="fullname"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            placeholder="Enter full name"
            {...register("fullname", { required: "Full name is required" })}
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
            placeholder="Create a password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role
          </label>
          <select
            id="role"
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            {...register("role", { required: "Role is required" })}
          >
            <option value="User">User</option>
            <option value="Organizer">Organizer</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 w-full text-sm hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <p>
          Already have an account?{" "}
          <button
            onClick={() => setActiveTab("login")}
            className="text-blue-500 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
