'use client'
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from "@/configs/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup.object({
  full_name: yup.string().min(5).required(),
  phone: yup.string().min(5).required(),
  regemail: yup.string().email().required(),
  regpassword: yup.string().min(5).required(),
  confirm_password: yup.string().min(5).required(),
}).required();

const SignupForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data : any) => {
    
    try {
      console.log(data)

      if(data['confirm_password'] !== data['password'])
      {
          toast("Password Missmatched", {type: "warning"})
          throw new Error("Password Missmatched")
      }
      const response = await Auth.signup(data)
      console.log(response)
      const user = {
        token : response.data.data["token"],
        ...response.data.data['user']
      }
      localStorage.setItem('user', JSON.stringify(user))
      toast("Signup Successful", {type: "success"})
      router.replace('/dashboard')

    } catch (error) {
      console.log(error)
      toast("Signup Failed", {type: "error"})
    }
  }

  return (
    <div className="flex flex-col justify-center items-center   min-h-[90vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-4 gap-4 ">
      <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] text-4xl font-bold">Sign Up Now</h1>

        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Company Name
          </span>
          <input
            type="text"
            placeholder="Company Name"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("full_name", {required : true, minLength: 5})}
            />
          {errors.full_name && <span className="text-red-700">Name is Required</span>}
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Email</span>
            <input
              type="text"
              placeholder="Email"
              className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
              {...register("regemail", {required : true, minLength: 5})}
            />
            {errors.regemail && <span className="text-red-700">Email is Required</span>}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Phone</span>
            <input
              type="text"
              placeholder="Phone"
              className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
              {...register("phone", {required : true, minLength: 5})}
            />
            {errors.phone && <span className="text-red-700">Phone is Required</span>}
          </div>
        </div>

      
        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">Password</span>
          <input
            type="password"
            placeholder="Password"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("regpassword", {required : true, minLength: 5})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">Confirm Password</span>
          <input
            type="password"
            placeholder="Password"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("confirm_password", {required : true, minLength: 5})}
            />
            {errors.confirm_password && <span className="text-red-700">Confirm Password is Required</span>}
        </div>
    
          <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
            {" "}
            Sign Up
          </button>
        
      </form>
    </div>
  );
};

export default SignupForm;
