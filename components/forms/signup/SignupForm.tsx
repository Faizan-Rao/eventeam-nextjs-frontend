"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Auth } from "@/configs/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { stat } from "fs";
import { Loader2 } from "lucide-react";

const schema = joi
  .object({
    full_name: joi.string().min(5).required().label("Full Name"),
    phone: joi.string().min(5).required().label("Phone"),
    regemail: joi
      .string()
      .email({ tlds: { allow: false } })
      .required().label("Email"),
    regpassword: joi.string().min(5).required().label("Password"),
    confirm_password: joi.string().min(5).custom((value, helpers)=>{
      const {regpassword} = helpers.state.ancestors[0]
      if(regpassword !== value)
      {
        return helpers.message("Password Missmatched" as any)
      }
      return value
    }).required().label("Confirm Password"),
  })
  .required();

const SignupForm = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const {
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
    reValidateMode: "onChange",
  });
  useEffect(() => {
    setTimeout(() => setPending(false), 10000);
  }, [isPending]);
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      setPending(true);
      // if (data["confirm_password"] !== data["regpassword"]) {
      //   toast("Password Missmatched", { type: "warning" });
      //   return
      // }
      const response = await Auth.signup(data);

      const user = {
        token: response.data.data["token"],
        ...response.data.data["user"],
      };
      localStorage.setItem("user", JSON.stringify(user));
      toast("Signup Successful", { type: "success" });
      if(!response.data.data.is_active)
        {
          window.location.replace("/pending-approval");
          return 
        }
        
        window.location.replace("/dashboard");
      setPending(false);
    } catch (error) {
      if ((error as any).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
      }
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-auto  overflow-y-auto    md:min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-full md:w-[60%]   p-4 justify-center flex flex-col gap-4 "
      >
        <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] sm:text-3xl md:text-4xl font-bold">
          Sign Up Now
        </h1>

        <div className="flex flex-1 flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Company Name
          </span>
          <input
            type="text"
            placeholder="Company Name"
            className="text-[#4a4a4a] flex-1 text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("full_name", { required: true, minLength: 5 })}
          />
          {errors?.full_name && (
            <span className="text-red-700">{`${errors.full_name.message}`}</span>
          )}
        </div>

        <div className="flex flex-1 sm:flex-col md:flex-row flex-wrap w-full gap-1">
          <div className="flex flex-1  flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm w-full font-semibold">
              Email
            </span>
            <input
              type="text"
              placeholder="Email"
              className="text-[#4a4a4a] flex-1 text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
              {...register("regemail", { required: true, minLength: 5 })}
            />
             {errors?.regemail && (
            <span className="text-red-700">{`${errors.regemail.message}`}</span>
          )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Phone</span>
            <input
              type="text"
              placeholder="Phone"
              className="text-[#4a4a4a] text-base flex-1 outline-[#7655fa]  p-2 border-[1px]  rounded-md"
              {...register("phone", { required: true, minLength: 5 })}
            />
            {errors.phone && (
              <span className="text-red-700">{`${errors.phone.message}`}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">Password</span>
          <input
            type="password"
            placeholder="Password"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("regpassword", { required: true, minLength: 5 })}
          />
           {errors.regpassword && (
              <span className="text-red-700">{`${errors.regpassword.message}`}</span>
            )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Confirm Password
          </span>
          <input
            type="password"
            placeholder="Password"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            {...register("confirm_password", { required: true, minLength: 5 })}
          />
          {errors.confirm_password && (
           <span className="text-red-700">{`${errors.confirm_password.message}`}</span>
          )}
        </div>

        <button
          disabled={isPending}
          className="px-4 py-2 flex justify-center items-center gap-4 active:scale-[0.98] disabled:bg-[#999999] transition-all bg-[#7655fa] font-semibold text-white rounded-full"
        >
          {" "}
          {isPending && <Loader2 className="animate-spin h-5 w-5" />} Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
