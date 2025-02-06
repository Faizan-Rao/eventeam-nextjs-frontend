import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, DollarSign, Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm, } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { queryClient } from "./MainLayoutGrid";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const DonationAddDialog = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutate = useMutation({
    mutationFn: Donations.add,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["donations"]})
      toast("Created Successfully...", {
        type:"success"
      })
     reset()
     setOpen(false)
    },
    onError: ()=>{
      toast("Creation Failed...", {
        type:"error"
      })
    }
  })
  const onSubmit = (data: any)=>{
    let payload = {...data}
    payload['amount'] = `${parseInt(data.amount)}`
    mutate.mutate(payload)
  }
  const {t} = useTranslation(["translation"])
  const [open ,setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex justify-self-center items-center active:scale-[0.95] transition-all sm:gap-1 md:gap-4 px-4 py-2 bg-[#7655fa] rounded-full text-white">
          <Plus />
          <span className=" sm:hidden md:block sm:text-sm">{t("Add New Donation")}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add New Donation")}</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-4 gap-4 ">
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Donation Name")}
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                  {...register("title", {required: true})}
                />
                {errors.title && <span className="text-red-800">This field is required.</span>}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Donation Description")}
                </span>
                <textarea
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                  {...register("description")}
                />
                {errors.description && <span className="text-red-800">This field is required.</span>}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                {t("Amount")}
                </span>

                <div className="flex gap-4  border-[1px] rounded-md items-center px-3 ">
                  <input
                    type="number"
                    className=" outline-none p-2 flex-1"
                    placeholder="Enter Price"
                    min={0}
                    defaultValue={0}
                    {...register("amount", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  <DollarSign size={18} />
                </div>
                {errors.amount && <span className="text-red-800">This field is required.</span>}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Status")}
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2 gap-4">
                  <span className="text-[#4a4a4a] ">{t("Active")}</span>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                      dir="ltr"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-4">
                <button className="px-4 active:scale-[0.95] transition-all py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
                {t("Add Donation")}
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DonationAddDialog;
