import { Switch } from "@/components/ui/switch";
import { ErrorMessage } from "@hookform/error-message";
import { CirclePlus, CircleMinus } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PrayerForm = () => {
  const { control, setValue, reset, getValues, formState: {errors} } = useFormContext();
  const {t} = useTranslation(["translation"])
 

  return (
    <div className="flex flex-col flex-1 bg-[#ebe6fe] sm:mb-4 md:m-4 p-4 rounded-lg">
      <h1 className="text-[#7655fa] font-semibold">{t("Time")}</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 items-end  gap-10">
        <div className="flex flex-1  flex-col gap-1">
          <label className="text-sm text-[#999999]  font-semibold">{t("Choose how many Minutes Before sunset is candle lighting in your area?")}</label>
          <div className="flex justify-between bg-[#7655fa] rounded-md items-center px-4 py-2 ">
            <Controller
              name={`prayer.before_sunset_time`}
              control={control}
              render={({ field }) => (
                <>
                  <CirclePlus
                    onClick={() =>
                      field.onChange(
                        Number.isNaN(field.value) ? 0 : field.value + 1
                      )
                    }
                    className="text-[white] active:scale-[0.90] transition-all cursor-pointer"
                    size={18}
                  />
                  <input
                    type="number"
                    className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                    onChange={(e: ChangeEvent) =>
                      field.onChange(Number((e.target as any).value))
                    }
                    value={ Number(field.value || 0) }
                    defaultValue={0}
                    min={0}
                  />
                  <CircleMinus
                    onClick={() =>
                      field.value > 0 &&
                      field.onChange(
                        Number.isNaN(field.value) ? 0 : field.value - 1
                      )
                    }
                    className="text-[white] active:scale-[0.90] transition-all cursor-pointer"
                    size={18}
                  />
                </>
              )}
            />
          </div>
           
        </div>
        <div className="flex flex-1  flex-col gap-1">
          <label className="text-sm text-[#999999]  font-semibold">{t("Choose how many Minutes After sunset is the time of 1st subevent?")}</label>
          <div className="flex justify-between bg-[#7655fa] rounded-md items-center px-4 py-2 ">
            <Controller
              name={`prayer.after_sunset_time`}
              control={control}
              render={({ field }) => (
                <>
                  <CirclePlus
                    onClick={() =>
                      field.onChange(
                        Number.isNaN(field.value) ? 0 : field.value - 1 + 2
                      )
                    }
                    className="text-[white] active:scale-[0.90] transition-all cursor-pointer"
                    size={18}
                  />
                  <input
                    type="number"
                    typeof="number"
                    className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                    onChange={(e) => {field.onChange((e.target as any).value)

                        
                    }}
                    value={Number(field.value || 0)}
                    defaultValue={0}
                    min={0}
                  />
                  <CircleMinus
                    onClick={() =>
                      field.value > 0 &&
                      field.onChange(
                        Number.isNaN(field.value) ? 0 : field.value - 1
                      )
                    }
                    className="text-[white] active:scale-[0.90] transition-all cursor-pointer"
                    size={18}
                  />
                </>
              )}
            />
          </div>
        </div>
        <span className="flex  flex-1  flex-col gap-1">
          <Controller
            name={`prayer.second_event_end_time`}
            control={control}
            render={({ field }) => (
              <>
                <label className={"text-[#999999] font-semibold  sm:text-sm md:text-sm"}>
                  {t(`End Time of 2nd Subevent`)}
                </label>
                <input
                  type="time"
                  className="border-[2px] rounded-lg  outline-none p-2 w-full "
                  onChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="0:00"
                  min={0}
                />
              </>
            )}
          />
        </span>

            {/* API Time Controller */}
        {/* <div className="flex flex-1  flex-col gap-1">
          <label className="text-sm text-[#999999] font-semibold">{t("Time API")}</label>
          <div className="flex justify-between bg-[white] rounded-md items-center px-4 py-2 ">
          <p  className="text-[#4a4a4a] ">{t("Active")}</p>
                  <Controller
                    name="prayer.is_api_enable"
                    control={control}
                    render={({ field }) => (
                      <Switch
                      dir={"ltr"}
                        checked={
                         field.value === 1
                            ? true
                            : false
                        }
                        onCheckedChange={(value) => {
                          field.onChange(value ? 1 : 0);
                        }}
                      />
                    )}
                  />
           
          </div>
        </div> */}
         <ErrorMessage
            errors={errors}
            name="prayer.before_sunset_time"
            render={({ message }) => message && <p className="text-red-800">{message}</p>}
          />
      </div>
      
    </div>
  );
};

export default PrayerForm;
