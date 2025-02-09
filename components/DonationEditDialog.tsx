import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, PencilLine, Plus } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { queryClient } from "./MainLayoutGrid";
import { useTranslation } from "react-i18next";

const DonationEditDialog = ({ data }: { data: any }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
      amount: data.amount,
      status: data.status,
    },
  });

  const watch = useWatch({ control });
  const {t} = useTranslation(["translation"])
  const mutate = useMutation({
    mutationFn: Donations.update,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["donations"]})
      toast("Updated Successfully...", {
        type: "success"
      })
      setOpen(false)
    },
    onError: ()=>{
      toast("Updation Failed...", {
        type: "error"
      })
    }
  })
  const onSubmit = (formData: any) => {
    let payload = {...formData}
    payload["status"] = payload.status ? 1 : 0
    payload["id"] = data.id
    // console.log(payload)
    mutate.mutate(payload)
  };

  const [open , setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="flex p-2 active:scale-[0.90] transition-all items-center hover:bg-[#7655fa26] rounded-full justify-center">
          <PencilLine className="text-[#7655fa]" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Edit Donation")}</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col my-4 gap-4 "
            >
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                 {t("Donation Name")}
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                  {...register("title")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                 {t("Donation Description")}
                </span>
                <textarea
                  placeholder="Description"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                  {...register("description")}
                />
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
                    {...register("amount")}
                    defaultValue={watch.amount}
                    onChange={(e) => null}
                  />
                  <DollarSign size={18} />
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Status")}
                </span>
                <div className="flex justify-between border-[1px] gap-4 rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">{t("Active")}</span>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                      dir="ltr"
                        defaultChecked={data.status === 1 ? true : false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-4">
                <button className="px-4 active:scale-[0.95] transition-all py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
                  {t("Save Changes")}
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DonationEditDialog;
