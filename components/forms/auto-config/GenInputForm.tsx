'use client'
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import { UseFormRegister, Control, Controller, FieldErrors } from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";
import { usePathname } from 'next/navigation'
export const GeneralInfoInput = ({
    register,
    control,
    id,
    errors,
  }: {
    register: UseFormRegister<IAutoConfig>;
    control: Control<IAutoConfig, any>;
    id: string;
    errors: FieldErrors<IAutoConfig>;
  }) => {

    const path = usePathname()

    return (
      <div className="flex flex-col gap-6 p-4 w-full">
        {/* Event Name */}
       { !path.includes("auto-config") && <span className="flex gap-2 flex-col">
          <label className={"text-[#4a4a4a] sm:text-sm md:text-base font-semibold"}>Event Name</label>
          <input
            type="text"
            className="border-[2px] outline-none p-2 w-full"
            placeholder="Enter Name"
            {...register("gen_info.event_name", { required: true })}
          />
        </span>}
  
        {/* Event Dates */}
        <div className="flex sm:flex-col md:flex-row gap-3">
         {!path.includes("auto-config") && <span className="flex-1 flex gap-3 flex-col">
            <label className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}>Start Date</label>
            <input
              type="date"
              className="border-[2px] outline-none p-2 w-full cursor-pointer"
              {...register("gen_info.start_date", { required: true })}
            />
          </span>}
         {!path.includes("auto-config") && <span className="flex-1 flex gap-3 flex-col">
            <label className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}>End Date</label>
            <input
              type="date"
              className="border-[2px] outline-none p-2 w-full "
              {...register("gen_info.end_date", { required: true })}
            />
          </span>}
        </div>
        {/* Event Description */}
        <Controller
          name="gen_info.event_desc"
          control={control}
          rules={{required: true, minLength:14}}
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              <label htmlFor={id} className={"text-[#4a4a4a] font-semibold sm:text-sm md:text-base"}>
                Event Description
              </label>
              <JoditEditor
                key={id}
                value={field.value}
                config={joditConfig as any}
                onChange={(newContent) => field.onChange(newContent)}
              />
            </div>
          )}
        />
        {errors.gen_info?.event_desc && <span className="text-red-800">This field is required.</span>}
      </div>
    );
  };
  