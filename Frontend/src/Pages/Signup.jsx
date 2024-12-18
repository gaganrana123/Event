import { useForm } from "react-hook-form";
import axios from "axios";
// import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';// import Login from "./components/Login.jsx";

const Signup = () => {
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
    }
    await axios.post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert('Signup successfully');

          localStorage.setItem("Users", JSON.stringify(res.data.user));

        }

      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          alert("Error: " + err.response.data.message);
        }

      })
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your full name"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">Full Name is required</p>
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
              {...register("role", { required: true })}
            >
              <option value="User">User</option>
              <option value="Organizer">Organizer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">Role is required</p>
            )}
          </div>
          <button className="btn btn-primary w-full">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
