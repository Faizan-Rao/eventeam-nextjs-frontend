"use client";
import React, { useContext, useState } from "react";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PencilLine } from "lucide-react";


import { Row } from "@tanstack/react-table";
import { clsx } from "clsx";
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";

const EditPaymentStatusDialog = ({ row }: { row: Row<any> }) => {
  const [status, setSetStatus] = useState(row?.original?.status);
  const [open, setOpen] = useState(false);
  const { data, setData } : any = useContext(PaymentDetailContext);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine className="text-[#c2c2c2] " />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment Status</DialogTitle>
          <DialogDescription>
            <div className=" flex flex-col gap-4 max-h-[600px] overflow-y-scroll">
              <div className="flex justify-between my-4 gap-4">
                <div className="flex flex-col gap-2">
                  <h1 className="text-[#7655fa] font-semibold text-sm">
                    Registration Details
                  </h1>
                  <h1 className="  font-semibold text-3xl text-black">
                    {row?.original?.name}
                  </h1>
                  <p className="text-sm text-[#tatata] font-semibold">
                    {row?.original?.date}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span
                    className={clsx(
                      " px-4 py-1 rounded-full text-black text-center text-nowrap",
                      row?.original?.status === "Pending" && "bg-[#FBE394]",
                      row?.original?.status !== "Pending" && "bg-[#C2FFCC]"
                    )}
                  >
                    { row?.original?.status === "Pending"
                      ? "Pending"
                      : "Cleared"}
                  </span>
                  <p className="text-sm text-[#tatata] font-semibold">
                    { row?.original?.date}
                  </p>
                  <p className="text-sm text-[#tatata] font-semibold">
                    {`Reg-${row?.original?.id}`}
                  </p>
                </div>
              </div>

              <div className="my-5 flex place-items-center ">
                <Select onValueChange={setSetStatus}>
                  <SelectTrigger >
                    <SelectValue
                    className="text-base"
                      placeholder={ row?.original?.status}
                      defaultValue={ row?.original?.status}
                    />
                  </SelectTrigger>
                  <SelectContent className="text-base" >
                    <SelectItem className="cursor-pointer " value="Pending">Pending</SelectItem>
                    <SelectItem className="cursor-pointer " value="Cleared">Cleared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end my-6 gap-6">
              <button className="font-semibold  text-base" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-[#7655fa] px-5 py-2  text-base rounded-full text-white"
                onClick={() => {
                  const newArr = [...data];

                  const item: any = newArr.find(
                    (el) => el.id === row?.original?.id
                  );
                  item.status = status;
                  setData(newArr);

                  setOpen(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentStatusDialog;
