"use client";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import SingleEventCont from "@/components/SingleEventCont";
import SingleEventTable from "@/components/tables/SingleEventTable/SingleEventTable";
import { clsx } from "clsx";
import React, { useState } from "react";

const SingleEvent = () => {
  const [tab, setTab] = useState("event");
  return (
    <div className="flex flex-col">
      {/* Mobile Tab Btns */}
      <div className="sm:flex md:hidden py-4 bg-[white] w-[99vw] px-10 font-semibold items-center gap-4">
        <button
          onClick={() => setTab("event")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "event" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          Event
        </button>
        <button
          onClick={() => setTab("reg-info")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "reg-info" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Reg Info
        </button>
      </div>
      <MainContentGrid>
        <div className="sm:hidden md:block ">
          <PageTitleContainer title={"View Event"} />
        </div>

        {/* Web Template */}
        <div className="sm:hidden md:flex gap-4">
          <SingleEventCont />
          <SingleEventTable />
        </div>

        <div className="sm:block md:hidden">
          {tab === "event" && <SingleEventCont />}
          {tab === "reg-info" && <SingleEventTable />}
        </div>
      </MainContentGrid>
    </div>
  );
};

export default SingleEvent;
