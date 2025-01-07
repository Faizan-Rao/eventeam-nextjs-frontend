"use client";
import AutomaticEventCard from "@/components/AutomaticEventCard";
// import EventDashContainer from "@/components/EventDashContainer";
import ManifyingGlass from "@/components/icons/ManifyingGlass";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { AutoFormAPI } from "@/configs/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search } from "lucide-react";
import AutoEditDialog from "@/components/AutoEditDialog";
import { user } from "@/configs/axios";
import clsx from "clsx";

const AutomaticForm = () => {
  const [filtered, setFiltered] = useState([]);
  const {
    data: autoforms,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["auto_form"],
    queryFn: AutoFormAPI.get,
  });

  const autoformData = autoforms?.data.data.events;
  const searchCard = (e: any) => {
    const filteredData = autoformData.filter((el: any, i: number) =>
      el.title.includes(e.target.value)
    );
    setFiltered(filteredData);
  };
  return (
    <MainContentGrid>
      <PageTitleContainer title="Automatic Forms" />
      <div className="flex flex-col gap-4 p-6 bg-white rounded-md">
        {/* <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
          Nearest Upcoming Auto form
        </h1> */}
        {/* <EventDashContainer data={autoformData[0]}  /> */}
        <div className="flex gap-4 sm:flex-col md:flex-row justify-between md:items-center">
          <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
            All Upcoming events
          </h1>
          <div className="grid justify-self-end sm:grid-cols-3 md:grid-cols-2 justify-items-end gap-3 ">
          <div className={clsx("  flex w-full self-center items-center sm:col-span-2 md:col-span-1 gap-2 sm:flex-1 md:flex-none  rounded-md border-[1px] p-1", user.role === "company" && " sm:col-span-3 min-w-full" )}>
            <Search className="sm:hidden md:block text-[#4a4a4a]"  />
            <input
              placeholder={"Search Event..."}
              onChange={searchCard}
              className="flex-1 w-auto outline-none"
            />
          </div>
         {user && user.role === "admin" && <AutoEditDialog type="add"/>}

         {user && user.role === "company" &&  <div className="sm:flex-1 md:flex-none  sm:col-span-3 md:col-span-1 flex place-items-center gap-2 md:ml-2 rounded-md  p-1">
            <div className="flex md:px-4 py-1  items-center justify-center  gap-2">
              <h1 className="font-semibold  ">Auto Publish</h1>
              <HoverCard>
                <HoverCardTrigger className=" flex aspect-square bg-[#c2c2c2]   rounded-full p-1 h-6 w-6 object-cover justify-center items-center ">
                  <h1 className=" text-white p-2 text-sm">?</h1>
                </HoverCardTrigger>
                <HoverCardContent className="text-xs">
                  Auto Publish Newly Created Auto forms by Admin.
                </HoverCardContent>
              </HoverCard>
              <Switch />
            </div>
          </div>}

          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          {!autoformData && (
            <Skeleton className="w-[400px] h-[219px] rounded-lg" />
          )}
          {!autoformData && (
            <Skeleton className="w-[400px] h-[219px] rounded-lg" />
          )}
          {!autoformData && (
            <Skeleton className="w-[400px] h-[219px] rounded-lg" />
          )}
          {autoformData &&
            filtered.length <= 0 &&
            autoformData.map((el: any, i: number) => {
              return <AutomaticEventCard event={el} key={i} />;
            })}
          {autoformData &&
            filtered.length > 0 &&
            filtered.map((el: any, i: number) => {
              return  <AutomaticEventCard event={el} key={i} />;
            })}
        </div>
      </div>
    </MainContentGrid>
  );
};

export default AutomaticForm;
