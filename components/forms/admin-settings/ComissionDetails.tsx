"use client";
import { queryClient } from "@/components/MainLayoutGrid";
import { Profile } from "@/configs/apiRoutes";
import { user } from "@/configs/axios";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import joi from "joi";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const commissionDetailsEditSchema = joi.object({
  admin_commission: joi
    .string()
    .min(1)
    .max(3)
    .custom((value, helpers) => {
      if (parseInt(value) < 0 || parseInt(value) > 100) {
        return helpers.message(
          "Please Specify within range of 0 to 100" as any
        );
      } else if (!new RegExp(/^[0-9]+$/).test(value)) {
        return helpers.message("Input must be numeric only" as any);
      }
      return value;
    })
    .label("Admin Commission"),
  admin_commission_otp: joi
    .string()
    .min(1)
    .max(6)
    .custom((value, helpers) => {
      if (!new RegExp(/^[0-9]+$/).test(value)) {
        return helpers.message("Input must be numeric only" as any);
      }
      return value;
    })
    .label("Admin Commission OTP"),
});

const EditComissionDetails = ({
  commissionDetails,
}: {
  commissionDetails: any;
}) => {
  const [isPending, setIsPending] = useState(false);
  const {t} = useTranslation(["translation"])

  const mutate = useMutation({
    mutationKey: ["update-commission"],
    mutationFn: async (data: any) => {
      return await Profile.updateAdminCommission(data);
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admin_commission: commissionDetails?.data.data.admin_commission,
      admin_commission_otp: "",
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(commissionDetailsEditSchema, {
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, constext, options);
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
        otp_type: "admin_commission",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white "
    >
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          {t("Commission Details")}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          {t("Commission %")}
        </span>
        <input
          type="text"
          placeholder="0"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("admin_commission")}
        />
        {errors?.admin_commission && (
          <span className="text-red-800">{`${errors.admin_commission.message}`}</span>
        )}
      </div>
      <button
        onClick={handleSendOTP}
        className="flex items-center justify-center cursor-pointer gap-4 px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa26] text-[#7655fa] hover:bg-[#7655fa] hover:text-white rounded-md"
      >
        {" "}
        {isPending && <Loader2 className="animate-spin h-5 w-5" />} {t("Send Confirmation OTP")}
      </button>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">{t("Enter OTP")}</span>
        <input
          type="text"
          placeholder={t("Enter Confirmation OTP")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("admin_commission_otp")}
        />
        {errors?.admin_commission_otp && (
          <span className="text-red-800">{`${errors.admin_commission_otp.message}`}</span>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <button
          type="submit"
          className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full"
        >
          {t("Save Settings")}
        </button>
      </div>
    </form>
  );
};

export default EditComissionDetails;
