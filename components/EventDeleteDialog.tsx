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

const EventDeleteDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
              <div className="flex flex-1 flex-col">
                <h1 className="font-semibold text-lg text-[#4a4a4a] ">
                  Are you sure you want to delete event?
                </h1>
                <p className="text-[#999999]">
                  Confirming this dialogue box will permanently delete the event
                  and all it’s data.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button className="font-semibold text-base rounded-full px-4 py-2" onClick={()=>setOpen(false)}>
                Close
              </button>

              <button className="bg-[#FF6161] font-semibold  text-base rounded-full px-6 text-white py-2">
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
