import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { TLoginShema, loginSchema } from "../lib/types";
import ThemeBar from "../components/ThemeBar";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [error,setError] = useState("")
  const {
    register,
    reset,
    handleSubmit,
    formState: {isSubmitting },
  } = useForm<TLoginShema>({ resolver: zodResolver(loginSchema) });
  const onSubmit=async(data:TLoginShema)=>{
    try {
      const response:any = await axios.post('http://localhost:8000/auth/login',{
      email:data.email,
      password:data.password
    },{withCredentials:true})
    
    const {token,user} = response.data;
    if(token){
      window.location.href='/dashboard';
    }
    reset();
    } catch (error:any) {
      setError(error.message)
      toast("Incorrect email or Password!!")
    }
   


  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center dark:bg-[url('https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]  duration-150">
    <ThemeBar/>
    <div className="bg-white dark:dark:bg-slate-800 p-16 rounded shadow-md sm:w-5/6 md:w-4/5 lg:w-2/3 xl:w-2/5">
      <h2 className="text-center text-3xl font-bold mb-10 dark:text-white text-gray-800">
        Login to your account
      </h2>
      <form
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5">
        <div>
          <label className="block mb-1 font-bold text-gray-500 dark:text-white">
            email
          </label>
          <input
          {...register("email")}
            type="email"
            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
          />
        </div>
        <div> 
          <label className="block mb-1 font-bold text-gray-500 dark:text-white">
            password
          </label>
          <input
          {...register("password")}
            type="password"
            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="agree" />
          <label
            htmlFor="agree"
            className="ml-2 dark:text-white text-gray-700 text-sm"
          >
            I agree to the terms and privacy.
          </label>
        </div>
        <button  disabled={isSubmitting} className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300">
          Login
        </button>
      </form>
      <p className="dark:text-white text-right my-2">
        Not registered yet?
        <Link className="underline font-semibold" to={"/"}>
          Sign up here
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
