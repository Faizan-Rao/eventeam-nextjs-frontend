"use client";
import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import JoditEditor from "jodit-react";
import { DollarSign } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const GuestFieldForm = () => {
  const hiddenInputRef = useRef(null);
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <form className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          Guest Field Settings
        </h1>
      </div>

      <div className="flex flex-col gap-2 ">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Show application fee on event {"(%)"}
          </span>
          <div className="flex justify-between border-[1px] rounded-md p-2">
            <span className="text-[#4a4a4a] flex-1">Active</span>
            <Controller
              name="advance_form.cash_payment"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={"advance_form.show_address"}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Show application fee on event {"(%)"}
          </span>
          <div className="flex justify-between border-[1px] rounded-md p-2">
            <span className="text-[#4a4a4a] flex-1">Active</span>
            <Controller
              name="advance_form.cash_payment"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={"advance_form.show_address"}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Show application fee on event {"(%)"}
          </span>
          <div className="flex justify-between border-[1px] rounded-md p-2">
            <span className="text-[#4a4a4a] flex-1">Active</span>
            <Controller
              name="advance_form.cash_payment"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={"advance_form.show_address"}
                />
              )}
            />
          </div>
        </div>
      

      
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default GuestFieldForm;
