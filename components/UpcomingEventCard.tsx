import React from "react";
import clsx from "clsx";
import Calendar from "./icons/Calendar";
import DotThreeVertical from "./icons/DotThreeVertical";
import ViewEye from "./icons/ViewEye";
import UserFour from "./icons/UserFour";
import { format } from "date-fns";

const UpcomingEventCard = ({data} : {data: any}) => {
  const status = true;
  return (
    <div className="flex flex-col container  gap-4 p-4 bg-[#F7F6F9] rounded-md">
      {/* header */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-[#4A4A4A] text-base">
            {data['title']}
          </h1>
          <span className="flex place-items-center gap-5">
            <span
              className={clsx(
                "h-[10px] w-[10px] rounded-full bg-[#1EFF00]",
                data['status'] === "0" && "bg-[#FF0000]"
              )}
            />
            <span className="font-semibold text-sm text-[#999999]">
              {data['status'] === '1' ? "Active" : "Inactive"}
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
             {format(new Date(data['start_date']), 'LLL d') + " - " + format(new Date(data['end_date']), 'LLL d')}
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
              {data['registrations'].length}
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
