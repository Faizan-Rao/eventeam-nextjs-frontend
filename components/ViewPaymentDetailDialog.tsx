"use client";
import React, { Children, useContext, useState } from "react";
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

import {
  Calendar,
  Eye,
  EyeIcon,
  PencilLine,
  User,
  UserRound,
} from "lucide-react";

import { Payment } from "./tables/PaymentDetail/column";
import { Row } from "@tanstack/react-table";
import { clsx } from "clsx";
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ViewPaymentDetailDialog = ({ row, children }: { row?: Row<Payment>, children? : React.ReactNode }) => {
  const [status, setSetStatus] = useState(row?.original?.status as any);
  const [open, setOpen] = useState(false);
  const { data, setData }: any = useContext(PaymentDetailContext);

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="md:block sm:hidden">
        <EyeIcon className="text-[#c2c2c2]" />

        </span>
        <span className="sm:flex flex-col items-start md:hidden">{children}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Payment Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex-1 max-h-[600px] px-2 overflow-y-scroll">
          <div className="  flex flex-col gap-4  o">
            <div className="flex border-b-[1px] pb-5 justify-between mt-4 gap-4">
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
                  {row?.original?.status === "Pending" ? "Pending" : "Cleared"}
                </span>
                <p className="text-sm text-[#tatata] font-semibold">
                  {row?.original?.date}
                </p>
                <p className="text-sm text-[#tatata] font-semibold">
                  {`Reg-${row?.original?.id}`}
                </p>
              </div>
            </div>

            <h1 className="text-[#7655FA] font-semibold text-base">
              Guest List
            </h1>
            <div className=" flex flex-col gap-3 w-full flex-1">
              {row?.original?.event_reg.guest.map((el, i) => {
                return (
                  <Accordion type="single" collapsible key={i + el.name}>
                    <AccordionItem
                      value="item-1"
                      className=" max-w-[600px] bg-[#7655FA26] px-2 rounded-md border-2"
                    >
                      <AccordionTrigger className="text-left">
                        <div className="flex px-5 py-1 items-center no-underline gap-4">
                          <div className="bg-[#7655fa] p-2 rounded-full">
                            <User size={26} className="text-white" />
                          </div>
                          <div className="flex self-start flex-col">
                            <h1 className=" text-lg font-semibold">
                              {el.name}
                            </h1>
                            <span className="flex gap-4">
                              <p className=" text-sm">{el.email}</p>
                              <p className=" text-sm">{el.phone}</p>
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4">
                        <div className="flex  justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <span className="bg-[#7655FA26] p-2 rounded-md">
                              <Calendar className="text-[#7655fa]" />
                            </span>
                            <div className="flex flex-col flex-1 text-nowrap">
                              <h1 className=" font-semibold text-sm">
                                Ticket Type
                              </h1>
                              <p className="text-lg font-semibold">
                                {el.ticket_type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="bg-[#7655FA26] p-2 rounded-md">
                              <UserRound className="text-[#7655fa]" />
                            </span>
                            <div className="flex  flex-col gap-2">
                              <h1 className=" font-semibold text-sm">
                                Events Attending
                              </h1>
                              <div className="flex flex-wrap gap-1">
                                {el.events.map((item) => (
                                  <p className="text-sm px-2 py-1 rounded-full bg-[#7655FA26] font-semibold" key={i + item}>
                                    {item}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
            <h1 className="text-[#7655FA] font-semibold text-base">
              Price Breakdown
            </h1>
            <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
              {row?.original?.event_reg.price_breakdown.map((el, i) => {
                return (
                  <div className="flex gap-4 text-base justify-between" key={i + el.value}>
                    <p className="font-semibold px-2">{el.type}</p>
                    <p className="font-semibold px-2">{el.value}</p>
                  </div>
                );
              })}
            </div>
            <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
              <div className="flex gap-4 text-base justify-between">
                <p className="font-semibold px-2">Total</p>
                <p className="font-semibold px-2">{row?.original?.event_reg.total_amount}</p>
              </div>
              
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPaymentDetailDialog;
