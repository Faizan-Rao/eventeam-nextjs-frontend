import { clsx } from "clsx";
import { ChevronRight } from "lucide-react";
import React from "react";
import parser from "html-react-parser";
import { format as dateFormatter } from "date-fns";
import AutoEditDialog from "./AutoEditDialog";
import { user } from "@/configs/axios";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import AutoFormDeleteDialog from "./DeleteAutoForm";

const AutomaticEventCard = ({ event }: { event: any }) => {
  return (
    <div className="grid grid-cols-1  gap-4 sm:min-w-[310px] md:min-w-[350px]  shadow-md flex-wrap rounded-md  sm:p-4 md:p-6">
      <div className="flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-2 ">
          <h1 className="text-[#4a4a4a] flex-1 col-span-2 sm:text-xl md:text-2xl line-clamp-1  font-semibold">
            {event.title}
          </h1>
          <div
            className={clsx(
              "px-4 py-1 text-sm rounded-full justify-self-end",
              event.status === 1 && "bg-[#C2FFCC]",
              event.status === 0 && "bg-[#FFC2C2]"
            )}
          >
            {event.status === 1 ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 place-content-center place-items-center   rounded-md border p-4 bg-[#7655fa]">
        <div className="flex flex-col ">
          <h1 className="text-white text-lg font-semibold">
            {dateFormatter(event.start_date, "MMM dd, yyyy")}
          </h1>
          <h1 className="text-[#e8e8e8] text-sm">Start date</h1>
        </div>
        <div className=" ">
          <h1 className="text-white text-lg font-semibold">
            {dateFormatter(event.end_date, "MMM dd, yyyy")}
          </h1>
          <h1 className="text-[#e8e8e8] text-sm">End date</h1>
        </div>
        {user && user.role === "admin" && event && (
          <div className="flex gap-4 justify-end items-center">
            <span className="hover:bg-[#45309b] active:scale-[0.90]  rounded-full justify-self-end aspect-square object-cover h-[30px] w-[30px]  cursor-pointer transition-all p-1 ">
              <AutoEditDialog type="edit" data={event} />
            </span>
            <span className="hover:bg-[#45309b] active:scale-[0.90]  rounded-full justify-self-end aspect-square object-cover   cursor-pointer transition-all  ">

              <AutoFormDeleteDialog data={event.id} />
            </span>
           
          </div>
        )}
        {user && user.role === "company" && event && (
          <a
            className="text-white active:scale-[0.90] transition-all bg-[#482cb9] justify-self-end  rounded-full py-2 px-3 hover:bg-[#C2FFCC] hover:text-black  "
            href={`/dashboard/use-auto/${event.id}`}
          >
            Use
          </a>
        )}
      </div>
    </div>
  );
};

export default AutomaticEventCard;
