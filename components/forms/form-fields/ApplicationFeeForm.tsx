"use client";
import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import JoditEditor from "jodit-react";
import { DollarSign } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFields } from "@/configs/apiRoutes";
import { useMutation } from "@tanstack/react-query";

interface ApplicationField {
  plateform_fee : "20",
  is_show_app_fee : 0,
  is_default_app_fee: 0,
  application_fee_text : string
}

const ApplicationFeeForm = () => {
  
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: FormFields.updateApplication,
    onSuccess: () => {
      toast("Application Fields Saved" , {
        type : "success"
      })
    },
    onError: ()=>{
      toast("Application Fields Not Saved" , {
        type : "error"
      })
    }
  })
  const onSubmit = (data : any) => {
    try {

      if(!data)
      {
        throw new Error("Data is Empty...!")
      }

      mutation.mutate(data)

    }
    catch (error)
    {
      console.error(error)
      toast("Application Fields Not Saved" , {
        type : "error"
      })
    }
    
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          Application Fee Settings
        </h1>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          Platform fee
        </span>

        <div className="flex gap-4  border-[1px] rounded-md items-center px-3 ">
          <input
            type="number"
            className=" outline-none p-2 flex-1"
            placeholder="Enter Price"
            value={0}
            onChange={(e) => null}
          />
          <DollarSign size={18} />
        </div>
      </div>

      <div className="flex justify-between  items-center gap-4">
        <div className="flex flex-col gap-2 flex-1">
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

        <span className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-[#4a4a4a] font-semibold">Default state / Behaviour</label>

              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger >
                      <SelectValue placeholder="Select Time.." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before-sunset" defaultChecked>
                        Before Sunset
                      </SelectItem>
                      <SelectItem value="fixed-time">Fixed Time</SelectItem>
                      <SelectItem value="after-sunset">After Sunset</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
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

export default ApplicationFeeForm;
