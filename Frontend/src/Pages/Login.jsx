import { useForm } from "react-hook-form";
import axios from "axios";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const UserInfo={
      email:data.email,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user/login",UserInfo)
    .then((response)=>{
      console.log(response.data);
      if(response.data){
        alert("Logged in successfully!");
      }
    })
    .catch((error)=>{
      if(error.response){
        console.log(error);
        alert("Error: " + error.response.data.message);
      }
    })
   
    // Perform login logic here, such as sending data to an API
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
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
      </div>
    </div>
  );
};

export default Login;
