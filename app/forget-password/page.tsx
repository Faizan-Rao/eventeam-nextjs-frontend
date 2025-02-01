"use client"

import Image from "next/image";

import React, { useState } from "react";
import { joiResolver } from "@hookform/resolvers/joi";

import { useForm } from "react-hook-form";
import { Profile } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import EditSecurityForm from "@/components/forms/edit-security-info/EditSecurityInfo";
import joi from 'joi'


const schema = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required().label("Email"),
   
  })
  .required();
const ForgetPasswordPage = () => {
  const [userData, setUserData] = useState<any>();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "" ,
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(schema, {
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, constext, options);
    },
  });

  console.log("forget password errors",errors)
  const onSubmit = async (data: any) => {
    try {
      if (data !== undefined) {
        const response = await Profile.CheckAccount(data);
        if(response.data.success)
        {
          setUserData(data)
          toast(response.data.message, { type: "success" })
        }
        
      }
    } catch (error) {
      toast((error as any).response.data.message, { type: "error" });
    }
  };
  return (
    <div className="relative overflow-hidden min-h-[98vh] h-full flex flex-col md:justify-center items-center">
      <div className="md:hidden sm:flex justify-center items-center gap-2  my-8">
        <Image
          src={"/logo.svg"}
          className={
            "sm:w-[3.2em] sm:h-[3.2em] md:w-[3.2em] md:h-[3.2em] z-[1]"
          }
          height={200}
          width={200}
          alt="office-manage"
        />
        <h1 className="text-xl font-semibold">EvenTeam</h1>
      </div>

      <div className="bg-[#7655fa] absolute rounded-full w-[200vw] h-[200vw] md:bottom-[30vw] sm:-bottom-[179vw]   -left-[50vw] -z-index-[1] aspect-square overflow-hidden" />
     { userData === undefined && <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 shadow-md justify-self-center  sm:px-4 z-[1] sm:min-w-[80vw] md:min-w-[60vw]  sm:py-6 md:p-10 rounded-md bg-white "
      >
        <h1 className="text-[#4a4a4a] text-2xl text-center font-semibold">
          Forget Password
        </h1>

        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">Email</span>
          <input
            type="email"
            placeholder="Enter Your Email Here"
            className="text-[#4a4a4a] text-base flex-1  p-2 border-[2px] outline-none rounded-md"
            {...register("email", { required: true , })}
          />
          {errors?.email && (
            <span className="text-red-800">{`${errors?.email.message}`}</span>
          )}
        </div>

        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full"
          >
            {" "}
            Find Account
          </button>
        </div>
      </form>}
    {
        userData && <EditSecurityForm email={userData.email} formName={"Change Password"}/>
    }
      <div className="sm:hidden md:flex justify-start items-center gap-2  my-8">
        <Image
          src={"/logo.svg"}
          className={
            "sm:w-[3.2em] sm:h-[3.2em] md:w-[3.2em] md:h-[3.2em] z-[1]"
          }
          height={200}
          width={200}
          alt="office-manage"
        />
        <h1 className="text-xl font-semibold">EvenTeam</h1>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
