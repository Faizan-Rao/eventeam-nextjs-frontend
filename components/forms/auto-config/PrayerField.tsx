"use client";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CirclePlus, CircleMinus, CircleX, Plus } from "lucide-react";
import { ChangeEvent, useCallback, useEffect } from "react";
import { format } from "date-fns";
import _ from "lodash";
import { useTranslation } from "react-i18next";
interface IPrayerField {
  title: string;
  prayer: number;
}
const PrayerField: React.FC<IPrayerField> = ({
  title,

  prayer,
}) => {
  const { control, register, resetField } = useFormContext<any>();
  const { fields, append, remove } = useFieldArray({
    name: `activities.${prayer}.activities`,
    control,
  });

  const prayerFields = useWatch({
    control,
    name: `activities.${prayer}.activities`,
  });

  const watch = useWatch({ control });
  const { setValue } = useFormContext();
  const {t} = useTranslation(["translation"])
  console.log("watch", _.isString("hello g") && _.isNaN("12:00"));
  return (
    <div className="flex px-4 justify-center flex-col gap-4 ">
      <label className="text-[#7655fa] font-semibold">{title}</label>
      {fields.map((el, index) => (
        <div key={el.id}>
          <div className="flex items-center flex-wrap gap-4 flex-1">
            <span className="flex flex-col gap-1">
              <label className="text-sm ">{t("Activity Title")}</label>
              <input
                type="text"
                className="border-[1px] p-[4.5px] outline-none rounded-md "
                placeholder="Enter Title"
                {...register(
                  `activities.${prayer}.activities.${index}.activity_title`,
                  {
                    required: true,
                  }
                )}
              />
            </span>
            <span className="flex flex-col gap-1">
              <label className="text-sm ">{t("Time Type")}</label>

              <Controller
                name={`activities.${prayer}.activities.${index}.activity_type`}
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue(
                        `activities.${prayer}.activities.${index}.activity_type`,
                        value
                      );
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t("Select Time..")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before_sunset" defaultChecked>
                        {t("Before Sunset")}
                      </SelectItem>
                      <SelectItem value="fixed_time">{t("Fixed Time")}</SelectItem>
                      <SelectItem value="after_sunset">{t("After Sunset")}</SelectItem>
                      <SelectItem value="before_candle">
                        {t("Before Candle Light")}
                      </SelectItem>
                      <SelectItem value="after_candle">
                        {t("After Candle Light")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </span>
            {/* Before Sunset */}

            {watch.activities?.[prayer].activities?.[index]?.activity_type ===
              "before_sunset" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">{t("Before Time")}</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={`activities.${prayer}.activities.${index}.activity_time`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              _.isString(field.value)  ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={_.isString(field.value) && isNaN(parseInt(field.value)) ? 0 : field.value}
                          defaultValue={0}
                          min={0}
                        />
                        <CircleMinus
                          onClick={() =>
                            field.value > 0 &&
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value - 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}
            {/* Before Candle Light */}
            {watch.activities?.[prayer].activities?.[index]?.activity_type ===
              "before_candle" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">{t("Before Candle Light")}</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={`activities.${prayer}.activities.${index}.activity_time`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={_.isString(field.value) && isNaN(parseInt(field.value)) ? 0 : field.value}
                          defaultValue={prayerFields[index]?.activity_time}
                          min={0}
                        />
                        <CircleMinus
                          onClick={() =>
                            field.value > 0 &&
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value - 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}

            {/* After Candle Light */}
            {watch.activities?.[prayer].activities?.[index]?.activity_type ===
              "after_candle" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">{t("After Candle Light")}</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={`activities.${prayer}.activities.${index}.activity_time`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={_.isString(field.value) && isNaN(parseInt(field.value)) ? 0 : field.value}
                          defaultValue={0}
                          min={0}
                        />
                        <CircleMinus
                          onClick={() =>
                            field.value > 0 &&
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value - 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}
            {/* after sunset */}
            {watch.activities?.[prayer].activities?.[index]?.activity_type ===
              "after_sunset" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">{t("After Time")}</label>
                <div className="flex  bg-[#7655fa] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={`activities.${prayer}.activities.${index}.activity_time`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <CirclePlus
                          onClick={() =>
                            field.onChange(
                              _.isString(field.value)  ? 0 : field.value + 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                        <input
                          type="number"
                          className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                          onChange={(e: ChangeEvent) =>
                            field.onChange((e.target as any).value)
                          }
                          value={_.isString(field.value) && isNaN(parseInt(field.value)) ? 0 : field.value}
                          defaultValue={0}
                          min={0}
                        />
                        <CircleMinus
                          onClick={() =>
                            field.value > 0 &&
                            field.onChange(
                              _.isString(field.value) ? 0 : field.value - 1
                            )
                          }
                          className="text-[white] cursor-pointer active:scale-[0.90] transition-all"
                          size={18}
                        />
                      </>
                    )}
                  />
                </div>
              </span>
            )}
            {/* Fixed Time */}
            {watch.activities?.[prayer].activities?.[index]?.activity_type ===
              "fixed_time" && (
              <span className="flex   flex-col gap-1">
                <label className="text-sm ">{t("Fixed Time")}</label>
                <div className="flex  border-[1px] rounded-md items-center px-4 py-2 ">
                  <Controller
                    name={`activities.${prayer}.activities.${index}.activity_time`}
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="time"
                          value={
                            
                              (`${prayerFields[index].activity_time}`.split(" ")[0]
                            )
                              // ? prayerFields[index].activity_time?.split(" ")[0]
                              // : "00:00"
                          }
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
              <label className="text-sm ">{t("Active Status")}</label>
              <div className="flex  border-[1px] rounded-md items-center px-4 py-2 ">
                <Controller
                  name={`activities.${prayer}.activities.${index}.activity_status`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex gap-6">
                      <span>{t("Active")}</span>
                      <Switch
                      dir="ltr"
                        onCheckedChange={(value) => field.onChange(value ? 1 : 0)}
                        className="text-[white] cursor-pointer"
                        checked={field.value === 1 ? true : false }
                      />
                    </div>
                  )}
                />
              </div>
            </span>
            <div className="flex self-end">
              <CircleX
                onClick={() => {
                  remove(fields.length - 1);
                }}
                className="text-[red] mb-3 cursor-pointer active:scale-[0.90] transition-all"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="mb-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            append({
              sub_event_id: "",
              activity_id: "",
              activity_title: "",
              activity_type: "before_sunset",
              activity_time: "0",
              activity_status: 0,
            })
          }}
          className="flex items-center text-sm gap-4 my-4  justify-self-start active:scale-[0.90] transition-all"
        >
          {" "}
          <Plus /> <span>{t("Add Activity")}</span>
        </button>
      </div>
    </div>
  );
};

export default PrayerField;
