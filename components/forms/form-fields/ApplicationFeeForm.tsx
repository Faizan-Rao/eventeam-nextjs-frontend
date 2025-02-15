"use client";
import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import JoditEditor from "jodit-react";
import { DollarSign, Percent } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFields } from "@/configs/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/MainLayoutGrid";
import { useTranslation } from "react-i18next";

interface ApplicationField {
  plateform_fee : string,
  is_show_app_fee : string,
  is_default_app_fee: string,
  application_fee_text : string
}

const ApplicationFeeForm = ({data}:{data:any}) => {
  
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationField>({
    defaultValues:{
      plateform_fee: data?.plateform_fee ? data.plateform_fee : 0,
      is_show_app_fee: data?.is_show_app_fee ? data.is_show_app_fee : "1",
      is_default_app_fee: data?.is_default_app_fee ? data.is_default_app_fee : false,
      application_fee_text: data?.application_fee_text ? data.application_fee_text : false,
      
    }
  });
  const {t} = useTranslation(["translation"])

  const mutation = useMutation({
    mutationFn: FormFields.updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["form-fields"]})
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
  const watch = useWatch({control})

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 sm:p-4 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          {t("Application Fee Settings")}
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#4a4a4a] text-sm font-semibold">
          {t("Platform fee")}
        </span>

        <div className="flex   border-[1px] rounded-md items-center  ">
          <input
            type="number"
            className=" outline-none p-2 flex-1"
            {...register("plateform_fee")}
           
            placeholder={t("Platform fee")}
          />
          <Percent size={18}  className="mx-3"/>
        </div>
      </div>

    

      

      <div className="flex justify-between  items-center gap-4">
        
        <span className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-[#4a4a4a] font-semibold">{t("Collect/Show Application Fee on Guest Form")}</label>

              <Controller
                name="is_show_app_fee"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      if(value === "0")
                      {
                        setValue(
                          "plateform_fee",
                          "0"
                        )
                      }
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger >
                      <SelectValue placeholder={t("Select Mode...")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"1"}>{t("Yes")}</SelectItem>
                      <SelectItem value={"0"}>{t("No")}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
      </div>

      <div className="flex justify-between  items-center gap-4">
        
        <span className="flex flex-col gap-2 flex-1">
              <label className="text-sm text-[#4a4a4a] font-semibold">{t("Default Application Fee State")}</label>

              <Controller
                name="is_default_app_fee"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger >
                      <SelectValue placeholder={t("Select Mode...")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"1"}>{t("Checked By Default")}</SelectItem>
                      <SelectItem value={"0"}>{t("Unchecked By Default")}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
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

export default ApplicationFeeForm;
