"use client";
import { clsx } from "clsx";
import {
  AtSign,
  Calendar,
  EllipsisVertical,
  MapPin,
  Phone,
  Smartphone,
  Ticket,
  Trash,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ICompanyCard {
  logo?: string;
  name: string;
  loggedin: boolean;
  phone: string;
  address: string;
  email: string;
  stripe: boolean;
  event:string,
  date: string,
  ticket: string
}
const LeadsCard: React.FC<ICompanyCard> = ({
  logo = "/profile_logo.svg",
  name = "No Name",
  loggedin = false,
  address = "No address",
  email = "No Email",
  phone = "No Phone",
  stripe = false,
  event="",
  date="",
  ticket=""
}) => {
  return (
    <div className="flex-1 min-w-[350px] sm:max-w-[90%] md:max-w-[50%]  flex  gap-5 p-6 flex-col bg-white rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center border-b-[1px] pb-5 gap-4">
            <div className="bg-[#7655FA] rounded-full text-white p-2">

         <UserCircle />
            </div>
          <div className="flex flex-col">
            <span className="text-[#4a4a4a] font-semibold text-lg">{name}</span>
            <span className=" text-[#7655FA] font-semibold text-sm">{event}</span>
           
          </div>
        </div>
        {/* <button><Trash color="red"/></button> */}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-5 ">
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
        <div className="flex-1 flex  items-center gap-4">
          <span className="p-2 bg-[#C655FA] rounded-full">
            <AtSign className="text-white" />
          </span>
          <div className="flex flex-wrap flex-col ">
            <span className="text-sm font-semibold text-[#999999]">Email</span>
            <p className="text-[#4a4a4a] text-wrap font-semibold break-words text-sm">{email}</p>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row gap-5  flex-wrap"> */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5  place-content-center">
      <div className="flex-1 flex items-center gap-4"> 
        <span className="p-2 bg-[#7655FA] rounded-full">
          <Ticket className="text-white" />
        </span>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold text-[#999999]">Ticket Type</span>
          <p className="text-[#4a4a4a] font-semibold text-base">{ticket}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <span className="p-2 bg-[#7655FA] rounded-full">
          <Calendar className="text-white" />
        </span>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold text-[#999999]">Event Date</span>
          <p className="text-[#4a4a4a] font-semibold text-base">{date}</p>
        </div>
      </div>
      </div>
      
   
    </div>
  );
};

export default LeadsCard;
