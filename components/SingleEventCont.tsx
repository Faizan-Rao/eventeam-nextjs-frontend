"use client";
import React from "react";
import KPICard from "./KPICard";
import { useTranslation } from "react-i18next";
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

const SingleEventCont = () => {
  const { t } = useTranslation();
  const status = true;
  return (
    <div className="flex-1  flex-col flex bg-[white] rounded-md justify-between gap-4 p-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col ">
          <h1 className="text-[#7655fa] font-semibold text-sm">
            Event Details
          </h1>
          <h1 className="text-[#4a4a4a] font-semibold text-2xl">Eid Ul Fitr</h1>
          <h1 className="text-[#999999] font-semibold text-sm">
            Auguest 16 - 18th 2024
          </h1>
        </div>

        <div className="flex gap-4">
          <PencilLine
            size={38}
            className="cursor-pointer text-[#7655fa] p-2 hover:bg-[#7655fa26] rounded-full transition-all"
          />
          <DropdownMenu>
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
          </DropdownMenu>
        </div>
      </div>
      {/* KPI's  */}
      <div className=" sm:hidden md:flex flex-wrap gap-4 pb-4 border-b-[1px]">
        <KPICard
          title={t("All Time Guests")}
          icon={<UsersRound size={28} />}
          value={"0"}
        />
        <KPICard
          title={t("All Time Earnings")}
          icon={<CircleDollarSign size={28} />}
          value={"0"}
          currency="$"
        />
        <KPICard
          title={t("Cleared Earnings")}
          icon={<HandCoins size={28} />}
          value={"0"}
          currency="$"
        />
        <KPICard
          title={t("Pending Earnings")}
          icon={<Banknote size={28} />}
          value={"0"}
          currency="$"
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
              value={"0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("All Time Earnings")}
              icon={<CircleDollarSign size={28} />}
              value={"0"}
              currency="$"
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title={t("Cleared Earnings")}
              icon={<HandCoins size={28} />}
              value={"0"}
              currency="$"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("Pending Earnings")}
              icon={<Banknote size={28} />}
              value={"0"}
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
          This part of the card can be used to put some textual description
          about this event. The description can be small or large. This part of
          the card can be used to put some textual description about this event.
          The description can be small or large. This part of the card can be
          used to put some textual description about this event. The description
          can be small or large.{" "}
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
              <div className="flex items-center justify-center container  flex-wrap">
                <EventSubeventCard />
                <EventSubeventCard className="bg-[#F7F6F9] rounded-md" />
                <EventSubeventCard />
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
              <div className="flex items-center justify-center container  flex-wrap">
                <EventSubeventCard />
                <EventSubeventCard className="bg-[#F7F6F9] rounded-md" />
                <EventSubeventCard />
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
        <div className=" sm:min-w-[92vw] md:min-w-full flex flex-col gap-4 my-4">
          <AdvanceFormOption
            title={"Show address for all subevents?"}
            description="Description of the option"
            icon={<MapPin />}
          >
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
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Enable Cash Payments?"}
            description="Description of the option"
            icon={<Banknote />}
          >
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
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Show regulations on forms?"}
            description="Description of the option"
            icon={<Notebook />}
          >
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
          </AdvanceFormOption>

          <AdvanceFormOption
            title={"Show stripe on the form?"}
            description="Description of the option"
            icon={<CreditCard />}
          >
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
          </AdvanceFormOption>
          <AdvanceFormOption
            title={"All donations on this registration form of this event?"}
            description="Description of the option"
            icon={<HandHeart />}
          >
            <div className="flex items-center gap-4">
              <Eye className="text-[#999999] cursor-pointer"/>
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
