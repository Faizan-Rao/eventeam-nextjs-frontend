"use client";
import React, { createRef, useRef, useState } from "react";
import SimplePancilLine from "./icons/SimplePancilLine";
import ArrowDown from "./icons/ArrowDown";
import ArrowDownWhite from "./icons/ArrowDownWhite";
import SubeventPreview from "./SubeventPreview";
import { Skeleton } from "./ui/skeleton";
import { format } from "date-fns";
import parse from "html-react-parser";
import clsx from "clsx";
import Link from "next/link";
import { AutoFormAPI } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { set } from "lodash";
import { Loader2 } from "lucide-react";
import { user } from "@/configs/axios";
import { useTranslation } from "react-i18next";
const EventDashContainer = ({ data }: { data: any }) => {
  let ref = useRef(null);
  const [isPending ,setPending] = useState(false)
  console.log(data);
  console.log(ref);

  const publishDirectly = async () => {
    try {
      setPending(true)
      const response = await AutoFormAPI.directPublishForm(data.id);
      if (response.data.statusCode === 200) {
        toast.success("Published Successfully ");
      }
      setPending(false)
    } catch (error) {
      if ((error as any).status !== 200) {
        toast((error as any)?.response?.data.message, { type: "error" });
      }
      setPending(false)
    }
  };
  const {t} = useTranslation(["translation"])
  return (
    <>
      {!data && (
        <div className="flex container p-8 gap-6 md:rounded-md flex-col bg-[#1E1640] text-white">
          <div className="flex sm:justify-center md:justify-between items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <h4 className="text-2xl">{t("No Upcoming Event Right Now")}</h4>
            </div>
            <span className="flex items-center gap-2">
              <a
                href={"/dashboard/add-event"}
                className="bg-[#7655FA] text-base rounded-full px-7 py-3 text-center"
              >
                {t("Start Here")}
              </a>
            </span>
          </div>
        </div>
      )}
      {data && (
        <div className="flex container p-8 gap-6 md:rounded-md flex-col bg-[#1E1640] text-white">
          <div className="flex sm:justify-center md:justify-between items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-1">
              <h4 className="text-2xl">{data.title}</h4>
              <p className="text-base text-[#BABABA]">
                {format(new Date(data["start_date"]), "LLL d") +
                  " - " +
                  format(new Date(data["end_date"]), "LLL d")}
              </p>
            </div>
            <div  className="flex gap-4">
           { user.role === "company" && <span className="flex items-center gap-2">
              <button disabled={isPending} onClick={publishDirectly} className="bg-[#7655FA] flex gap-4 items-center disabled:bg-[#999999] text-base rounded-full px-7 py-3 text-center">
              {isPending && <Loader2 className="animate-spin h-5 w-5"/>} {t("Publish Directly")}
              </button>
              <button className="bg-[#E0A450] text-base rounded-full aspect-square object-cover py-2 px-3 text-center">
                <a href={`/dashboard/use-auto/${data.id}`}>
                  <SimplePancilLine />
                </a>
              </button>
            </span>}
              <button
                className="bg-[#7655FA26] hover:rotate-[-180deg] transition-all flex place-items-center rounded-full aspect-square object-cover py-2 px-5 text-center"
                onClick={() => {
                  (ref.current as any).classList.toggle("hidden");
                }}
              >
                <ArrowDownWhite />
              </button>

            </div>
          </div>

          <div ref={ref} className="hidden enabled:animate-accordion-down disabled:animate-accordion-up transition-all">
            <div className="flex gap-4 my-2">
              <span className="font-bold text-4xl">“”</span>
              <p className="text-center m-4">
                { `${parse(data?.description)}`.trim() === "" ? parse(`${data?.automaticSettings?.event_description}`) : parse(data?.description)}
              </p>
              <span className="font-bold text-4xl self-end">“”</span>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2">
              {data.sub_events.map((el: any, i: number) => {
                return (
                  <SubeventPreview
                    key={i}
                    data={el}
                    className={clsx(i % 2 === 0 && "bg-[#7655FA26] rounded-md")}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDashContainer;
