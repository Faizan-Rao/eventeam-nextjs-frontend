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
import { CircleCheck, ListFilter, Plus, Search } from "lucide-react";
import AutoEditDialog from "@/components/AutoEditDialog";
import { user } from "@/configs/axios";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const AutomaticForm = () => {
  const [filtered, setFiltered] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [open, setOpen] = useState(false);
  const handleClear = () => {
    setFiltered([]);
    setSearchString("");
  };
  const {t} = useTranslation(["translation"])
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
    setSearchString(e.target.value);
    const filteredData = autoformData.filter((el: any, i: number) =>
      el.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filteredData.length <= 0) {
      setFiltered([]);
      return;
    }

    setFiltered(filteredData);
  };
  const handleDropDownFilter = (value: number, name: string) => {
    const filteredData = autoformData.filter(
      (el: any, i: number) => el[name] === value
    );
    if (filteredData.length <= 0) {
      setFiltered([]);
      return;
    }

    setFiltered(filteredData);
  };
  return (
    <MainContentGrid>
      <PageTitleContainer title="Automatic Forms" />
      <div className="flex flex-col gap-4 p-6 bg-white rounded-md min-h-screen">
        {/* <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
          Nearest Upcoming Auto form
        </h1> */}
        {/* <EventDashContainer data={autoformData[0]}  /> */}
        <div className="flex gap-4 sm:flex-col md:flex-row justify-between md:items-center">
          <h1 className="text-xl my-4 font-semibold text-[#4a4a4a]">
           {t("All Upcoming events")}
          </h1>
          <div className="grid justify-self-end sm:grid-cols-1 md:grid-cols-2 justify-items-end gap-3 ">
            <div
              className={clsx(
                "  flex w-full  items-center sm:col-span-2 md:col-span-1 gap-2 sm:flex-1 md:flex-none  rounded-md border-[1px] p-1",
                user.role === "company" && " sm:col-span-3 min-w-full"
              )}
            >
              <Search className=" text-[#4a4a4a]" />
              <input
                placeholder={t("Search Event...")}
                onChange={searchCard}
                value={searchString}
                className="flex-1 w-auto outline-none"
              />
            </div>
            <div className="flex gap-4  ">
                    {user.role === "admin" && <DropdownMenu
                      modal={true}
                      open={open}
                      onOpenChange={setOpen}
                    >
                      <DropdownMenuTrigger className="active:scale-[0.95] transition-all ">
                        <button className=" flex  flex-1 text-base place-items-center gap-2 px-4 rounded-md py-1 border-[2px]">
                          <ListFilter size={20} />
                          {t("Filter")}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="overflow-auto max-h-[300px] max-w-[240px]">
                        <DropdownMenuLabel>{t("Active State")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center active:scale-[0.95] transition-all justify-between"
                          onClick={() => {
                            setSearchString("active");
                            handleDropDownFilter(1, "status");
                            setSelectedFilter("active");
                          }}
                        >
                          <span>{t("Active")}</span>
                          <div
                            className={clsx(
                              selectedFilter === "active" &&
                                "bg-[#7655fa] rounded-full text-white"
                            )}
                          >
                            <CircleCheck size={18} strokeWidth={1.4} />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center active:scale-[0.95] transition-all justify-between"
                          onClick={() => {
                            setSearchString("inactive");
                            handleDropDownFilter(0, "status");
                            setSelectedFilter("inactive");
                          }}
                        >
                          <span>{t("Inactive")}</span>
                          <div
                            className={clsx(
                              selectedFilter === "inactive" &&
                                "bg-[#7655fa] rounded-full text-white"
                            )}
                          >
                            <CircleCheck size={18} strokeWidth={1.4} />
                          </div>
                        </DropdownMenuItem>

                        <span className="sticky bottom-0 bg-white flex gap-3 flex-1">
                          <button
                            className=" text-[#FF2727] text-sm  my-4 px-4 py-1 active:scale-[0.95] transition-all"
                            onClick={() => {
                              handleClear();
                              setOpen(false);
                              setSelectedFilter("");
                            }}
                          >
                            {t("Clear Filters")}
                          </button>

                          <button
                            className=" bg-[#7655FA] active:scale-[0.95] transition-all text-white rounded-full my-4 px-4 py-1"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            {t("Close")}
                          </button>
                        </span>
                      </DropdownMenuContent>
                    </DropdownMenu>}
                  

            {user && user.role === "admin" && <AutoEditDialog type="add" />}

            {user && user.role === "company" && (
              <div className="sm:flex-1 md:flex-none  sm:col-span-3 md:col-span-1 flex place-items-center gap-2 md:ml-2 rounded-md  p-1">
                <div className="flex md:px-4 py-1  items-center justify-center  gap-4">
                 

                  <h1 className="font-semibold  ">{t("Auto Publish")}</h1>
                  <HoverCard>
                    <HoverCardTrigger className=" flex aspect-square bg-[#c2c2c2]   rounded-full p-1 h-6 w-6 object-cover justify-center items-center ">
                      <h1 className=" text-white p-2 text-sm">?</h1>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-xs">
                     {t("Auto Publish Newly Created Auto forms by Admin.")}
                    </HoverCardContent>
                  </HoverCard>
                  <Switch />
                </div>
              </div>
            )}
            </div>
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
            searchString === "" &&
            autoformData.map((el: any, i: number) => {
              return <AutomaticEventCard event={el} key={el.id} />;
            })}
          {autoformData &&
            searchString !== "" &&
            filtered.map((el: any, i: number) => {
              return <AutomaticEventCard event={el} key={el.id} />;
            })}
          {filtered.length <= 0 && searchString !== "" && (
            <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4">
              {" "}
              {t("No Results Found")}
            </p>
          )}
        </div>
      </div>
    </MainContentGrid>
  );
};

export default AutomaticForm;
