import React from "react";
import UpcomingEventCard from "./UpcomingEventCard";

import ArrowDownWhite from "./icons/ArrowDownWhite";
import ArrowDown from "./icons/ArrowDown";
const UpcomingEvents = () => {
  return (
    <div className=" flex flex-col rounded-md h-[900px] sm:min-w-[100%] md:min-w-[350px]  gap-4  p-4  bg-[white]">
      <h1 className="font-semibold text-[#4A4A4A] text-xl">Upcoming Events</h1>
      <div className="flex flex-col gap-5 max-h-[700px] overflow-auto ">
        <UpcomingEventCard />
        <UpcomingEventCard />
        <UpcomingEventCard />
        <UpcomingEventCard />
        <UpcomingEventCard />
      </div>
      <div className="flex gap-3 mt-4 justify-center items-center">
        <button className=" flex items-center gap-5 text-base rounded-full">
          <span className="rotate-[-270deg]">
            <ArrowDown />
          </span>
          Add New Event
        </button>
        <button className="bg-[#7655FA] px-7 py-3 text-white rounded-full">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
