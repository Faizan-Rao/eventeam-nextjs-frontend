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
  plateform_fee : string,
  is_show_app_fee : string,
  is_default_app_fee: boolean,
  application_fee_text : string
}

const ApplicationFeeForm = () => {
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationField>();


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
      let payload = {...data}
      if(payload["is_show_app_fee"] !== "1")
      {
        payload["is_default_app_fee"] = 1
        payload["is_show_app_fee"] = 0
      }
      else
      {
        payload["is_show_app_fee"] = 1
        payload["is_default_app_fee"] = 0
      }

      
      mutation.mutate(payload)

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
           {...register("plateform_fee")}
          />
          <DollarSign size={18} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          Application fee text
        </span>

        <div className="flex gap-4  border-[1px] rounded-md items-center px-3 ">
          <input
            type="text"
            className=" outline-none p-2 flex-1"
            placeholder="Enter application fee text"
           {...register("application_fee_text")}
          />
         
        </div>
      </div>

      

      <div className="flex justify-between  items-center gap-4">
        
        <span className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-[#4a4a4a] font-semibold">Select Application Fee Mode</label>

              <Controller
                name="is_show_app_fee"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger >
                      <SelectValue placeholder="Select Mode..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"1"}>Show application fee</SelectItem>
                      <SelectItem value={"0"}>Show default fee</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ApplicationFeeForm;
