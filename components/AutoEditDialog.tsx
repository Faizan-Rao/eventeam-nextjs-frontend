'use client'
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronRight, DollarSign } from "lucide-react";
import { register } from "module";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { queryClient } from "./MainLayoutGrid";
import { AutoFormAPI } from "@/configs/apiRoutes";

const AutoEditDialog = ({ data }: { data: any }) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      start_date: data.start_date,
      end_date: data.end_date ,
      is_active: data.status === 1 ? true : false
    },
  });

  const [open, setOpen] = useState(false)
    const mutation = useMutation({
      mutationFn: AutoFormAPI.save,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["auto_form"]})
        toast("Saved changes...", {
          type: "info",
        });
      },
      onError: () => {
        toast("Changes not saved", {
          type: "error",
        });
      },
    });

    const watch = useWatch({control})
    console.log("autoforms watch", watch)
  const onSubmit = (formData: any) => {
   const payload = {...formData}
   payload["id"] = data.id
   mutation.mutate(payload)
   setOpen(false)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {" "}
        <ChevronRight className="text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-4 mt-4 rounded-md bg-white "
            >
              <div className="flex flex-col gap-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Title
                </span>

                <div className="flex gap-4  border-[1px] rounded-md items-center ">
                  <input
                    type="text"
                    className=" outline-none p-2 flex-1"
                    placeholder="Enter application fee text"
                    defaultValue={data.title}
                    {...register("title")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 ">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Status
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">Active</span>
                  <Controller
                    name="is_active"
                    control={control}
                    
                    render={({ field }) => (
                      <Switch
                       
                        defaultChecked={data.status === 1 ? true : false}
                        onCheckedChange={field.onChange}
                        
                      />
                    )}
                  />
                </div>
              </div>

             {watch.start_date && <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  Start Date
                </label>
                <input
                  type="date"
                  className="border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  // {...register("start_date")}
                  value={`${new Date(watch.start_date)
                    .toISOString()
                    .split("T")[0]}`}
                  
                  onChange={(e) => setValue("start_date", new Date(e.target.value))}
                />
              </div>}
             {watch.end_date && <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  End Date
                </label>
                <input
                  type="date"
                  className=" border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  // {...register("end_date")}
                  value={`${new Date(watch.end_date)
                    .toISOString()
                    .split("T")[0]}`}
                 
                  onChange={(e) => setValue("end_date", new Date(e.target.value))}
                  />
              </div>}
              <div className="flex justify-end items-center gap-4">
                <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
                  Save Changes
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AutoEditDialog;
