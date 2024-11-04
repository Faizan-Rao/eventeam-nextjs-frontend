import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import React from "react";
import format from 'html-react-parser'
import {format as dateFormatter} from 'date-fns'
import AutoEditDialog from "./AutoEditDialog";
const AutomaticEventCard = ({ event } : {event:any}) => {
  return (
    <div className="flex-1 flex flex-col gap-4 w-auto min-w-[350px]  border-[1px] rounded-md  p-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col text-nowrap ">
          <h1 className="text-[#4a4a4a] text-2xl font-semibold">{event.title.length > 15 ? event.title.slice(0, 15) + "..." : event.title}</h1>
          <h1 className="text-[#4a4a4a]">{format(event.description.length > 20 ? event.description.slice(0, 35) + "..." : event.description || "No description" )}</h1>
        </div>

        <div
          className={clsx(
            "px-4 py-1 rounded-full",
            event.status === 1 && "bg-[#C2FFCC]",
            event.status === 0 && "bg-[#FFC2C2]"
          )}
        >
          {event.status ? "Active" : "Inactive"}
        </div>
      </div>

      <div className="flex justify-between items-center rounded-md border p-4 bg-[#7655fa]">
        <div className="flex flex-col ">
          <h1 className="text-white text-xl font-semibold">{dateFormatter(event.start_date, 'PP')}</h1>
          <h1 className="text-[#e8e8e8] text-sm">Start date</h1>
        </div>
        <span className="hover:bg-[#45309b] rounded-full aspect-square object-cover h-[30px] w-[30px]  cursor-pointer transition-all p-1 ">
       <AutoEditDialog data={event}/>
       </span>
      </div>
    </div>
  );
};

export default AutomaticEventCard;
