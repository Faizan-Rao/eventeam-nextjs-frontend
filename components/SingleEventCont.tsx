"use client";
import React, { useState } from "react";
import KPICard from "./KPICard";
import { useSSR, useTranslation } from "react-i18next";
import {
  UsersRound,
  CircleDollarSign,
  HandCoins,
  Banknote,
  PencilLine,
  EllipsisVertical,
  Calendar,
  CircuitBoard,
  UserPlus,
  CreditCard,
  Notebook,
  MapPin,
  HandHeart,
  Eye,
} from "lucide-react";

import htmlToReact from "html-react-parser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";
import SubeventPreview from "./SubeventPreview";
import EventSubeventCard from "./EventSubEventCard";
import AdvanceFormOption from "./forms/auto-config/AdvanceFormOption";
import { clsx } from "clsx";
import { format } from "date-fns";
import { USDollar } from "@/configs/currentFormat";
import DonationViewDialog from "./DonationViewDialog";
import EventEditDialog from "./EventEditDialog";

const SingleEventCont = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const status = true;
  const [open, setOpen] = useState(false);
  console.log("single event data", data);
  return (
    <div className="flex-1  w-full flex-col flex bg-[white] rounded-md justify-between gap-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col ">
          <h1 className="text-[#7655fa] font-semibold text-sm">Event Title</h1>
          <h1 className="text-[#4a4a4a] font-semibold text-2xl mt-3 mb-1">
            {(data && data && data.event.title) || "No title"}
          </h1>
          <h1 className="text-[#999999] font-semibold text-sm">
            {/* {format(new Date(data?.event["start_date"]), "LLL d") +
              " - " +
              format(new Date(data?.event["end_date"]), "LLL d")} */}
          </h1>
        </div>

        <div className="flex gap-4">
          <EventEditDialog open={open} setOpen={setOpen} data={data?.event}>
            <PencilLine
              size={38}
              className="cursor-pointer text-[#7655fa] p-2 hover:bg-[#7655fa26] rounded-full transition-all"
            />
          </EventEditDialog>
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical
                size={38}
                className="text-[#4a4a4a]  p-2 hover:bg-[#7655fa26] rounded-full transition-all "
                strokeWidth={1.5}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
      {/* KPI's  */}
      <div className=" sm:hidden md:flex flex-wrap gap-4 pb-4 border-b-[1px]">
        <KPICard
          title={t("All Time Guests")}
          icon={<UsersRound size={28} />}
          value={(data && data && data.kpis.total_guests) || 0}
        />
        <KPICard
          title={t("All Time Earnings")}
          icon={<CircleDollarSign size={28} />}
          value={USDollar.format(
            (data && data && data.kpis.total_earnings) || 0
          )}
          currency=""
        />
        <KPICard
          title={t("Cleared Earnings")}
          icon={<HandCoins size={28} />}
          value={USDollar.format((data && data && data.kpis.cleared_cash) || 0)}
          currency=""
        />
        <KPICard
          title={t("Pending Earnings")}
          icon={<Banknote size={28} />}
          value={USDollar.format((data && data && data.kpis.pending_cash) || 0)}
          currency=""
        />
      </div>

      <div className="sm:flex gap-4 md:hidden sm:max-w-[92vw]">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("All Time Guests")}
              icon={<UsersRound size={28} />}
              value={USDollar.format(
                (data && data && data.kpis.total_guests) || 0
              )}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("All Time Earnings")}
              icon={<CircleDollarSign size={28} />}
              value={USDollar.format(
                (data && data && data.kpis.total_earnings) || 0
              )}
              currency="$"
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title={t("Cleared Earnings")}
              icon={<HandCoins size={28} />}
              value={USDollar.format(
                (data && data && data.kpis.cleared_cash) || 0
              )}
              currency="$"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("Pending Earnings")}
              icon={<Banknote size={28} />}
              value={USDollar.format(
                (data && data && data.kpis.pending_cash) || 0
              )}
              currency="$"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-col gap-4 pb-4 border-b-[1px]">
        <h1 className="text-[#7655fa] font-semibold text-sm">
          Event Description
        </h1>
        <p className="text-sm text-[#999999] ">
          {htmlToReact(
            (data && data && data.event.description) || "No Description"
          )}
        </p>
      </div>

      <div className="flex flex-col pb-4 border-b-[1px] gap-4">
        {/* Sub Event Accordion  */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className=" rounded-md border-2">
            <AccordionTrigger className="px-4 bg-[#7655FA26] text-left">
              <h1 className="text-[#7655fa] font-semibold text-sm">
                Sub Events
              </h1>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="flex items-center justify-between   flex-wrap">
                {data?.event?.sub_events.length > 0 &&
                  data &&
                  data.event.sub_events.map((el: any, i: number) => {
                    console.log(el);
                    return (
                      <EventSubeventCard
                        key={i}
                        className={clsx(
                          i % 2 === 0 && "bg-[#F7F6F9] rounded-md"
                        )}
                        data={el}
                      />
                    );
                  })}
                {data?.event?.sub_events.length <= 0 && "No Subevents"}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Prayer Accordion  */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className=" rounded-md border-2">
            <AccordionTrigger className=" px-4  bg-[#7655FA26] text-left">
              <h1 className="text-[#7655fa] font-semibold text-sm">
                Prayer Times
              </h1>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="flex items-center justify-between  flex-wrap">
                {data?.event?.sub_event_activities?.length > 0 &&
                  data &&
                  data.event.sub_event_activities.map((el: any, i: number) => {
                    console.log(el);
                    return (
                      <EventSubeventCard
                        key={i}
                        className={clsx(
                          i % 2 === 0 && "bg-[#F7F6F9] rounded-md"
                        )}
                        data={el}
                      />
                    );
                  })}
                {data?.event?.sub_events.length <= 0 && "No Activities"}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Permissions */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[#7655fa] font-semibold text-sm">
          Application Settings
        </h1>
        <div className=" w-auto sm:min-w-[92vw] md:min-w-full flex flex-col gap-4 my-4">
          <AdvanceFormOption
            title={"Show address for all subevents?"}
            description="Description of the option"
            icon={<MapPin />}
          >
            <span
              className={clsx(
                " px-4 py-1 rounded-full bg-[#1EFF0026]",
                !(
                  data &&
                  data.settings?.company_automatic_events?.advance
                    .is_show_address === "1"
                ) && "bg-[#FF000026]"
              )}
            >
              <span className="font-semibold text-sm text-[#4a4a4a]">
                {data &&
                data.settings?.company_automatic_events?.advance
                  .is_show_address === "1"
                  ? "Active"
                  : "Inactive"}
              </span>
            </span>
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Enable Cash Payments?"}
            description="Description of the option"
            icon={<Banknote />}
          >
            <span
              className={clsx(
                " px-4 py-1 rounded-full bg-[#1EFF0026]",
                !(
                  data &&
                  data.settings?.company_automatic_events?.advance
                    .is_cash_allowed === "1"
                ) && "bg-[#FF000026]"
              )}
            >
              <span className="font-semibold text-sm text-[#4a4a4a]">
                {data &&
                data.settings?.company_automatic_events?.advance
                  .is_cash_allowed === "1"
                  ? "Active"
                  : "Inactive"}
              </span>
            </span>
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Show regulations on forms?"}
            description="Description of the option"
            icon={<Notebook />}
          >
            <span
              className={clsx(
                " px-4 py-1 rounded-full bg-[#1EFF0026]",
                !(
                  data &&
                  data.settings?.company_automatic_events?.advance
                    .is_show_regulation === "1"
                ) && "bg-[#FF000026]"
              )}
            >
              <span className="font-semibold text-sm text-[#4a4a4a]">
                {data &&
                data.settings?.company_automatic_events?.advance
                  .is_show_regulation === "1"
                  ? "Active"
                  : "Inactive"}
              </span>
            </span>
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Show stripe on the form?"}
            description="Description of the option"
            icon={<CreditCard />}
          >
            <span
              className={clsx(
                " px-4 py-1 rounded-full bg-[#1EFF0026]",
                !(
                  data &&
                  data.settings?.company_automatic_events?.advance
                    .is_show_stripe === "1"
                ) && "bg-[#FF000026]"
              )}
            >
              <span className="font-semibold text-sm text-[#4a4a4a]">
                {data &&
                data.settings?.company_automatic_events?.advance
                  .is_show_stripe === "1"
                  ? "Active"
                  : "Inactive"}
              </span>
            </span>
          </AdvanceFormOption>
          <AdvanceFormOption
            title={"All donations on this registration form of this event?"}
            description="Description of the option"
            icon={<HandHeart />}
          >
            <div className="flex items-center gap-4">
              {data && data?.donations?.length > 0 && (
                <DonationViewDialog data={data.donations} />
              )}
              <span
                className={clsx(
                  " px-4 py-1 rounded-full bg-[#1EFF0026]",
                  !status && "bg-[#FF000026]"
                )}
              >
                <span className="font-semibold text-sm text-[#4a4a4a]">
                  {status ? "Active" : "Inactive"}
                </span>
              </span>
            </div>
          </AdvanceFormOption>
        </div>
      </div>
    </div>
  );
};

export default SingleEventCont;
