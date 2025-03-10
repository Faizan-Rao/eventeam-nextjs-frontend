"use client";
import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import JoditEditor from "jodit-react";
import { DollarSign } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFields } from "@/configs/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/MainLayoutGrid";
import { useTranslation } from "react-i18next";

interface GuestField {
  guest_name_required: boolean;
  guest_email_required: boolean;
  guest_phone_required: boolean;
}

const GuestFieldForm = ({data}:{data:any}) => {
  const hiddenInputRef = useRef(null);
  const methods = useForm<GuestField>({
    defaultValues: {
      guest_name_required: data?.guest_name_required === "1" ? true  : false,
      guest_email_required: data?.guest_email_required === "1"? true  : false,
      guest_phone_required: data?.guest_phone_required === "1"? true  : false,
    }
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const {t} = useTranslation(["translation"])
  const mutation = useMutation({
    mutationFn: FormFields.updateGuestField,
    onSuccess: () => {
      queryClient.invalidateQueries( {queryKey: ["form-fields"]})
      toast("Guest Fields Saved", {
        type: "success",
      });
    },
    onError: () => {
      toast("Guest Fields Not Saved", {
        type: "error",
      });
    },
  });
  const onSubmit = (data: any) => {
    try {
      if (!data) {
        throw new Error("Data is Empty...!");
      }
      let payload = {} as any;
      if (Object.keys(data).includes("guest_name_required")) {
        payload.guest_name_required = data.guest_name_required ? 1 : 0;
      }
      if (Object.keys(data).includes("guest_email_required")) {
        payload.guest_email_required = data.guest_email_required ? 1 : 0;
      }
      if (Object.keys(data).includes("guest_phone_required")) {
        payload.guest_phone_required = data.guest_phone_required ? 1 : 0;
      }
      
      mutation.mutate(payload);
    } catch (error) {
      console.error(error);
      toast("Form Fields Not Saved", {
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-4 sm:p-4 md:p-10 rounded-md bg-white "
    >
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          {t("Guest Field Settings")}
        </h1>
      </div>

      <div className="flex flex-col gap-2 ">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          {t("Guest Name Required")}
        </span>
        <div className="flex justify-between border-[1px] rounded-md p-2">
          <span className="text-[#4a4a4a] flex-1">{t("Active")}</span>
          <Controller
            name="guest_name_required"
            control={control}
            render={({ field }) => (
              <Switch
              dir="ltr"
                checked={field.value}
                onCheckedChange={field.onChange}
                name={"guest_name_required"}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          {t("Guest Phone Required")}
        </span>
        <div className="flex justify-between border-[1px] rounded-md p-2">
          <span className="text-[#4a4a4a] flex-1">{t("Active")}</span>
          <Controller
            name="guest_phone_required"
            control={control}
            render={({ field }) => (
              <Switch
              dir="ltr"
                checked={field.value}
                onCheckedChange={field.onChange}
                name={"guest_phone_required"}
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          {t("Guest Email Required")}
        </span>
        <div className="flex justify-between border-[1px] rounded-md p-2">
          <span className="text-[#4a4a4a] flex-1">{t("Active")}</span>
          <Controller
            name="guest_email_required"
            control={control}
            render={({ field }) => (
              <Switch
              dir="ltr"
                checked={field.value}
                onCheckedChange={field.onChange}
                name={"guest_email_required"}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          {t("Save Changes")}
        </button>
      </div>
    </form>
  );
};

export default GuestFieldForm;
