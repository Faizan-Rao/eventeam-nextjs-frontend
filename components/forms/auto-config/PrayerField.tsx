"use client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CirclePlus, CircleMinus, CircleX, Plus } from "lucide-react";
import { ChangeEvent } from "react";
import { format } from "date-fns";

interface IPrayerField {
  title: string;
  fields: any[];
  append: (val: any) => any;
  remove: (index: number) => any;
  prayer: number;
}
const PrayerField: React.FC<IPrayerField> = ({
  title,
  fields,
  append,
  remove,
  prayer,
}) => {
  const { control, register, resetField } = useFormContext<IAutoConfig>();
  const prayerFields = useWatch({
    control,
    name: prayer === 1 ? `prayer_time.one_prayer` : `prayer_time.two_prayer`,
  });

 
  return (
    <div className="flex px-4 justify-center flex-col gap-4 ">
      <label className="text-[#7655fa] font-semibold">{title}</label>
      {fields.map((el, index) => (
        <div key={el.id}>
          <div className="flex items-center flex-wrap gap-4 flex-1">
            <span className="flex flex-col gap-1">
              <label className="text-sm ">Activity Title</label>
              <input
                type="text"
                className="border-[1px] p-[4.5px] outline-none rounded-md "
                placeholder="Enter Title"
                {...register(
                  prayer === 1
                    ? `prayer_time.one_prayer.${index}.title`
                    : `prayer_time.two_prayer.${index}.title`,
                  {
                    required: true,
                  }
                )}
              />
            </span>
            <span className="flex flex-col gap-1">
              <label className="text-sm ">Time Type</label>

              <Controller
                name={
                  prayer === 1
                    ? `prayer_time.one_prayer.${index}.time_type`
                    : `prayer_time.two_prayer.${index}.time_type`
                }
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
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

            {prayerFields[index]?.time_type === "before-sunset" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">Before Time</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={
                      prayer === 1
                        ? `prayer_time.one_prayer.${index}.before_time`
                        : `prayer_time.two_prayer.${index}.before_time`
                    }
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              Number.isNaN(field.value) ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={field.value ?? 0}
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
                          className="text-[white] cursor-pointer"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}
            {prayerFields[index]?.time_type === "after-sunset" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">After Time</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={
                      prayer === 1
                        ? `prayer_time.one_prayer.${index}.after_time`
                        : `prayer_time.two_prayer.${index}.after_time`
                    }
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              Number.isNaN(field.value) ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={field.value ?? 0}
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
                          className="text-[white] cursor-pointer"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}

            {prayerFields[index]?.time_type === "fixed-time" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">Fixed Time</label>
                <div className="flex  border-[1px] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={
                      prayer === 1
                        ? `prayer_time.one_prayer.${index}.fixed_time`
                        : `prayer_time.two_prayer.${index}.fixed_time`
                    }
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="time"
                          className=" bg-transparent outline-none"
                          onChange={(e: ChangeEvent) =>
                            field.onChange(
                              format(
                                new Date(`2/4/2024 ${(e.target as any).value}`),
                                "hh:mm a"
                              )
                            )
                          }
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}

            <span className="flex   flex-col gap-1">
              <label className="text-sm ">Active Status</label>
              <div className="flex  border-[1px] rounded-md items-center px-4 py-2 ">
                <Controller
                  name={
                    prayer === 1
                      ? `prayer_time.one_prayer.${index}.status`
                      : `prayer_time.two_prayer.${index}.status`
                  }
                  control={control}
                  render={({ field }) => (
                    <div className="flex gap-6">
                      <span>Active</span>
                      <Switch
                        onCheckedChange={(value) => field.onChange(value)}
                        className="text-[white] cursor-pointer"
                        defaultChecked={field.value}
                      />
                    </div>
                  )}
                />
              </div>
            </span>
            <div className="flex self-end">
              {index > 0 && (
                <CircleX
                  onClick={() => {
                    remove(index);
                  }}
                  className="text-[red] mb-3 cursor-pointer"
                  strokeWidth={1}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="mb-5">
        <button
          onClick={() =>
            append({
              title: "",
              time_type: "fixed-time",
              status: false,
              before_time: 0,
            })
          }
          className="flex items-center text-sm gap-4 my-4  justify-self-start"
        >
          {" "}
          <Plus /> <span>Add Another Subevent</span>
        </button>
      </div>
    </div>
  );
};

export default PrayerField;
