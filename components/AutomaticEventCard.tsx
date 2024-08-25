import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import React from "react";

interface IAutmaticEventCard {
  event: {
    title: string;
    description: string;
    start_date: string;
    status: boolean;
  };
}
const AutomaticEventCard: React.FC<IAutmaticEventCard> = ({ event }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-grow md:flex-grow lg:flex-grow-0 md:min-w-[400px]  border-[1px] rounded-md min-h-[200px] p-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col ">
          <h1 className="text-[#4a4a4a] text-2xl font-semibold">{event.title}</h1>
          <h1 className="text-[#4a4a4a]">{event.description}</h1>
        </div>

        <div
          className={clsx(
            "px-4 py-1 rounded-full",
            event.status === true && "bg-[#C2FFCC]",
            event.status === false && "bg-[#FFC2C2]"
          )}
        >
          {event.status ? "Active" : "Inactive"}
        </div>
      </div>

      <div className="flex justify-between items-center rounded-md border p-4 bg-[#7655fa]">
        <div className="flex flex-col ">
          <h1 className="text-white text-xl font-semibold">{event.start_date}</h1>
          <h1 className="text-[#e8e8e8] text-sm">Start date</h1>
        </div>
        <span className="hover:bg-[#45309b] rounded-full transition-all p-1">
        <ChevronRight className="text-white"/>

        </span>
      </div>
    </div>
  );
};

export default AutomaticEventCard;
