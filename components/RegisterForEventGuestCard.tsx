"use client";
import { PencilLine, Trash, User } from "lucide-react";
import React from "react";
import DonationEditDialog from "./DonationEditDialog";

const RegisterForEventGuestCard = () => {
  return (
    <div className="grid  sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-3   gap-4 p-4 bg-[#F7F6F9] rounded-md">
      {/* User Info */}
      <div className="flex px-5 py-1 items-center min-w-[300px]  no-underline gap-4">
        <div className="bg-[#7655fa] p-2 rounded-full">
          <User size={26} className="text-white" />
        </div>
        <div className="flex flex-wrap flex-col ">
          <h1 className=" text-lg font-semibold">Ramzan Zahoor</h1>
          <span className="flex gap-1 flex-wrap">
            <p className=" text-sm text-[#999999] font-semibold">company@gmail.com</p>
            <p className=" text-sm text-[#999999] font-semibold">+9200000000</p>
          </span>
        </div>
      </div>
      {/* Event Info */}
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 mx-6   gap-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1 text-nowrap">
            <h1 className=" font-semibold text-[#999999] text-sm">Ticket Type</h1>
            <p className="text-lg font-semibold">Men</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex  flex-col gap-1">
            <h1 className=" font-semibold tex text-sm text-[#999999]">Sub Events</h1>
            <div className="flex flex-wrap">
              <p className="text-sm px-2 py-1 rounded-full bg-[white] border-[1px] font-semibold">
                Event
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className=" items-center sm:justify-center md:justify-end flex-1 flex gap-4 ">
        <span className="flex p-2 items-center hover:bg-[#7655fa26] rounded-full justify-center">
          <PencilLine className="text-[#7655fa]" strokeWidth={1.2} />
        </span>
        <Trash
          className="text-[#ff00009d] cursor-pointer p-2 hover:bg-[#ff000026] rounded-full "
          size={37}
          strokeWidth={1.2}
        />
      </div>

      <div></div>
    </div>
  );
};

export default RegisterForEventGuestCard;
