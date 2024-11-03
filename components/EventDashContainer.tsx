"use client";
import React, { createRef, useRef } from "react";
import SimplePancilLine from "./icons/SimplePancilLine";
import ArrowDown from "./icons/ArrowDown";
import ArrowDownWhite from "./icons/ArrowDownWhite";
import SubeventPreview from "./SubeventPreview";
import { Skeleton } from "./ui/skeleton";
import { format } from "date-fns";
import parse from 'html-react-parser'
import clsx from "clsx";
const EventDashContainer = ({ data }: { data: any }) => {
  let ref = useRef(null);
  console.log(data);
  console.log(ref);
  return (
    <>
      {!data && <Skeleton className="h-[125px] w-full rounded-xl" />}
      {data && (
        <div className="flex container p-8 gap-6 rounded-md flex-col bg-[#1E1640] text-white">
          <div className="flex sm:justify-center md:justify-between items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <h4 className="text-2xl">{data.title}</h4>
              <p className="text-base text-[#BABABA]">
                {format(new Date(data["start_date"]), "LLL d") +
                  " - " +
                  format(new Date(data["end_date"]), "LLL d")}
              </p>
            </div>
            <span className="flex items-center gap-2">
              <button className="bg-[#7655FA] text-base rounded-full px-7 py-3 text-center">
                Publish Directly
              </button>
              <button className="bg-[#E0A450] text-base rounded-full aspect-square object-cover py-2 px-3 text-center">
                <SimplePancilLine />
              </button>
              <button
                className="bg-[#7655FA26] hover:rotate-[-180deg] transition-all flex place-items-center rounded-full aspect-square object-cover py-2 px-5 text-center"
                onClick={() => {
                  (ref.current as any).classList.toggle("hidden");
                }}
              >
                <ArrowDownWhite />
              </button>
            </span>
          </div>

          <div ref={ref} className="hidden">
            <div className="flex gap-4 my-2">
              <span className="font-bold text-4xl">“”</span>
              <p className="text-center m-4">{data.description && parse(data.description)}</p>
              <span className="font-bold text-4xl self-end">“”</span>
            </div>

            <div className="flex  justify-center container  flex-wrap">
              {
                data.sub_events.map((el:any , i: number)=>{
                  return (
                    <SubeventPreview key={i} data={el} className={clsx(i % 2 === 0 && "bg-[#7655FA26] rounded-md")}/>
                  )
                })
              }
             
             
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDashContainer;
