import React, { SetStateAction, use, useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { clsx } from "clsx";
import {
  Banknote,
  Calendar,
  ChevronDown,
  CircuitBoard,
  EllipsisVertical,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { set } from "lodash";
import ViewPaymentDetailDialog from "./ViewPaymentDetailDialog";
import EditPaymentStatusDialog from "./EditPaymentStatusDialog";
import { format } from "date-fns";
interface RowData {
  event_name: string;
  start_data: string;
  end_date: string;
  active: boolean;
  regsitration: string;
  status: string;
  index: number;
}

const PaymentCard = ({
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
  console.log("payment card data", data);
  let row = {} as any;
  row.original = data;

  return (
    <Accordion
    value={selectedRecord === index ? `item-${index}` : "No Element"}   type="single" className="transition-all min-w-full" collapsible
    >
      <AccordionItem
        value={`item-${index}`}
        className={clsx(
          " bg-[#F7F6F9] rounded-md   transition-all",
          index === selectedRecord && "bg-[#7655fa]"
        )}
      >
        <AccordionTrigger className="px-4  text-left">
          <div className="flex items-center min-w-full justify-between ">
            <div className="flex-1  flex flex-col">
              <ViewPaymentDetailDialog row={row}>
                <h1
                  className={clsx(
                    "text-[#999999] font-semibold text-sm",
                    index === selectedRecord && "text-[white]"
                  )}
                >
                  Event Name
                </h1>
                <h1
                  className={clsx(
                    "text-[#7655fa] font-semibold text-[18px]",
                    index === selectedRecord && "text-[white]"
                  )}
                >
                  {data.event.title}
                </h1>
              </ViewPaymentDetailDialog>
              {/* <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "h-2 text-[#4a4a4a] rounded-full w-2 aspect-square object-cover bg-[#FF0000]",
                      data.active && "bg-[#1EFF00]",

                    )}
                  />
                  <span className={clsx("text-[#999999] font-semibold" ,   index === selectedRecord && "text-[white]")}>

                  {data.active ? "Active" : "Inactive"}
                  </span>
                </div> */}
            </div>
            <div
              onClick={() => setSelectedRecord(index)}
              className={clsx(
                "flex gap-2 items-center",
                index === selectedRecord && "text-[white]"
              )}
            >
              {row.original.payment_method === "cash" && <EditPaymentStatusDialog row={row}/>}

              <ChevronDown size={20} className="  justify-self-end" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[30px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
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
                  Date
                </p>
                <p className="font-semibold flex  ">
                  {data.created_at.split("T")[0]}
                </p>
              </div>
            </div>
            {/*   Total Payment */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[30px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
                  index === selectedRecord && "bg-[white]"
                )}
              >
                <Banknote />
              </div>

              <div
                className={clsx(
                  "flex  justify-center   flex-col  text-[#4a4a4a]",
                  index === selectedRecord && "text-[white]"
                )}
              >
                <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  Total Payment
                </p>
                <p className="font-semibold flex  ">
                  {"$" + data.total_amount}
                </p>
              </div>
            </div>

            {/*  Payment Method*/}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[30px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
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
                  Payment Method
                </p>
                <p className="font-semibold flex  ">{data.payment_method}</p>
              </div>
            </div>
            {/*   Status */}
            <div className=" flex-1 flex gap-2 items-center rounded-md">
              <div
                className={clsx(
                  "flex aspect-square sm:h-[30px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md",
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
                  Status
                </p>
                {data.payment_status !== "pending" && (
                  <p className="font-semibold flex text-[#2AE75C] ">
                    {"Cleared"}
                  </p>
                )}
                {data.payment_status === "pending" && (
                  <p className="font-semibold flex text-[#fbe394] ">
                    {"Pending"}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between ">
             
            </div> */}

          {/* <div className="flex justify-between">
              
          </div> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentCard;
