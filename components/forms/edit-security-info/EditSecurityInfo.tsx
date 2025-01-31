"use client";
import React, { useState } from "react";
import joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Profile } from "@/configs/apiRoutes";
import { user } from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export const securityEditSchema = joi.object({
  current_password: joi.string().label("Current Password"),
  password: joi.string().label("Current Password"),
  confirm_password: joi.string().custom((value, helpers) => {
    const {password} = helpers.state.ancestors[0]
    if (value !== password) {
     return helpers.message("Password & Confirm Password must be same" as any);
   }
   return value;
 }).label("Current Password"),
  change_password_otp: joi.string().custom((value, helpers) => {
     if (!new RegExp(/^[0-9]+$/).test(value)) {
      return helpers.message("Input must be numeric only" as any);
    }
    return value;
  })
  .label("Password OTP"),
});

const EditSecurityForm = () => {
  const [isPending, setIsPending] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      current_password: "",
      password: "",
      confirm_password: "",

      change_password_otp: "",
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(securityEditSchema, {
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, constext, options);
    },
  });

  const mutate = useMutation({
    mutationKey: ["update-commission"],
    mutationFn: async (data: any) => {
      return await Profile.updatePassword(data);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["email-settings-platform"] });
      toast("Commission Settings Updated...", {
        type: "info",
      });
    },
    onError: (error) => {
      if ((error as any).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
      }
    },
  });
  const onSubmit = (data: any) => {
    console.log("admin commission", data);
    if (data !== undefined) {
      data.admin_commission_confirm = data.admin_commission;
      data.email = user.email;
      data.otp_type = "admin_commission";
      mutate.mutate(data);
    }
  };

  const handleSendOTP = async (e: any) => {
    try {
      e.preventDefault();
      setIsPending(true);
      const data = {
        otp_type: "change_password",
        email: user.email,
      };
      const resposne = await Profile.sendOTPCommission(data);
      if (resposne.data.success) {
        toast(resposne.data?.message, { type: "success" });
      }
      setIsPending(false);
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
      setIsPending(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Security</h1>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Current Password
        </span>
        <input
          type="password"
          placeholder="* * * * * *"
          {...register("current_password")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
        {errors?.current_password && (
          <span className="text-red-800">{`${errors.current_password.message}`}</span>
        )}
      </div>

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            New Password
          </span>
          <input
            type="password"
            placeholder="* * * * * *"
            {...register("password")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
          {errors?.password && (
            <span className="text-red-800">{`${errors.password.message}`}</span>
          )}
        </div>
        <div className="flex-1 flex justify-center flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            Confirm Password
          </span>
          <input
            type="password"
            placeholder="* * * * * *"
            {...register("confirm_password")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
          {errors?.confirm_password && (
            <span className="text-red-800">{`${errors.confirm_password.message}`}</span>
          )}
        </div>

      </div>
        <button
          onClick={handleSendOTP}
          className="flex items-center justify-center cursor-pointer gap-4 px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa26] text-[#7655fa] hover:bg-[#7655fa] hover:text-white rounded-md"
        >
          {" "}
          {isPending && <Loader2 className="animate-spin h-5 w-5" />} Send
          Confirmation OTP
        </button>
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            Enter OTP
          </span>
          <input
            type="text"
            placeholder="Enter Confirmation OTP"
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("change_password_otp")}
          />
          {errors?.change_password_otp && (
            <span className="text-red-800">{`${errors.change_password_otp.message}`}</span>
          )}
        </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Password
        </button>
      </div>
    </form>
  );
};

export default EditSecurityForm;
