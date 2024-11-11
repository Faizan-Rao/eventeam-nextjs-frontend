"use client";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import SingleEventCont from "@/components/SingleEventCont";
import SingleEventTable from "@/components/tables/SingleEventTable/SingleEventTable";
import { Events } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SingleEvent = () => {
  const params = useParams()
  
  const [tab, setTab] = useState("event");
 
  const { data: eventDetailData } = useQuery({queryKey: ["event"], queryFn: async ()=>Events.getOne(params.eventid)})
  const eventDetail = eventDetailData?.data.data
  return (
    <div className="flex flex-col">
      {/* Mobile Tab Btns */}
      <div className="sm:flex md:hidden py-4 bg-[white] w-full px-10 font-semibold items-center gap-4">
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
        <div className="sm:hidden w-full h-auto md:flex gap-4">
          <SingleEventCont data={eventDetail} />
          <SingleEventTable data={eventDetail} />
        </div>

        <div className="sm:block md:hidden">
          {tab === "event" && <SingleEventCont data={eventDetail} />}
          {tab === "reg-info" && <SingleEventTable data={eventDetail} />}
        </div>
      </MainContentGrid>
    </div>
  );
};

export default SingleEvent;
