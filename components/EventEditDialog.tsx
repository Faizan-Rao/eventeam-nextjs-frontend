'use client'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "./ui/switch";
import { queryClient } from "./MainLayoutGrid";
import { useMutation } from "@tanstack/react-query";
import { Events } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const EventEditDialog = ({
  open,
  setOpen,
  data,
  children
}: {
  children? :React.ReactNode
  data:any
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: {
      status: data?.status ,
      current_status: data?.current_status 
    }
  });

  const pathname = usePathname()
  const mutate = useMutation({
    mutationFn: Events.save,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["my-events"], type:"all"})
      
      toast("Update Successfull", {
        type:"info"
      })
    },
    onError : ()=>{
      toast("Update Failed..", {
        type:"error"
      })
    }
  })
  const onSubmit = (formData:any)=>{
    console.log(formData)
    let payload = {...formData}
    payload.status = payload.status ? 1 : 0;
    payload.id = data.id
    mutate.mutate(payload)
  }
  const {t} = useTranslation(["translation"])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger> {children} </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Edit Status")}</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4  my-4 ">
              <span className=" flex-1 rounde-md flex flex-col gap-1">
                <label className="text-sm font-semibold ">{t("Activate Event")}</label>
                <span className="flex gap-4  border-2 p-2">
                  <span>{t("Active")}</span>
                  <Controller
                    name={"status"}
                    control={control}
                    render={({ field }) => (
                      <Switch
                      dir="ltr"
                        defaultChecked={data && data.status === 1 ? true : false}
                        onCheckedChange={(data) => field.onChange(data)}
                        className="text-[white] ml-auto justify-self-end cursor-pointer"
                      />
                    )}
                  />
                </span>
              </span>
              <span className=" flex-1 flex flex-col gap-1">
                <label className="text-sm font-semibold ">{t("Operation Type")}</label>

                <Controller
                  name={"current_status"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={data.current_status}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status.." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          {t("Active")}
                        </SelectItem>
                        <SelectItem value="ended">{t("Ended")}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </span>

              <div className="flex justify-end mt-4 gap-4">
                <button
                  className="font-semibold active:scale-[0.95] transition-all text-base rounded-full px-4 py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)}}
                >
                  {t("Close")}
                </button>

                <button onClick={() => setOpen(false)} className="bg-[#7655fa] active:scale-[0.95] transition-all font-semibold  text-base rounded-full px-6 text-white py-2">
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

export default EventEditDialog;
