"use client";
import { Profile } from "@/configs/apiRoutes";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import joi from "joi";
import { Loader2 } from "lucide-react";
import { user } from "@/configs/axios";
export const stripeSettingsEditSchema = joi.object({
  stripe_publishable_key: joi.string().label("Stripe Publishable Key"),
  stripe_secret_key: joi.string().label("Stripe Secret Key"),
  update_stripe_keys_otp: joi.string().custom((value, helpers) => {
    if (!new RegExp(/^[0-9]+$/).test(value)) {
      return helpers.message("Input must be numeric only" as any);
    }
    return value;
  }).label("Stripe OTP"),
});

const EditStripSettings = ({ stripeKeys }: { stripeKeys: any }) => {
  const [isPending, setIsPending] = useState(false);

  const mutate = useMutation({
    mutationKey: ["update-stripe-keys"],
    mutationFn: async (data: any) => {
      return await Profile.updateStripeKeys(data);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["email-settings-platform"] });
      toast("Stripe Settings Updated...", {
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
      stripe_publishable_key: stripeKeys?.data.data.stripe_publishable_key,
      stripe_secret_key: stripeKeys?.data.data.stripe_secret_key,
      update_stripe_keys_otp: "",
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(stripeSettingsEditSchema, {
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, constext, options);
    },
  });

  const onSubmit = (data: any) => {
    if (data !== undefined) {
      data.otp_type = "update_stripe_keys";
      data.email = user.email;
      mutate.mutate(data);
    }
  };

  const handleSendOTP = async (e: any) => {
    try {
      e.preventDefault();
      setIsPending(true);
      const data = {
        otp_type: "update_stripe_keys",
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
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Stripe Setting</h1>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Stripe Publishable Key
        </span>
        <input
          type="text"
          placeholder="Enter The Publishable Key"
          {...register("stripe_publishable_key")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
        {errors?.stripe_publishable_key && (
          <span className="text-red-800">{`${errors.stripe_publishable_key.message}`}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Stripe Secret key
        </span>
        <input
          type="text"
          placeholder="Enter The Secret Key"
          {...register("stripe_secret_key")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
        {errors?.stripe_secret_key && (
          <span className="text-red-800">{`${errors.stripe_secret_key.message}`}</span>
        )}
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
          Stripe Confirmation OTP
        </span>
        <input
          type="text"
          placeholder="Enter Confirmation OTP"
          {...register("update_stripe_keys_otp")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
        {errors?.update_stripe_keys_otp && (
          <span className="text-red-800">{`${errors.update_stripe_keys_otp.message}`}</span>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default EditStripSettings;
