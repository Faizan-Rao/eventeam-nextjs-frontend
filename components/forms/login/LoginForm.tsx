"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Auth } from "@/configs/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { joiResolver } from "@hookform/resolvers/joi";
import joi from "joi";
import { Loader2 } from "lucide-react";
const schema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().min(5).required(),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (values, context, options) => {
      const resolver = joiResolver(schema, {
        context: context,
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, context, options);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setPending(true)
      const response = await Auth.login(data);
     
      const user = {
        token: response.data.data["token"],
        ...response.data.data["user"],
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("recent-login", "1");
      toast("Login Successful", { type: "success" });
      window.location.replace("/dashboard");
      setPending(false)
    } catch (error) {
      if ((error as any).status !== 200) {
         
                   toast((error as any)?.response?.data.message, { type: "error" })
                
             
      }
    
      setPending(false)
  };
  }
  return (
    <div className=" flex flex-col justify-center items-center  md:min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-full md:w-[60%]  px-4 pt-4 justify-center flex flex-col gap-4 "
      >
        <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] sm:text-3xl md:text-4xl font-bold">
          Sign In
        </h1>

        <div className="flex flex-col gap-4 flex-1">
          <div className=" flex flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Email</span>
            {/* Login Input */}
            <input
              className="p-2 outline-[#7655fa] border-[2px] rounded-md"
              placeholder="Enter Email"
              type="text"
              {...register("email", { required: true, minLength: 5 })}
            />
            {/* Error Message */}
            {errors.email && (
              <span className="text-red-700">Email is Required</span>
            )}
          </div>
          <div className=" flex flex-col flex-1 gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">
              Password
            </span>
            <input
              className="p-2 outline-[#7655fa] border-[2px] rounded-md"
              placeholder="Enter password"
              type="password"
              {...register("password", { required: true, minLength: 5 })}
            />
            {errors.password && (
              <span className="text-red-700">Password is Required</span>
            )}
          </div>
          <a href="/forget-password" className="text-[#7655fa] ">Forgot Password?</a>
        </div>

        <button disabled={isPending} className="px-4 py-2 flex justify-center items-center gap-4 active:scale-[0.98] disabled:bg-[#999999] transition-all bg-[#7655fa] font-semibold text-white rounded-full">
          {" "}
         {isPending && <Loader2 className="animate-spin h-5 w-5"/>} Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
