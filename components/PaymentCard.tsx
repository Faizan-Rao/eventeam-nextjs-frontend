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
interface RowData {
  event_name: string;
  start_data: string;
  end_date: string;
  active: boolean;
  regsitration: string;
  status: string;
}

const PaymentCard = ({
  data,
  index,
  selectedRecord,
  setSelectedRecord,
}: {
  data: RowData;
  index: number;
  selectedRecord: number;
  setSelectedRecord: React.Dispatch<SetStateAction<number>>;
}) => {


  
  return (
    <Accordion value={selectedRecord === index ? "item-1" : "No Element"}    type="single"  >
      <AccordionItem
        value="item-1"
        className={clsx(
          " bg-[#F7F6F9] rounded-md border-2",
          index === selectedRecord && "bg-[#7655fa]"
        )}
      >
        <AccordionTrigger  className="px-4  text-left">
           
          <div className="flex items-center min-w-full justify-between ">
            <div
             
              className="flex-1  flex flex-col"
            >
              <ViewPaymentDetailDialog row={data as any}>
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
                 ASDasdasda
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
            <div onClick={()=>setSelectedRecord(index)} className={clsx("flex gap-2 items-center",  index === selectedRecord && "text-[white]")}>
              
              <EditPaymentStatusDialog row={data as any}></EditPaymentStatusDialog>

              <ChevronDown
                size={20}
                className="  justify-self-end"
              />
            </div>
          </div>
        
        </AccordionTrigger>
        <AccordionContent className="p-4">
          <div className="flex justify-center gap-4 flex-col">
            <div className="flex justify-between ">
              {/* Start Date */}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className={clsx("flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md", index === selectedRecord && "bg-[white]")}>
                  <Calendar />
                </div>

                <div className={clsx("flex  justify-center   flex-col  text-[#4a4a4a]",  index === selectedRecord && "text-[white]")}>
                  <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                     Date
                  </p>
                  <p className="font-semibold flex  ">Dec 31, 2024</p>
                </div>
              </div>
              {/*   Total Payment */}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className={clsx("flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md", index === selectedRecord && "bg-[white]")}>
                  <Banknote />
                </div>

                <div className={clsx("flex  justify-center   flex-col  text-[#4a4a4a]",  index === selectedRecord && "text-[white]")}>
                  <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                   Total Payment
                  </p>
                  <p className="font-semibold flex  ">$123</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              {/*  Payment Method*/}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className={clsx("flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md", index === selectedRecord && "bg-[white]")}>
                  <Calendar />
                </div>

                <div className={clsx("flex  justify-center   flex-col  text-[#4a4a4a]",  index === selectedRecord && "text-[white]")}>
                  <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                   Payment Method
                  </p>
                  <p className="font-semibold flex  ">Stripe</p>
                </div>
              </div>
              {/*   Status */}
              <div className=" flex-1 flex gap-2 items-center rounded-md">
                <div className={clsx("flex aspect-square sm:h-[40px] md:h-[50px]  object-cover text-[#7655fa]  group-hover:text-white  group-hover:bg-[#6349cd]  bg-[#7655FA26]  justify-center items-center p-1 rounded-md", index === selectedRecord && "bg-[white]")}>
                  <CircuitBoard />
                </div>

                <div className={clsx("flex  justify-center   flex-col  text-[#4a4a4a]",  index === selectedRecord && "text-[white]")}>
                  <p className=" text-nowrap  group-hover:text-[white] font-semibold">
                  Status
                  </p>
                  <p className="font-semibold flex text-[#2AE75C] ">Cleared</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentCard;
