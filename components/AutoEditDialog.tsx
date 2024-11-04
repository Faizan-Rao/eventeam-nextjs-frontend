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

const AutoEditDialog = ({data} : {data: any}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const mutation = useMutation({
  //     mutationFn: () => null,
  //     onSuccess: () => {
  //       toast("Application Fields Saved", {
  //         type: "success",
  //       });
  //     },
  //     onError: () => {
  //       toast("Application Fields Not Saved", {
  //         type: "error",
  //       });
  //     },
  //   });
  const onSubmit = (data: any) => {
    try {
      if (!data) {
        throw new Error("Data is Empty...!");
      }
      let payload = { ...data };
      if (payload["is_show_app_fee"] !== "1") {
        payload["is_default_app_fee"] = 1;
        payload["is_show_app_fee"] = 0;
      } else {
        payload["is_show_app_fee"] = 1;
        payload["is_default_app_fee"] = 0;
      }

      //   mutation.mutate(payload);
    } catch (error) {
      console.error(error);
      toast("Application Fields Not Saved", {
        type: "error",
      });
    }
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
                    {...register("application_fee_text")}
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
                    name="guest_name_required"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={"guest_name_required"}
                      />
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-between flex-col">
                  <label
                    className={
                      "text-[#4a4a4a] mb-1 font-semibold text-sm"
                    }
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                    {...register("gen_info.start_date", { required: true })}
                  />
                </div>
                <div className="flex justify-between flex-col">
                  <label
                    className={
                      "text-[#4a4a4a] mb-1 font-semibold text-sm"
                    }
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    className=" border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                    {...register("gen_info.start_date", { required: true })}
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
