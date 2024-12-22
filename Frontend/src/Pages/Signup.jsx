import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = ({ setActiveTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      console.log(res.data);
      if (res.data) {
        alert("Signup successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        alert("Error: " + err.response.data.message);
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