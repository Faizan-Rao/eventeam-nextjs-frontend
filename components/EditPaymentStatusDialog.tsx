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
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { Payments } from "@/configs/apiRoutes";
import { queryClient } from "./MainLayoutGrid";
import { toast } from "react-toastify";

const EditPaymentStatusDialog = ({ row }: { row: Row<any> }) => {
  const [status, setSetStatus] = useState(row?.original?.payment_status);
  const [open, setOpen] = useState(false);
  // const { data, setData } : any = useContext(PaymentDetailContext);
  const mutation = useMutation({
    mutationFn: Payments.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["payments"]})
      toast("Status Updated", {type:"success"})
      setOpen(false);
    },
    onError: () => {
      toast("Status Not Updated", {type:"error"})
      setOpen(false);
    },
  })
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
                  <h1 className="  font-semibold text-2xl text-black">
                    {row?.original?.event.title}
                  </h1>
                  <p className="text-sm text-[#tatata] font-semibold">
                 {(row?.original?.created_at.split("T")[0])}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span
                    className={clsx(
                      " px-4 py-1 rounded-full text-black text-center text-nowrap",
                      row?.original?.payment_status === "pending" && "bg-[#FBE394]",
                      row?.original?.payment_status !== "pending" && "bg-[#C2FFCC]"
                    )}
                  >
                    { row?.original?.payment_status === "pending"
                      ? "Pending"
                      : "Cleared"}
                  </span>
                  {/* <p className="text-sm text-[#tatata] font-semibold">
                    { new Date(row?.original?.created_at).toLocaleDateString()}
                  </p> */}
                  <p className="text-sm text-[#tatata] font-semibold">
                    {`Reg-${row?.original?.reg_id}`}
                  </p>
                </div>
              </div>

              <div className="my-5 flex flex-col gap-2 ">
              <h1 className="text-[#7655fa]  font-semibold text-sm">
                   Payment Status
                  </h1>
                <Select onValueChange={setSetStatus}>
                  <SelectTrigger >
                    <SelectValue
                    className="text-base"
                      placeholder={ row?.original?.payment_status}
                      defaultValue={ row?.original?.payment_status}
                    />
                  </SelectTrigger>
                  <SelectContent className="text-base" >
                    <SelectItem className="cursor-pointer " value="pending">Pending</SelectItem>
                    <SelectItem className="cursor-pointer " value="cleared">Cleared</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end my-6 gap-6">
              <button className="font-semibold  text-sm" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-[#7655fa] px-5 py-2  text-sm rounded-full text-white"
                onClick={() => {
                  
                 

                  mutation.mutate(row?.original?.id)
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
