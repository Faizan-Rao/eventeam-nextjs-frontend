import React from "react";
import UpcomingEventCard from "./UpcomingEventCard";
const UpcomingEvents = () => {
  return (
    <div className=" flex flex-col rounded-md h-[900px] min-w-[350px]   p-4  bg-[white]">
      <h1 className="font-semibold text-[#4A4A4A] text-xl">Upcoming Events</h1>
      <div className="flex flex-col">
            <UpcomingEventCard/>
      </div>
    </div>
  );
};

export default UpcomingEvents;
