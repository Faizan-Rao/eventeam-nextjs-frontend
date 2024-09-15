"use client";
import React, { useState } from "react";
import MainContainer from "./MainContainer";
import UpcomingEvents from "./UpcomingEvents";
import clsx from "clsx";

const DashboardGrid = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="flex flex-col ">
      {/* Mobile Tab Btns */}
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold items-center gap-4">
        <button
          onClick={() => setTab("dashboard")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "dashboard" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          Dasboard
        </button>
        <button
          onClick={() => setTab("upcoming-events")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "upcoming-events" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Upcomming Events
        </button>
      </div>
      {/* Web Template */}
      <div
        className={
          "md:flex sm:hidden p-8 gap-4 overflow-x-auto  sm:flex-wrap md:flex-nowrap"
        }
      >
        <MainContainer />

        <UpcomingEvents />
      </div>
      {/* Mobile Template */}
       <div className="sm:block md:hidden">
          {tab === "dashboard" &&  <MainContainer />}
          {tab === "upcoming-events" &&   <UpcomingEvents />}
      </div>
    </div>
  );
};

export default DashboardGrid;
