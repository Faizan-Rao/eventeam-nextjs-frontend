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
import { Events } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { queryClient } from "./MainLayoutGrid";

const EventDeleteDialog = ({
  open,
  setOpen,
  data,
}: {
  data : any
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const mutate = useMutation({
    mutationFn: Events.delete,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["my-events"]})
      toast("Delete Successfull", {
        type:"info"
      })
    },
    onError : ()=>{
      toast("Delete Failed..", {
        type:"error"
      })
    }
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Event Deletion Confirmation</DialogTitle>
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
                  Are you sure you want to delete event?
                </h1>
                 
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button className="font-semibold active:scale-[0.95] transition-all text-base rounded-full px-4 py-2" onClick={()=>setOpen(false)}>
                Close
              </button>

              <button onClick={()=>{mutate.mutate(data.id)}} className="bg-[#FF6161] active:scale-[0.95] transition-all font-semibold  text-base rounded-full px-6 text-white py-2">
                Delete
              </button>
            </div>

            <div></div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventDeleteDialog;
