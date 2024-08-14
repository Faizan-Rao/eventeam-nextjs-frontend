import React from "react";
import clsx from "clsx";
import Calendar from "./icons/Calendar";
import DotThreeVertical from "./icons/DotThreeVertical";

const UpcomingEventCard = () => {
  const status = false;
  return (
    <div className="flex flex-col gap-4 p-4 bg-[#F7F6F9] rounded-md">
      {/* header */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-[#4A4A4A] text-base">
            The New Year Eve
          </h1>
          <span className="flex place-items-center gap-5">
            <span
              className={clsx(
                "h-[10px] w-[10px] rounded-full bg-[#1EFF00]",
                !status && "bg-[#FF0000]"
              )}
            />
            <span className="font-semibold text-sm text-[#999999]">
              {status ? "Active" : "Inactive"}
            </span>
          </span>
        </div>
        <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-end cursor-pointer  rounded-full">
          <DotThreeVertical />
        </div>
      </div>

      {/* data sections */}
      <div className="flex border-t-[1px] justify-between">
        <div className="flex  gap-2 p-2  bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <Calendar />
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">Dates</p>
            <p className="text-[#4A4A4A] text-sm font-semibold flex  ">
              Dec 31 - Jan 1
            </p>
          </div>
        </div>

        <div className="flex  gap-3 p-2  bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <Calendar />
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">Guests</p>
            <p className="text-[#4A4A4A] text-sm font-semibold flex  ">
              Dec 31 - Jan 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
