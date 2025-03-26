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
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export const securityEditSchema = joi.object({
  current_password: joi.string().allow("").label("Current Password"),
  password: joi.string().label("Current Password"),
  confirm_password: joi
    .string()
    .custom((value, helpers) => {
      const { password } = helpers.state.ancestors[0];
      if (value !== password) {
        return helpers.message(
          "Password & Confirm Password must be same" as any
        );
      }
      return value;
    })
    .label("Confirm Password"),
  change_password_otp: joi
    .string()
    .custom((value, helpers) => {
      if (!new RegExp(/^[0-9]+$/).test(value)) {
        return helpers.message("Input must be numeric only" as any);
      }
      return value;
    })
    .label("Password OTP"),
});

const EditSecurityForm = ({
  email,
  formName,
}: {
  email?: string;
  formName?: string;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isShow, setIsShow] = useState({
      current_password:false,
      password: false,
      confirm_password: false,
    });
  const pathname = usePathname();
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
    mutationKey: ["update-password"],
    mutationFn: async (data: any) => {
      if (!pathname.includes("forget-password")) {
        return await Profile.updatePassword(data);
      } else {
        return await Profile.resetPassword(data);
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["email-settings-platform"] });
      toast("Password Updated...", {
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
      if ((error as any).status !== 200) {
        toast((error as any)?.response?.data.message, { type: "error" });
      }
    },
  });
  const onSubmit = (data: any) => {
    if (data !== undefined) {
      data.email = email ?? user.email;
      data.otp_type = pathname.includes("forget-password")
        ? "forgot_password"
        : "change_password";

      if (pathname.includes("/forget-password")) {
        data.forgot_password_otp = data.change_password_otp;
        delete data.change_password_otp;
      }
      mutate.mutate(data);
    }
  };

  const handleSendOTP = async (e: any) => {
    try {
      e.preventDefault();
      setIsPending(true);
      let otp_type = "change_password"
      if(pathname.includes("/forget-password")){
        otp_type = "forgot_password"
      }
      const data = {
        otp_type,
        email: email ?? user.email,
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

  const { t } = useTranslation(["translation"]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        pathname.includes("forget-password") && "min-w-[60vw]",
        "z-[1]  flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white "
      )}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          {formName ? t(formName) : t("Security")}
        </h1>
      </div>
      {!pathname.includes("forget-password") && (
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("Current Password")}
          </span>
          <div className="flex justify-between pe-2 items-center  outline-[#7655fa]  p-2 border-[1px]  rounded-md">
            <input
              {...register("current_password", {
                required: true,
                minLength: 5,
              })}
              type={isShow.current_password ? "text" : "password"}
              placeholder="*********"
              className="text-[#4a4a4a] outline-none flex-1 text-base"
            />
            <p
              className="font-semibold cursor-pointer text-base text-[#7655fa]"
              onClick={() =>
                setIsShow({
                  ...isShow,
                  current_password: !isShow.current_password,
                })
              }
            >
              {isShow.current_password ? "Hide" : "Show"}
            </p>
          </div>
          {errors?.current_password && (
            <span className="text-red-800">{`${errors.current_password.message}`}</span>
          )}
        </div>
      )}

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("New Password")}
          </span>
          <div className="flex justify-between pe-2 items-center  outline-[#7655fa]  p-2 border-[1px]  rounded-md">
            <input
              {...register("password", {
                required: true,
                minLength: 5,
              })}
              type={isShow.password ? "text" : "password"}
              placeholder="*********"
              className="text-[#4a4a4a] text-base outline-none flex-1"
            />
            <p
              className="font-semibold text-base cursor-pointer text-[#7655fa]"
              onClick={() =>
                setIsShow({
                  ...isShow,
                  password: !isShow.password,
                })
              }
            >
              {isShow.password ? "Hide" : "Show"}
            </p>
          </div>
          {errors?.password && (
            <span className="text-red-800">{`${errors.password.message}`}</span>
          )}
        </div>
        <div className="flex-1 flex justify-center flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("Confirm Password")}
          </span>
          <div className="flex justify-between pe-2 items-center  outline-[#7655fa]  p-2 border-[1px]  rounded-md">
            <input
              {...register("confirm_password", {
                required: true,
                minLength: 5,
              })}
              type={isShow.confirm_password ? "text" : "password"}
              placeholder="*********"
              className="text-[#4a4a4a]  outline-none flex-1 text-base"
            />
            <p
              className="font-semibold text-base cursor-pointer text-[#7655fa]"
              onClick={() =>
                setIsShow({
                  ...isShow,
                  confirm_password: !isShow.confirm_password,
                })
              }
            >
              {isShow.confirm_password ? "Hide" : "Show"}
            </p>
          </div>
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
        {isPending && <Loader2 className="animate-spin h-5 w-5" />}{" "}
        {t("Send Confirmation OTP")}
      </button>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          {t("Enter OTP")}
        </span>
        <input
          type="text"
          placeholder={t("Enter Confirmation OTP")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("change_password_otp")}
        />
        {errors?.change_password_otp && (
          <span className="text-red-800">{`${errors.change_password_otp.message}`}</span>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {t("Save Password")}
        </button>
      </div>
    </form>
  );
};

export default EditSecurityForm;
