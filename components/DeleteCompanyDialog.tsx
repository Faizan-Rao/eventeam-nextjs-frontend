"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { queryClient } from "./MainLayoutGrid";
import { Companies } from "@/configs/apiRoutes";
import { useTranslation } from "react-i18next";

const CompanyDeleteDialog = ({
  open,
  setOpen,
  data,
}: {
  data : any
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {t} = useTranslation(["translation"])
  const mutate = useMutation({
    mutationFn: Companies.delete,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["companies"]})
      toast("Delete Successfull", {
        type:"info"
      })
      setOpen(false)
    },
    onError : (error)=>{
      if ((error as any).status !== 200) {
              Object.values((error as any)?.response?.data.data ?? {}).forEach(
                (el: any) => {
                  el.forEach((el: any) => {
                    toast(el, { type: "error" });
                  });
                }
              );
            }
            setOpen(false)
    }
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 my-4">
              {/* Icon */}
              <span className="flex rounded-full justify-center bg-[#FF61611F]  items-center p-2">
                <span className="flex rounded-full bg-[#FF6161] justify-center items-center p-2">
                  <Trash className="text-white " />
                </span>
              </span>
              <div className="flex flex-1 flex-col gap-4">
                <h1 className="font-semibold text-lg text-[#4a4a4a] ">
                  {t("Are you sure you want to delete company?")}
                </h1>
                 
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button className="font-semibold active:scale-[0.90] transition-all text-base rounded-full px-4 py-2" onClick={()=>setOpen(false)}>
                {t("Close")}
              </button>

              <button onClick={()=>{mutate.mutate(data)}} className="bg-[#FF6161] active:scale-[0.90] transition-all font-semibold  text-base rounded-full px-6 text-white py-2">
                {t("Delete")}
              </button>
            </div>

            <div></div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyDeleteDialog;
