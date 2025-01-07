"use client";
import { clsx } from "clsx";
import {
  AtSign,
  Banknote,
  Calendar,
  ChevronDown,
  CircuitBoard,
  EllipsisVertical,
  MapPin,
  Phone,
  Smartphone,
  Ticket,
  Trash,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import EditPaymentStatusDialog from "./EditPaymentStatusDialog";
import { data } from "./PaymentDetailMain";
import ViewPaymentDetailDialog from "./ViewPaymentDetailDialog";

interface ICompanyCard {
  logo?: string;
  name: string;
  loggedin: boolean;
  phone: string;
  address: string;
  email: string;
  stripe: boolean;
  event: string;
  date: string;
  ticket: string;
  index: number;
}
const LeadsCard: React.FC<any> = ({
  logo = "/profile_logo.svg",
  name = "No Name",
  loggedin = false,
  address = "No address",
  email = "No Email",
  phone = "No Phone",
  stripe = false,
  event = "",
  date = "",
  ticket = "",
  index,
  selectedRecord,
  setSelectedRecord
}) => {
 
  return (
    <>
      <div className="flex-1 min-w-[350px] shadow-md sm:max-w-[90%] md:max-w-[50%] sm:hidden md:flex   gap-5 p-6 flex-col bg-white rounded-lg">
        <div className="flex justify-between border-b-[1px] pb-5">
          <div className="flex items-center  gap-4">
            <div className="bg-[#7655FA] rounded-full text-white p-2">
              <UserCircle />
            </div>
            <div className="flex flex-col">
              <span className="text-[#4a4a4a] font-semibold text-lg">
                {name}
              </span>
              <span className=" text-[#7655FA] font-semibold text-sm">
                {event}
              </span>
            </div>
          </div>
          
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-5 ">
        <div className="flex-1 flex  items-center gap-4">
            <span className="p-2 bg-[#C655FA] rounded-full">
              <AtSign className="text-white" />
            </span>
            <div className="flex flex-wrap flex-col break-words break-all ">
              <span className="text-sm font-semibold text-[#999999]">
                Email
              </span>
              <p className="text-[#4a4a4a] text-wrap font-semibold break-words text-sm">
                {email}
              </p>
            </div>
          </div>
          <div className=" flex-1 flex items-start gap-4">
            <span className="p-2 bg-[#36ACCD] rounded-full">
              <Smartphone className="text-white" />
            </span>
            <div className="flex flex-col ">
              <span className="text-sm font-semibold text-[#999999]">
                Phone Number
              </span>
              <p className="text-[#4a4a4a] font-semibold text-sm">{phone}</p>
            </div>
          </div>
         
          <div className="flex-1 flex items-center gap-4">
            <span className="p-2 bg-[#7655FA] rounded-full">
              <Ticket className="text-white" />
            </span>
            <div className="flex flex-col ">
              <span className="text-sm font-semibold text-[#999999]">
                Ticket Type
              </span>
              <p className="text-[#4a4a4a] font-semibold text-base">{ticket}</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <span className="p-2 bg-[#7655FA] rounded-full">
              <Calendar className="text-white" />
            </span>
            <div className="flex flex-col ">
              <span className="text-sm font-semibold text-[#999999]">
                Event Date
              </span>
              <p className="text-[#4a4a4a] font-semibold text-base">{date}</p>
            </div>
          </div>
        </div>

        
      </div>
      <div className=" sm:flex md:hidden flex-1 min-w-full">

      <Accordion value={selectedRecord === index ? `item-${index}` : "No Element"}   type="single" className="transition-all min-w-full border-none outline-none shadow-md" collapsible>
        <AccordionItem
          value={`item-${index}`}
          className={clsx(" bg-[#F7F6F9] rounded-md  min-w-full")}
        >
          <AccordionTrigger onClick={()=>setSelectedRecord(index)} className="px-4  text-left">
            <div   className="flex justify-between ">
              <div className="flex items-center  pb-5 gap-4">
                <div className="bg-[#7655FA] rounded-full text-white p-2">
                  <UserCircle />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#4a4a4a] font-semibold text-lg">
                    {name}
                  </span>
                  <span className=" text-[#7655FA] font-semibold text-sm">
                    {event}
                  </span>
                </div>
              </div>
              {/* <button><Trash color="red"/></button> */}
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-none">
            <div  onClick={()=>setSelectedRecord(index)} className="grid sm:grid-cols-2 md:grid-cols-2  gap-5 ">
              <div className=" flex-1 flex items-start gap-4">
                <span className="p-2 bg-[#36ACCD] rounded-full">
                  <Smartphone className="text-white" />
                </span>
                <div className="flex flex-col ">
                  <span className="text-sm font-semibold text-[#999999]">
                    Phone Number
                  </span>
                  <p className="text-[#4a4a4a] font-semibold text-sm">
                    {phone}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex  items-center gap-4 break-words break-all">
                <span className="p-2 bg-[#C655FA] rounded-full">
                  <AtSign className="text-white" />
                </span>
                <div className="flex flex-wrap flex-col  ">
                  <span className="text-sm font-semibold text-[#999999]">
                    Email
                  </span>
                  <p className="text-[#4a4a4a] text-wrap font-semibold  text-sm">
                    {email}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <span className="p-2 bg-[#7655FA] rounded-full">
                  <Ticket className="text-white" />
                </span>
                <div className="flex flex-col ">
                  <span className="text-sm font-semibold text-[#999999]">
                    Ticket Type
                  </span>
                  <p className="text-[#4a4a4a] font-semibold text-base">
                    {ticket}
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4">
                <span className="p-2 bg-[#7655FA] rounded-full">
                  <Calendar className="text-white" />
                </span>
                <div className="flex flex-col ">
                  <span className="text-sm font-semibold text-[#999999]">
                    Event Date
                  </span>
                  <p className="text-[#4a4a4a] font-semibold text-base">
                    {date}
                  </p>
                </div>
              </div>
            </div>

           
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </>
  );
};

export default LeadsCard;
