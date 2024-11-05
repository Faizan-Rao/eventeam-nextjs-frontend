import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronRight, DollarSign } from "lucide-react";
import { register } from "module";
import { Controller, useForm } from "react-hook-form";
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
  const onSubmit = (formData: any) => {
   const payload = {...formData}
   payload["id"] = data.id
   mutation.mutate(payload)
  };
  return (
    <Dialog>
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
                    defaultValue
                    render={({ field }) => (
                      <Switch
                       
                        defaultChecked={data.status === 1 ? true : false}
                        onCheckedChange={field.onChange}
                        
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  Start Date
                </label>
                <input
                  type="date"
                  defaultValue={data.start_date}
                  className="border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  {...register("start_date")}
                />
              </div>
              <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  End Date
                </label>
                <input
                  type="date"
                  className=" border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  defaultValue={data.end_date}
                  {...register("end_date")}
                />
              </div>
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
