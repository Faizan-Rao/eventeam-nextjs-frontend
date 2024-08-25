"use client";
import AutomaticEventCard from "@/components/AutomaticEventCard";
import EventDashContainer from "@/components/EventDashContainer";
import ManifyingGlass from "@/components/icons/ManifyingGlass";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import React from "react";

const AutomaticForm = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title="Automatic Forms" />
      <div className="flex flex-col gap-4 p-6 bg-white rounded-md">
        <h1 className="text-2xl my-4 font-semibold text-[#4a4a4a]">
          Nearest Upcoming Auto form
        </h1>
        <EventDashContainer />
        <div className="flex gap-4 justify-between items-center">
          <h1 className="text-2xl my-4 font-semibold text-[#4a4a4a]">
            All Upcoming events
          </h1>
          <span className="flex place-items-center gap-2 rounded-md border-[2px] p-1">
            <ManifyingGlass />
            <input
              placeholder={"Search Event..."}
              onChange={(event) => null}
              className="max-w-sm outline-none"
            />
          </span>
        </div>

        <div className="flex justify-evenly gap-4 flex-wrap">
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
