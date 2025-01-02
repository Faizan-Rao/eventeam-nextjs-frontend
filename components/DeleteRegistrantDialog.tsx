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
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

const DeleteEventRegistrantDialog = ({
  guestId,
  data,
  formData,
}: {
  guestId:number
  data: any;
  formData: any;
}) => {
  const [open, setOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const { replace } = useFieldArray({ control, name: "guests" });
  const watch = useWatch({ control });

  const deleteGuest = () => {
    const guests = [...watch.guests];
    const index = guests.findIndex((el, index) => index === guestId);
    guests.splice(index, 1);
    replace(guests);

    const subevent = data.subEvents;
    let ticketsPrice = 0
    console.log("deleteformData" , formData)
    formData && formData.sub_events.forEach((el: any) => {
      el.products.forEach((el2: any) => {
        if (subevent.includes(el2.id)) {
          ticketsPrice += el2.price;
        }
      });
    });
    
    const finalPrice = (parseFloat(watch.totalAmount) - ticketsPrice ) > 0 ? parseFloat(watch.totalAmount) - ticketsPrice : 0

    setValue("totalAmount", `${finalPrice}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash
          className="text-[#ff00009d] cursor-pointer p-2 hover:bg-[#ff000026] rounded-full "
          size={37}
          strokeWidth={1.2}
        />
      </DialogTrigger>
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
                <h1 className=" text-lg text-[#4a4a4a] ">
                  Are you sure you want to delete event?
                </h1>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="font-semibold text-base rounded-full px-4 py-2"
                onClick={() => setOpen(false)}
              >
                Close
              </button>

              <button
                onClick={deleteGuest}
                className="bg-[#FF6161] font-semibold  text-base rounded-full px-6 text-white py-2"
              >
                Delete
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventRegistrantDialog;
