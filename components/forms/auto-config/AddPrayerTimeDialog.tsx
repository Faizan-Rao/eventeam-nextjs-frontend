"use client";
import {
  Controller,
  UseFieldArrayUpdate,
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
import {
  CirclePlus,
  CircleMinus,
  CircleX,
  Plus,
  PencilLine,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { t } from "i18next";


interface IPrayerField {
  append: (data: any) => unknown;
  remove: (index: number) => any;
  update?: any,
  index: number;
  editIndex?: number;
  type?: string;
  editData?: any;
}
const AddPrayerTimeDialog: React.FC<IPrayerField> = ({
  index,
  append,
  remove,
  update,
  type,
  editData,
  editIndex
}) => {
  const { control, register, resetField } = useFormContext();
  const defaults = {
    activity_id: "",
    activity_status: 1,
    activity_time: "0",
    activity_title: "",
    activity_type: "",
    sub_event_id: "",
  }
  const [data, setData] = useState( type === "edit" ? editData : defaults);
  
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          {type === "add" && (
            <div className="mb-5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="flex items-center text-sm gap-4 my-4  justify-self-start"
              >
                {" "}
                <Plus /> <span>{t("Add Activity")}</span>
              </button>
            </div>
          )}
          {type === "edit" && (
            <PencilLine
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="text-[#7655fa]"
            />
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ type === "edit" ? t("Edit Activity"): t("Add Activity")}</DialogTitle>
            <DialogDescription>
              <div className="flex  justify-center flex-col gap-4 ">
                <div>
                  <div className="flex my-4 flex-col flex-wrap gap-4 flex-1">
                    <span className="flex flex-col gap-2">
                      <label className="text-sm font-semibold ">{t("Activity Title")}</label>
                      <input
                        type="text"
                        className="border-[1px] p-2 outline-none rounded-md "
                        placeholder="Enter Title"
                        onChange={(event) => {
                          setData({
                            ...data,
                            activity_title: event.target.value,
                          });
                        }}
                        defaultValue={
                          type !== "edit"
                            ? data.activity_title
                            : editData.activity_title
                        }
                      />
                    </span>
                    <span className="flex flex-col gap-2">
                      <label className="text-sm font-semibold">{t("Time Type")}</label>

                      <Select
                        defaultValue={
                          type !== "edit"
                            ? data.activity_type
                            : editData.activity_type
                        }
                        onValueChange={(value) => {
                          setData({ ...data, activity_type: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time.." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before_sunset" defaultChecked>
                          {t("Before Sunset")}
                          </SelectItem>
                          <SelectItem value="fixed_time">{t("Fixed Time")}</SelectItem>
                          <SelectItem value="after_sunset">
                          {t("After Sunset")}t
                          </SelectItem>
                          <SelectItem value="before_candle">
                            {t("Before candle light")}
                          </SelectItem>
                          <SelectItem value="after_candle">
                          {t("After candle light")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </span>

                    {data?.activity_type !== "fixed_time" && (
                      <span className="flex   flex-col gap-2">
                        <label className="text-sm font-semibold">{t("Activity Time")}</label>
                        <div className="flex justify-center  bg-[#7655fa] rounded-md  px-4 py-2 ">
                          <CirclePlus
                            onClick={() => {
                              setData({
                                ...data,
                                activity_time: `${
                                  parseInt(data.activity_time) + 1
                                }`,
                              });
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                          <input
                            type="number"
                            className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                            value={data.activity_time ?? 0}
                            defaultValue={
                              type !== "edit"
                                ? parseInt(data.activity_time)
                                : parseInt(editData.activity_type)
                            }
                            min={0}
                          />
                          <CircleMinus
                            onClick={() => {
                              setData({
                                ...data,
                                activity_time: `${
                                  parseInt(data.activity_time) > 0 ?
                                  parseInt(data.activity_time) - 1 : 0
                                }`,
                              });
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                        </div>
                      </span>
                    )}

                    {(data?.activity_type === "fixed_time") && (
                      <span className="flex   flex-col gap-2">
                        <label className="text-sm font-semibold">{t("Fixed Time")}</label>
                        <div className="flex justify-center  border-[1px] rounded-md  px-4 py-2 ">
                          <input
                            type="time"
                            defaultValue={
                              type !== "edit"
                                ? data.activity_time
                                : editData.activity_time
                            }
                            className=" bg-transparent outline-none"
                            onChange={(e) => {
                              setData({
                                ...data,
                                activity_time: format(
                                  new Date(
                                    `2/4/2024 ${(e.target as any).value}`
                                  ),
                                  "HH:mm"
                                ),
                              });
                            }}
                          />
                        </div>
                      </span>
                    )}

                    <span className="flex   flex-col gap-2">
                      <label className="text-sm font-semibold ">{t("Active Status")}</label>
                      <div className="flex justify-between px-4 py-2 border-[1px] gap-6 rounded-md">
                        <span>{t("Active")}</span>
                        <Switch
                          checked={
                             data.activity_status === 1
                              ? true
                              : false
                          }
                          onCheckedChange={(value) => {
                            setData({
                              ...data,
                              activity_status: value ? 1 : 0,
                            });
                          }}
                          className="text-[white] cursor-pointer"
                          defaultChecked={false}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              <button
                className="px-4 py-2 self-end rounded-full bg-[#7655fa] text-white active:scale-[0.95] transition-all"
                onClick={() => {
                  if (data.activity_time !== "" && type === "add") {
                    append(data);
                    setOpen(false);
                    setData(defaults)
                  }
                  if (data.activity_time !== "" && type === "edit") {
                    update(editIndex, data);
                    setOpen(false);
                  }
                }}
              >
                { type === "edit" ? t("Edit Activity"): t("Add Activity")}
              </button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPrayerTimeDialog;
