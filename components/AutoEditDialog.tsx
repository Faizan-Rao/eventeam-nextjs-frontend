"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronRight, DollarSign, Plus } from "lucide-react";
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
import joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const AutoEditDialog = ({ data, type }: { data?: any; type?: string }) => {
  const defaultValues = {
    title: data?.title,
    start_date: data?.start_date,
    end_date: data?.end_date,
    is_active: data?.status === 1 ? true : false,
  };
  const schema = joi
    .object({
      title: joi.string().required(),
      start_date: joi.date().required(),
      end_date: joi.date().required(),
      is_active: joi.number().required(),
    })
    .required();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (values, context, options) => {
      const resolver = joiResolver(schema, {
        context,
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, context, options);
    },
    [`${type === "edit" && "defaultValues"}`]: defaultValues,
  });
  console.log("autoform data", {
    [`${type === "edit" && "defaultValues"}`]: defaultValues,
  });
  const [open, setOpen] = useState(false);
  const mutationEdit = useMutation({
    mutationFn: (formData)=> AutoFormAPI.save(formData, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auto_form"] });
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
  const mutationAdd = useMutation({
    mutationFn: AutoFormAPI.createAutoConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auto_form"] });
      toast("Creation Succesfull", {
        type: "success",
      });
    },
    onError: () => {
      toast("Creation Failed", {
        type: "error",
      });
    },
  });

  const watch = useWatch({ control });
  console.log("autoforms watch", errors);
  const onSubmit = (formData: any) => {
    if(type === "edit")
    {
      mutationEdit.mutate(formData);
      setOpen(false);
      return
    }
    if( type === "add")
      {
      mutationAdd.mutate(formData);
      setOpen(false);
      return

    }
    
    console.log("autoform submit", formData);
  };

  console.log("autoform params", data);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="active:scale-[0.95] transition-all justify-self-center">
        {" "}
        {type !== "add" ? (
          <ChevronRight className="text-white " />
        ) : (
          <div className="flex gap-4  items-center bg-[#7655fa] rounded-full text-white px-4 py-2">
            <Plus size={18} /> <p className="sm:hidden lg:block">Add Autoform</p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{type === "add" && "Add AutoForm"}</DialogTitle>
        <DialogHeader>
          <DialogTitle>{data?.title}</DialogTitle>
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
                    defaultValue={data?.title}
                    {...register("title")}
                  />
                </div>
                {
                  errors.title && <span className="text-red-800">Title is required.</span>
                }
              </div>

              <div className="flex flex-col gap-2 ">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Status
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">Active</span>
                  <Switch
                    defaultChecked={(data?.status || watch?.is_active) === 1 ? true : false}
                    
                    onCheckedChange={(value) =>
                    setValue("is_active", value ? 1 : 0)
                    }
                  />
                 
                </div>
              </div>

              <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  Start Date
                </label>
                <input
                  type="date"
                  className="border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  // {...register("start_date")}
                  value={data?.start_date && `${
                  new Date(`${watch.start_date}`).toISOString().split("T")[0]
                  }`}
                  onChange={(e) =>
                    setValue("start_date", new Date(e.target.value))
                  }
                />
                {
                  errors.start_date && <span className="text-red-800">Start Date is required.</span>
                }
              </div>

              <div className="flex justify-between flex-col">
                <label className={"text-[#4a4a4a] mb-1 font-semibold text-sm"}>
                  End Date
                </label>
                <input
                  type="date"
                  className=" border-[1px] outline-none p-2 rounded-lg w-full cursor-pointer"
                  // {...register("end_date")}
                  value={data?.end_date && `${
                    new Date(`${watch.end_date}`).toISOString().split("T")[0]
                    }`}
                  onChange={(e) =>
                    setValue("end_date", new Date(e.target.value))
                  }
                />
               { errors?.end_date && <span className="text-red-800">End Date is required.</span>}
              </div>

              <div className="flex justify-end items-center gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 active:scale-[0.90] transition-all bg-[#7655fa] text-white rounded-full"
                >
                  {" "}
                  {type !== "add" ? "Save Changes" : "Add Autoform"}
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
