"use client";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const FormFieldForm = () => {
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
          Form Field Settings
        </h1>
      </div>

      

      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#4a4a4a] text-sm font-semibold">Regulation Text</span>
          <Controller
            name="gen_info.event_desc"
            control={control}
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
        </div>
      </div>



      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#4a4a4a] text-sm font-semibold">Pay as Cash Text</span>
          <Controller
            name="gen_info.event_desc"
            control={control}
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
        </div>
      </div>



      <div className="flex flex-col gap-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#4a4a4a] text-sm font-semibold">Donation Field Text</span>
          <Controller
            name="gen_info.event_desc"
            control={control}
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

export default FormFieldForm;
