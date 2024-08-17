import React from "react";
import clsx from "clsx";
import Calendar from "./icons/Calendar";
import DotThreeVertical from "./icons/DotThreeVertical";
import ViewEye from "./icons/ViewEye";
import UserFour from "./icons/UserFour";

const UpcomingEventCard = () => {
  const status = true;
  return (
    <div className="flex flex-col container  gap-4 p-4 bg-[#F7F6F9] rounded-md">
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
        <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-end items-center cursor-pointer  rounded-full">
          <DotThreeVertical />
        </div>
      </div>

      {/* data sections */}
      <div className="flex border-t-[1px] gap-4 pt-4 justify-between items-center">
        <div className="flex items-center gap-2    bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <Calendar />
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">Dates</p>
            <p className="text-[#4A4A4A] text-nowrap text-[12.5px]  font-semibold flex  ">
              Dec 31-Jan 1
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3  bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <UserFour/>
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">Guests</p>
            <p className="text-[#4A4A4A] text-[12.5px]    font-semibold flex  ">
              0
            </p>
          </div>
        </div>
        {status && (
          <span className="cursor-pointer justify-self-end self-center">
            <ViewEye />
          </span>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventCard;