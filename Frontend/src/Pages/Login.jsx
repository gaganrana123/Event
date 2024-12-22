import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const UserInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/login", UserInfo)
      .then((response) => {
        const userRole = response.data.user.role; // role_Name from the backend
        console.log(response.data);
        if (response.data) {
          alert("Logged in successfully!");
          // Redirect based on role_Name
          switch (userRole) {
            case "Admin":
              navigate("/admindb");
              break;
            case "Organizer":
              navigate("/orgdb");
              break;
            case "User":
              navigate("/userdb");
              break;
            default:
              alert("Unknown role! Please contact support.");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          alert("Error: " + error.response.data.message);
        }
      });
  };

  return (
    <div className="min-h-scree flex justify-items-start bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-96 p-6">
        <h1 className="text-lg font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
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
