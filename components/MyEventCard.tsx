import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { clsx } from "clsx";
import { Calendar, ChevronDown, EllipsisVertical, UsersRound } from "lucide-react";

const data = {
  event_name: "",
  start_date: "",
  end_date: "",
  event_desc: "",
  active: false,
  registrations: "0",
  status: "Pending Approval",
};
const MyEventCard = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className=" bg-[#7655FA26] rounded-md border-2"
      >
        <AccordionTrigger className="px-4  text-left">
          <div className="flex items-center min-w-full justify-between border-b-[1px]">
            <div className="flex-1  flex flex-col">
              <h1 className="text-[#999999] font-semibold text-sm">
                Event-110
              </h1>
              <h1 className="text-[#7655fa] font-semibold text-[18px]">
                Event Name
              </h1>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    "h-2 text-[#4a4a4a] rounded-full w-2 aspect-square object-cover bg-[#FF0000]",
                    data.active && "bg-[#1EFF00]"
                  )}
                />
                {data.active ? "Active" : "Inactive"}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <EllipsisVertical size={20} className=" text-[#999999] justify-self-end" />
              <ChevronDown size={20} className=" text-[#999999]  justify-self-end" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <div className="flex justify-center gap-4 flex-col">
            <div className="flex justify-between ">
              {/* Start Date */}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className="flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md">
                  <Calendar />
                </div>

                <div className="flex  justify-center   flex-col  ">
                  <p className="  text-[#999999] group-hover:text-[white] text-[13px] font-semibold">
                    Start Date
                  </p>
                  <p className="font-semibold flex  ">Dec 31, 2024</p>
                </div>
              </div>
              {/* EndDate */}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className="flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md">
                  <Calendar />
                </div>

                <div className="flex  justify-center   flex-col  ">
                  <p className=" text-nowrap text-[#999999] group-hover:text-[white] font-semibold">
                    End Date
                  </p>
                  <p className="font-semibold flex  ">Dec 31, 2024</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Registrations*/}
              <div className="flex-1 flex gap-2 items-center rounded-md">
                <div className="flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md">
                  <UsersRound />
                </div>

                <div className="flex  justify-center   flex-col  ">
                  <p className="  text-[#999999] group-hover:text-[white] text-[13px] font-semibold">
                    Registrations
                  </p>
                  <p className="font-semibold flex  ">0</p>
                </div>
              </div>
              {/*  Operational State */}
              <div className="flex-1  flex gap-2 items-center rounded-md">
                <div className="flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md">
                  <Calendar />
                </div>

                <div className="flex  justify-center   flex-col  ">
                  <p className=" text-nowrap text-[#999999] group-hover:text-[white] text-[13px] font-semibold">
                    Operational State
                  </p>
                  <p className="font-semibold flex text-[green]">Operational</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MyEventCard;
