"use client";
import { joditConfig } from "@/configs/joditConfig";
import {
  UseFormRegister,
  Control,
  Controller,
  FieldErrors,
  useFormContext,
  FieldError,
  useController,
  useWatch,
} from "react-hook-form";

import JoditEditor from "jodit-react";
// import { IAutoConfig } from "./AutoConfigForm";
import { usePathname } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";
import dynamic from "next/dynamic";

// export const GeneralInfoInput = ({errors} : {errors?: any[]}) => {
export const GeneralInfoInput = ({}: { errors?: any[] }) => {
  const path = usePathname();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const Controller = useController({ name: "event_description", control });
  const watch = useWatch({ control });
  console.log("Start Date Watch");
  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      {/* Event Name */}
      {!path.includes("auto-config") && (
        <span className="flex gap-2 flex-col">
          <label
            className={"text-[#4a4a4a] sm:text-sm md:text-base font-semibold"}
          >
            Event Name
          </label>
          <input
            type="text"
            className="border-[2px] outline-none p-2 w-full"
            placeholder="Enter Name"
            {...register("title")}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => message && <p className="text-red-800">{message}</p>}
          />
          {/* {errors?.title && <p className="text-red-800">{`"Title" is required`}</p> } */}
        </span>
      )}

      {/* Event Dates */}
      <div className="flex sm:flex-col md:flex-row gap-3">
        {!path.includes("auto-config") && (
          <span className="flex-1 flex gap-3 flex-col">
            <label
              className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}
            >
              Start Date
            </label>
            <input
              type="date"
              className="border-[2px] outline-none p-2 w-full cursor-pointer"
              // {...register("start_date")}
              value={
                watch.start_date &&
                `${new Date(watch.start_date).toISOString().split("T")[0]}`
              }
              onChange={(e) => setValue("start_date", new Date(e.target.value))}
            />
           <ErrorMessage
            errors={errors}
            name="start_date"
            render={({ message }) => message && <p className="text-red-800">{message}</p>}
          />
          </span>
        )}
        {!path.includes("auto-config") && (
          <span className="flex-1 flex gap-3 flex-col">
            <label
              className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}
            >
              End Date
            </label>
            <input
              type="date"
              className="border-[2px] outline-none p-2 w-full "
              value={
                watch.end_date &&
                `${new Date(watch.end_date).toISOString().split("T")[0]}`
              }
              onChange={(e) => setValue("end_date", new Date(e.target.value))}
            />
            <ErrorMessage
            errors={errors}
            name="end_date"
            render={({ message }) => message && <p className="text-red-800">{message}</p>}
          />
          </span>
        )}
      </div>
      {/* Event Description */}
      <div className="flex flex-col gap-4">
        <label
          // htmlFor={id}
          className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}
        >
          Event Description
        </label>
        <JoditEditor
          value={Controller.field.value || ""}
          config={joditConfig as any}
          onChange={(newContent) => Controller.field.onChange(newContent)}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={`event_description`}
        render={({ message }) =>
          message && <p className="text-red-800 ">{message}</p>
        }
      />
    </div>
  );
};
