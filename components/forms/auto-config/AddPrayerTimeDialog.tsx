"use client";
import {
  Controller,
  UseFieldArrayUpdate,
  useFormContext,
  useWatch,
} from "react-hook-form";
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

interface IPrayerField {
  append: (data: any) => unknown;
  remove: (index: number) => any;
  prayer: number;
  index: number;
}
const AddPrayerTimeDialog: React.FC<IPrayerField> = ({
  index,
  append,
  remove,
  prayer,
}) => {
  const { control, register, resetField } = useFormContext<IAutoConfig>();
  const prayerFields = useWatch({
    control,
    name: prayer === 1 ? `prayer_time.one_prayer` : `prayer_time.two_prayer`,
  });

  const [data, setData] = useState({
    title: "",
    time_type: "fixed-time",
    status: false,
    before_time: 0,
    after_time: 0,
    fixed_time: "",
  });

  const [open ,setOpen] = useState(false)
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="mb-5">
            <button className="flex items-center text-sm gap-4 my-4  justify-self-start">
              {" "}
              <Plus /> <span>Add Another Subevent</span>
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Prayer Activity</DialogTitle>
            <DialogDescription>
              <div className="flex  justify-center flex-col gap-4 ">
                <div>
                  <div className="flex my-4 flex-col flex-wrap gap-4 flex-1">
                    <span className="flex flex-col gap-1">
                      <label className="text-sm ">Activity Title</label>
                      <input
                        type="text"
                        className="border-[1px] p-[4.5px] outline-none rounded-md "
                        placeholder="Enter Title"
                        onChange={(event) => {
                          setData({
                            ...data,
                            title: event.target.value,
                          });
                        }}
                      />
                    </span>
                    <span className="flex flex-col gap-1">
                      <label className="text-sm ">Time Type</label>

                      <Select
                        defaultValue={"fixed-time"}
                        onValueChange={(value) => {
                          setData({ ...data, time_type: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time.." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before-sunset" defaultChecked>
                            Before Sunset
                          </SelectItem>
                          <SelectItem value="fixed-time">Fixed Time</SelectItem>
                          <SelectItem value="after-sunset">
                            After Sunset
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </span>

                    {data?.time_type === "before-sunset" && (
                      <span className="flex   flex-col gap-1">
                        <label className="text-sm ">Before Time</label>
                        <div className="flex justify-center  bg-[#7655fa] rounded-md  px-4 py-2 ">
                          <CirclePlus
                            onClick={() => {
                              setData({
                                ...data,
                                before_time: data.before_time + 1,
                              });
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                          <input
                            type="number"
                            className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                            value={data.before_time ?? 0}
                            defaultValue={0}
                            min={0}
                          />
                          <CircleMinus
                            onClick={() => {
                              setData({
                                ...data,
                                before_time: data.before_time - 1,
                              });
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                        </div>
                      </span>
                    )}
                    {data?.time_type === "after-sunset" && (
                      <span className="flex   flex-col gap-1">
                        <label className="text-sm ">After Time</label>
                        <div className="flex justify-center  bg-[#7655fa] rounded-md  px-4 py-2 ">
                          <CirclePlus
                            onClick={() => {
                              setData({
                                ...data,
                                after_time: data.after_time + 1,
                              });
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                          <input
                            type="number"
                            className="text-white  outline-none border-none w-[60px] text-center   bg-transparent"
                            value={data.after_time ?? 0}
                            defaultValue={0}
                            min={0}
                          />
                          <CircleMinus
                            onClick={() => {
                              if (data.after_time > 0) {
                                setData({
                                  ...data,
                                  after_time: data.after_time - 1,
                                });
                              }
                            }}
                            className="text-[white] cursor-pointer"
                            size={18}
                          />
                        </div>
                      </span>
                    )}

                    {data?.time_type === "fixed-time" && (
                      <span className="flex   flex-col gap-1">
                        <label className="text-sm ">Fixed Time</label>
                        <div className="flex justify-center  border-[1px] rounded-md  px-4 py-2 ">
                          <input
                            type="time"
                            className=" bg-transparent outline-none"
                            onChange={(e) => {
                              setData({
                                ...data,
                                fixed_time: format(
                                  new Date(
                                    `2/4/2024 ${(e.target as any).value}`
                                  ),
                                  "hh:mm a"
                                ),
                              });
                            }}
                          />
                        </div>
                      </span>
                    )}

                    <span className="flex   flex-col gap-1">
                      <label className="text-sm ">Active Status</label>
                      <div className="flex justify-between px-4 py-2 border-[1px] gap-6">
                        <span>Active</span>
                        <Switch
                          onCheckedChange={(value) => {
                          

                            setData({ ...data, status: data.status });
                          }}
                          className="text-[white] cursor-pointer"
                          defaultChecked={false}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-full bg-[#7655fa] text-white"
                onClick={() => {
                  if (data.title !== "") {
                    append(data);
                    setOpen(false)
                  }
                }}
              >
                Add Prayer Time
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPrayerTimeDialog;
