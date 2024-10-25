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


import { Row } from "@tanstack/react-table";
import { clsx } from "clsx";
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

const DashboardPaymentViewModal = ({ row, children }: { row?: any, children? : React.ReactNode }) => {
  const [status, setSetStatus] = useState(row?.original?.status as any);
  const [open, setOpen] = useState(false);
  const { data, setData }: any = useContext(PaymentDetailContext);

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className="block">
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
                  {row?.event.title}
                </h1>
                <p className="text-sm text-[#tatata] font-semibold">
                {format(new Date(row?.event['start_date']), 'LLL d') + " - " + format(new Date(row?.event['end_date']), 'LLL d')}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span
                  className={clsx(
                    " px-4 py-1 rounded-full text-black text-center text-nowrap",
                    row?.payment_clear === "0"  && "bg-[#FBE394]",
                    row?.payment_clear === "1"  && "bg-[#C2FFCC]"
                  )}
                >
                  {row?.payment_clear === "0" ? "Pending" : "Cleared"}
                </span>
                <p className="text-sm text-[#tatata] font-semibold">
                  {row?.created_at.split('T')[0]}
                </p>
                <p className="text-sm text-[#tatata] font-semibold">
                  {row?.reg_id}
                </p>
              </div>
            </div>

            <h1 className="text-[#7655FA] font-semibold text-base">
              Guest List
            </h1>
            <div className=" flex flex-col gap-3 w-full flex-1">
              {row?.guests.map((el : any, i : number) => {
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
                              <p className="text-base font-semibold">
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
                                {el.guest_details.map((item :any ) => (
                                  <p className="text-sm px-2 py-1 rounded-full bg-[#7655FA26] font-semibold" key={i + item}>
                                    {row?.event.sub_events.map((el : any)=>{
                                       
                                        return item.sub_event_id === `${el.id}` && el.title  
                                    })}
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
              {row?.event.sub_events.map((el:any, i:number) => {
               return row?.price_breakdown[`${el.id} - ${el.title}`]?.['guests'].map((item:any, i:number) => {

                    return (
                      <div className="flex gap-4 text-base justify-between" key={i + item.value}>
                        <p className="font-semibold px-2">{`${item.total_seats} x ${item.ticket_type} `}</p>
                        <p className="font-semibold px-2">${item.total_price}</p>
                      </div>
                    );

                })
              })}
            </div>
            <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
              <div className="flex gap-4 text-base justify-between">
                <p className="font-semibold px-2">Total</p>
                <p className="font-semibold px-2">${row?.total_amount}</p>
              </div>
              
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPaymentViewModal;
