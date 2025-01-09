import React, { SetStateAction, use, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { clsx } from "clsx";
import {
  Calendar,
  ChevronDown,
  CircuitBoard,
  EllipsisVertical,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { set } from "lodash";
import ActionDropDown from "./ActionDropDown";
import { format } from "date-fns";

// interface RowData {
//   event_name: string;
//   start_data: string;
//   end_date: string;
//   active: boolean;
//   regsitration: string;
//   status: string;
// }

const MyEventCard = ({
  data,
  index,
  selectedRecord,
  setSelectedRecord,
}: {
  data: any;
  index: number;
  selectedRecord: number;
  setSelectedRecord: React.Dispatch<SetStateAction<number>>;
}) => {
  console.log("Required Data 213", data);
  return (
    <Accordion
      value={selectedRecord === index ? "item-1" : "No Element"}
      type="single"
    >
      <AccordionItem
        value="item-1"
        className={clsx(
          " bg-[#F7F6F9] rounded-md ",
          index === selectedRecord && "bg-[#7655fa]"
        )}
      >
        <AccordionTrigger className="px-4  text-left active:scale-[0.95] transition-all">
          <div className="flex items-center min-w-full justify-between ">
            <div className="flex-1  flex flex-col">
              <Link href={`/dashboard/my-events/${data.id}`}>
                {/* <h1
                  className={clsx(
                    "text-[#999999] font-semibold text-[13px]",
                    index === selectedRecord && "text-[white]"
                  )}
                >
                  Event Name
                </h1> */}
                <h1
                  className={clsx(
                    "text-[#7655fa] font-semibold text-base break-words break-all",
                    index === selectedRecord && "text-[white]"
                  )}
                >
                  {(data && data.title) || "No Title"}
                </h1>
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "h-2 text-[#4a4a4a] rounded-full w-2 aspect-square object-cover ",
                      data.status === 1 && "bg-[#1EFF00]",
                      data.status === 0 && "bg-[#FF0000]"
                    )}
                  />
                  <span
                    className={clsx(
                      "text-[#999999] font-semibold text-sm",
                      index === selectedRecord && "text-[white]"
                    )}
                  >
                    {data.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
              </Link>
            </div>
            <div className={clsx("mx-4 " )}>
              <ActionDropDown row={data} id={index} selectedRecord={selectedRecord}/>
            </div>
            <div
              onClick={() => setSelectedRecord(index)}
              className={clsx(
                "flex gap-2 items-center ",
                index === selectedRecord && "text-[white]"
              )}
            >
              <ChevronDown size={20} className="  justify-self-end" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <div className="grid grid-cols-2  gap-2">
            {/* Start Date */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[35px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
                  index === selectedRecord && "bg-[white]"
                )}
              >
                <Calendar />
              </div>

              <div
                className={clsx(
                  "flex  justify-center   flex-col  text-[#4a4a4a]",
                  index === selectedRecord && "text-[white]"
                )}
              >
                <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  Start Date
                </p>
                <p className="font-semibold flex  ">{format(new Date(data.start_date), "MMM dd, yyyy")}</p>
              </div>
            </div>
            {/* EndDate */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[35px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
                  index === selectedRecord && "bg-[white]"
                )}
              >
                <Calendar />
              </div>

              <div
                className={clsx(
                  "flex  justify-center   flex-col  text-[#4a4a4a]",
                  index === selectedRecord && "text-[white]"
                )}
              >
                <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  End Date
                </p>
                <p className="font-semibold flex  ">{format(new Date(data.end_date), "MMM dd, yyyy")}</p>
              </div>
            </div>

            {/* Registrations*/}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[35px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
                  index === selectedRecord && "bg-[white]"
                )}
              >
                <UsersRound />
              </div>

              <div
                className={clsx(
                  "flex  justify-center   flex-col  text-[#4a4a4a]",
                  index === selectedRecord && "text-[white]"
                )}
              >
                <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  Registrations
                </p>
                <p className="font-semibold flex  ">{data.registrations_count || 0}</p>
              </div>
            </div>
            {/*  Operational State */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[35px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
                  index === selectedRecord && "bg-[white]"
                )}
              >
                <CircuitBoard />
              </div>

              <div
                className={clsx(
                  "flex  justify-center   flex-col  text-[#4a4a4a]",
                  index === selectedRecord && "text-[white]"
                )}
              >
                <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  Operational State
                </p>
                <p className={clsx("font-semibold flex text-[#2AE75C] ", data.current_status === "active" &&  "text-[#2AE75C] ", data.current_status !== "active" &&  "text-[#FF0000] " )}>
                 {data.current_status === "active" ? "Active" : "Ended"}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MyEventCard;
