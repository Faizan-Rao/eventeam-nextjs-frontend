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

const AutomaticEventCard = ({ event }: { event: any }) => {
  return (
    <div className="grid grid-cols-1  gap-4 min-w-[350px]  border-[1px] flex-wrap rounded-md  p-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between flex-1 w-full ">
          <h1 className="text-[#4a4a4a] flex-1 text-2xl line-clamp-1  font-semibold">
            {event.title}
          </h1>
          <div
            className={clsx(
              "px-4 py-1 rounded-full self-start",
              event.status === 1 && "bg-[#C2FFCC]",
              event.status === 0 && "bg-[#FFC2C2]"
            )}
          >
            {event.status ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
        {/* <Accordion type="single"  collapsible>
          <AccordionItem className="outline-none border-none" value="item-1">
            <AccordionTrigger>
              {" "}
              <h1 className=" text-sm font-semibold outline-none text-[#4a4a4a]">
                See Description
              </h1>{" "}
            </AccordionTrigger>
            <AccordionContent>
              <h1 className="text-[#424242] bg-[#f6f6f6] rounded-lg p-4 text-justify">
                {(() => {
                  const el = parser(event.description, { trim: true });
                  if (el.toString().trim() !== "") {
                    return el;
                  } else {
                    return "No description";
                  }
                })()}
              </h1>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}

      <div className="grid grid-cols-3 place-content-center place-items-center   rounded-md border p-4 bg-[#7655fa]">
        <div className="flex flex-col ">
          <h1 className="text-white text-lg font-semibold">
            {dateFormatter(event.start_date, "PP")}
          </h1>
          <h1 className="text-[#e8e8e8] text-sm">Start date</h1>
        </div>
        <div className=" ">
          <h1 className="text-white text-lg font-semibold">
            {dateFormatter(event.end_date, "PP")}
          </h1>
          <h1 className="text-[#e8e8e8] text-sm">End date</h1>
        </div>
        {user && user.role === "admin" && event && (
          <span className="hover:bg-[#45309b] rounded-full aspect-square object-cover h-[30px] w-[30px]  cursor-pointer transition-all p-1 ">
            <AutoEditDialog data={event} />
          </span>
        )}
        {user && user.role === "company" && event && (
          <Link
            className="text-white bg-[#482cb9] justify-self-end transition-all rounded-full py-2 px-3 hover:bg-[#C2FFCC] hover:text-black  "
            href={"#"}
          >
            Use
          </Link>
        )}
      </div>
    </div>
  );
};

export default AutomaticEventCard;
