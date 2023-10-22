import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../lib/types";
import { Link,Router } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ThemeBar from "../components/ThemeBar";




const Signup = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  const onSubmit = async (data: TSignUpSchema) => {
    await axios.post('http://localhost:8000/auth/signup',{
        name:data.name,
        email:data.email,
        password:data.password
    },{withCredentials:true});
    toast('User Created Successfully, redirecting you to login page')
    reset();
    setTimeout(()=>{
      window.location.href = '/login';
    },3000)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center dark:bg-[url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]  duration-150">
    <ThemeBar/>
    <div className="bg-white dark:dark:bg-slate-800 p-16 rounded shadow-md  sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-2/5">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800 dark:text-white">Create your account</h2>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-1 font-bold text-gray-500 dark:text-white">Full Name</label>
        <input
          {...register("name")}
          type="text"
          className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
        />
        {errors.name && (
          <p className="text-red-500 mt-1">{`${errors.name.message}`}</p>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="block mb-1 font-bold text-gray-500 dark:text-white">Email Address</label>
        <input
          {...register("email")}
          type="email"
          className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{`${errors.email.message}`}</p>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="block mb-1 font-bold text-gray-500 dark:text-white">Password</label>
        <input
          {...register("password")}
          type="password"
          className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{`${errors.password.message}`}</p>
        )}
      </div>
      <button
        className="block w-full disabled:bg-gray-600 bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
        disabled={isSubmitting}
        type="submit"
      >
        Signup
      </button>
    </form>
    <p className="dark:text-white text-right my-2">Already have an account?  <Link className="underline font-semibold" to={'/login'}>login here</Link></p>
    </div>
    </div>
  );
};

export default Signup;
