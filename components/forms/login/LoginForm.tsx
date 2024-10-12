"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from "@/configs/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
}).required();

const LoginForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data : any) => {
    
    try {
      const response = await Auth.login(data)
      const user = {
        token : response.data.data["token"],
        ...response.data.data['user']
      }
      localStorage.setItem('user', JSON.stringify(user))
      toast("Login Successful", {type: "success"})
      router.replace('/dashboard')

    } catch (error) {
      console.log(error)
      toast("Login Failed", {type: "error"})
    }
  }

  return (
   
    <div className=" flex flex-col justify-center items-center   min-h-[90vh] ">
      <form onSubmit={handleSubmit(onSubmit)} className="min-w-[400px] p-4 justify-center flex flex-col gap-4 ">
        <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] text-4xl font-bold">Sign In</h1>

        <div className="flex flex-col gap-4">
          <div className=" flex flex-col">
            <span className="text-[#4a4a4a]  font-semibold">Email</span>
            {/* Login Input */}
            <input className="p-2 outline-[#7655fa] border-[2px] rounded-md" placeholder="Enter Email" type="text" {...register("email", {required : true, minLength: 5})} />
            {/* Error Message */}
            {errors.email && <span className="text-red-700">Email is Required</span>}

          </div>
          <div className=" flex flex-col">
            <span className="text-[#4a4a4a]  font-semibold">Password</span>
            <input className="p-2 outline-[#7655fa] border-[2px] rounded-md" placeholder="Enter password" type="password" {...register("password", {required : true, minLength: 5})} />
            {errors.password && <span className="text-red-700">Password is Required</span>}
          </div>
          <p className="text-[#7655fa]">Forgot Password?</p>
        </div>

        <button className="px-4 my-4 py-2 bg-[#7655fa] font-semibold rounded-full text-white">Sign In</button>
      </form>
    </div>
    
  );
};

export default LoginForm;
