"use client";
import AutomaticEventCard from "@/components/AutomaticEventCard";
// import EventDashContainer from "@/components/EventDashContainer";
import ManifyingGlass from "@/components/icons/ManifyingGlass";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";

const AutomaticForm = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title="Automatic Forms" />
      <div className="flex flex-col gap-4 p-6 bg-white rounded-md">
        <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
          Nearest Upcoming Auto form
        </h1>
        {/* <EventDashContainer /> */}
        <div className="flex gap-4 sm:flex-col md:flex-row justify-between md:items-center">
          <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
            All Upcoming events
          </h1>
          <span className="  flex gap-2 sm:flex-1 md:flex-none md:ml-auto rounded-md border-[2px] p-1">
            <ManifyingGlass />
            <input
              placeholder={"Search Event..."}
              onChange={(event) => null}
              className="flex-1 max-w-xl outline-none"
            />
          </span>

          <div className="sm:flex-1 md:flex-none flex place-items-center gap-2 rounded-md border-[2px] p-1">
            <div className="flex px-4 py-1 items-center justify-center gap-2">
              <h1 className="font-semibold ">Auto Publish</h1>
              <HoverCard>
                <HoverCardTrigger className=" flex aspect-square bg-[#c2c2c2]   rounded-full p-1 h-6 w-6 object-cover justify-center items-center ">
                  <h1 className=" text-white p-2 text-sm">
                    ?
                  </h1>
                </HoverCardTrigger>
                <HoverCardContent className="text-xs">
                  Auto Publish Newly Created Auto forms by Admin.
                </HoverCardContent>
              </HoverCard>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex  gap-4 p-4 flex-wrap">
          {Array(10)
            .fill({
              title: "The New Year Eve",
              description: "Upcoming Event",
              start_date: "Jan 1, 2024",
              status: false,
            })
            .map((el, i) => {
              return <AutomaticEventCard event={el} key={i} />;
            })}
        </div>
      </div>
    </MainContentGrid>
  );
};

export default AutomaticForm;
