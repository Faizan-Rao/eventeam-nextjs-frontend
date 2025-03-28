"use client";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import SingleEventCont from "@/components/SingleEventCont";
import SingleEventTable from "@/components/tables/SingleEventTable/SingleEventTable";
import { Events } from "@/configs/apiRoutes";
import { user } from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SingleEvent = () => {
  const params = useParams();

  const [tab, setTab] = useState("event");

  const { data: eventDetailData } = useQuery({
    queryKey: ["event"],
    queryFn: async () => Events.getOne(params.eventid),
  });
  const eventDetail = eventDetailData?.data?.data;
  console.log("view event details data", eventDetail);
  const {t} = useTranslation(["translation"])
  return (
    <div className="flex flex-col ">
      {/* Mobile Tab Btns */}
      <div className="sm:flex md:hidden py-4 bg-[white] w-full ps-4 font-semibold items-center gap-4">
        <button
          onClick={() => setTab("event")}
          className={clsx(
            "text-[#7655fa] active:scale-[0.95] transition-all ",
            tab === "event" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {t("Event")}
        </button>
        <button
          onClick={() => setTab("reg-info")}
          className={clsx(
            "text-[#7655fa] active:scale-[0.95] transition-all",
            tab === "reg-info" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          {t("Reg Info")}
        </button>
      </div>
      <div className="sm:hidden md:block p-4">
        <PageTitleContainer title={"View Event"} />
      </div>

      {/* Web Template */}
      <div className="sm:hidden  md:grid md:grid-cols-1 lg:grid-cols-3 min-w-[94vw] gap-4 mx-4 ">
        {eventDetail !== undefined && <SingleEventCont data={eventDetail} />}
        {eventDetail !== undefined && <SingleEventTable data={eventDetail} />}
      </div>

      <div className="sm:block md:hidden">
        {tab === "event" && <SingleEventCont data={eventDetail} />}
        {tab === "reg-info" && <SingleEventTable data={eventDetail} />}
      </div>
      {/* <MainContentGrid>
      </MainContentGrid> */}
    </div>
  );
};

export default SingleEvent;
