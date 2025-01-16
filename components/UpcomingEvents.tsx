import React from "react";
import UpcomingEventCard from "./UpcomingEventCard";

import ArrowDown from "./icons/ArrowDown";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
const UpcomingEvents = ({ data }: { data: any }) => {
  console.log("upcoming event data", data);
  return (
    <div className="flex flex-col sm:min-w-[100vw] md:min-w-[350px]  rounded-md  max-h-[700px] gap-4  p-6  bg-[white]">
      <h1 className="font-semibold text-[#4A4A4A] text-xl">Upcoming Events</h1>
      <div className="flex  flex-1 flex-col gap-5 overflow-auto md:overflow-x-hidden ">
        {/* Skeleton Loader */}
        {/* {(data?.data?.["upcoming_events"] || []).length <= 0 && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )} */}
       {(data?.data?.["upcoming_events"] || []).length <= 0 && (
          <p className="border-[4px] p-4 border-dashed text-center text-[#999999]">No Upcoming Events Right Now</p>
        )} 

        {(data?.data?.["upcoming_events"] || []).length > 0 &&
          data?.data?.["upcoming_events"].map((el: any, index: number) => {
            
            return <UpcomingEventCard key={index} data={el} />;
          })}
      </div>
      <div className="flex gap-3 mt-4 justify-center items-center">
        <Link href={"/dashboard/add-event"} className=" flex active:scale-[0.95] transition-all text-nowrap px-4 py-2 items-center gap-3 mr-4 text-base rounded-full">
          <span className="rotate-[-270deg]">
            <ArrowDown />
          </span>
          Add New Event
        </Link>
        <Link href={"/dashboard/my-events"} className="bg-[#7655FA] text-nowrap px-4 text-base py-2 active:scale-[0.95] transition-all text-white rounded-full">
          View All Events
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
