"use client";
import React, { useState } from "react";
import MainContainer from "./MainContainer";
import UpcomingEvents from "./UpcomingEvents";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { Dashboard } from "@/configs/apiRoutes";

const DashboardGrid = () => {
  const [tab, setTab] = useState("dashboard");
  const {
    isPending: dashboardResponsePending,
    data: dashboard,
    error: dashboardError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: Dashboard.getDashboard,
  });

  const {
    isPending: isKpiPending,
    data: kpis,
    error: kpiError,
  } = useQuery({
    queryKey: ["kpis"],
    queryFn: Dashboard.getKPI,
  });

  console.log(kpis?.data.data)
  console.log(dashboard?.data.data)
  return (
    <div className="flex flex-col ">
      {/* Mobile Tab Btns */}
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold items-center gap-4">
        <button
          onClick={() => setTab("dashboard")}
          className={clsx(
            "text-[#7655fa] active:scale-[0.95] transition-all",
            tab === "dashboard" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          Dasboard
        </button>
        <button
          onClick={() => setTab("upcoming-events")}
          className={clsx(
            "text-[#7655fa] active:scale-[0.95] transition-all ",
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
          "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 m-4 sm:hidden md:grid "
        }
      >
        <MainContainer data={dashboard?.data}/>

        <UpcomingEvents data={dashboard?.data}/>
      </div>
      {/* Mobile Template */}
       <div className="sm:block md:hidden">
          {tab === "dashboard" &&  <MainContainer data={dashboard?.data}/>}
          {tab === "upcoming-events" &&   <UpcomingEvents data={dashboard?.data}/>}
      </div>
    </div>
  );
};

export default DashboardGrid;
