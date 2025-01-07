"use client";
import { FormFields } from "@/configs/apiRoutes";
import { joditConfig } from "@/configs/joditConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormField {
  donation_field_text: string;
  cod_text: string;
  regulation_text: string;
}

const FormFieldForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    defaultValues: {
      cod_text: "",
      donation_field_text: "",
      regulation_text: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: FormFields.updateFormField,
    onSuccess: () => {
      toast("Form Fields Saved" , {
        type : "success"
      })
    },
    onError: ()=>{
      toast("Form Fields Not Saved" , {
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
      toast("Form Fields Not Saved" , {
        type : "error"
      })
    }
    
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          Form Field Settings
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Regulation Text
          </span>
          <Controller
            name="regulation_text"
            control={control}
            rules={{minLength: 20}}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <JoditEditor
                  value={field.value}
                  config={joditConfig as any}
                  onChange={(newContent) => field.onChange(newContent)}
                />
              </div>
            )}
          />
          {errors.regulation_text && <span className="text-red-700">This field is less than 20 character</span>}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Pay as Cash Text
          </span>
          <Controller
            name="cod_text"
            control={control}
            rules={{minLength: 20}}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <JoditEditor
                  value={field.value}
                  config={joditConfig as any}
                  onChange={(newContent) => field.onChange(newContent)}
                />
              </div>
            )}
          />
          {errors.cod_text && <span className="text-red-700">This field is less than 20 Character</span>}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Donation Field Text
          </span>
          <Controller
            name="donation_field_text"
            control={control}
            rules={{minLength: 20}}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <JoditEditor
                  value={field.value}
                  config={joditConfig as any}
                  onChange={(newContent) => field.onChange(newContent)}
                />
              </div>
            )}
          />
          {errors.donation_field_text && <span className="text-red-700">This field is less than 20 character</span>}
        </div>
      </div>

      <div className="flex justify-end  items-center gap-4">
        <button  className="px-4 py-2 active:scale-[0.95] transition-all  bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default FormFieldForm;
