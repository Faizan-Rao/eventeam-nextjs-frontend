"use client";
import React, { useEffect, useState } from "react";
import {
  Control,
  useFieldArray,
  useForm,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";

import PrayerField from "./PrayerField";
import AddPrayerTimeDialog from "./AddPrayerTimeDialog";
import { CircleX } from "lucide-react";
import EditPrayerTimeDialog from "./EditPrayerTImeDialog";

interface IPrayerTime {
  control: Control<IAutoConfig, any>;
  register: UseFormRegister<IAutoConfig>;
}

const PrayerTimeForm: React.FC<IPrayerTime> = ({ control, register }) => {
  const { fields, append, remove, update, replace } = useFieldArray({
    name: "prayer_time.one_prayer",
    control,
  });


  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    name: "prayer_time.two_prayer",
    control,
  });

  const watch = useWatch({ control });

  console.log(watch);
  return (
    <>
    {/* Web Interface */}
      <div className="sm:hidden md:block">
        <PrayerField
          title="Subevent #1 Prayer Time"
          fields={fields}
          append={append}
          remove={remove}
          prayer={1}
        />
        <PrayerField
          title="Subevent #2 Prayer Time"
          fields={fields2}
          append={append2}
          remove={remove2}
          prayer={2}
        />
      </div>

    {/* Mobile Interface */}
      <div className="sm:flex md:hidden flex-col min-w-[90vw]">
        <h1 className="text-[#7655fa] font-semibold">
          Subevent #1 Prayer Time
        </h1>
        <div className="flex flex-col gap-4">
          {watch.prayer_time?.one_prayer?.map(
            (el, index) =>
              el.title && (
                <div
                  className="border-[1px] flex justify-between items-center px-4 py-2 rounded-lg bg-[#7655fa26]"
                  key={index}
                >
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">{el.title}</h1>
                    <h1 className="text-base text-[#999999]">
                      {el.time_type} {el.status}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center  gap-6">
                    <EditPrayerTimeDialog index={index} prayer={1} update={update as any}/>
                    <CircleX
                      onClick={() => {
                        remove(index);
                      }}
                      className="text-[red] cursor-pointer"
                      strokeWidth={1}
                    />

                  </div>
                </div>
              )
          )}
        </div>
        <AddPrayerTimeDialog
          append={append}
          remove={remove}
          prayer={1}
          index={fields.length}
        />

        <h1 className="text-[#7655fa] font-semibold">
          Subevent #2 Prayer Time
        </h1>
        {watch.prayer_time?.two_prayer?.map(
          (el, index) =>
            el.title && (
              <div
                className="border-[1px] flex justify-between items-center px-4 py-2 rounded-lg bg-[#7655fa26]"
                key={index}
              >
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{el.title}</h1>
                  <h1 className="text-base text-[#999999]">
                    {el.time_type} {el.status}
                  </h1>
                </div>
                <div className="flex justify-center items-center  gap-6">
                  <EditPrayerTimeDialog index={index} prayer={2} update={update as any}/>
                  <CircleX
                    onClick={() => {
                      remove2(index);
                    }}
                    className="text-[red]  cursor-pointer"
                    strokeWidth={1}
                  />

                </div>
              </div>
            )
        )}
        <AddPrayerTimeDialog
          append={append2}
          remove={remove2}
          prayer={2}
          index={fields2.length}
        />
      </div>
    </>
  );
};

export default PrayerTimeForm;
