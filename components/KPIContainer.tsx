"use client";
import React from "react";
import KPICard from "./KPICard";
// import Calendar from "./icons/Calendar";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";
import {
  Calendar,
  CircuitBoard,
  UserPlus,
  UsersRound,
  CircleDollarSign,
  HandCoins,
  Banknote,
} from "lucide-react";
import { Dashboard } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { USDollar } from "@/configs/currentFormat";
const KPIContainer = () => {
  const { t } = useTranslation();
  const {
    isPending: isKpiPending,
    data: kpis,
    error: kpiError,
  } = useQuery({
    queryKey: ["kpis"],
    queryFn: Dashboard.getKPI,
  });


  return (
    <>
      <div className="sm:hidden md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        
        
        {!isKpiPending && (
          <>
            <KPICard
              title={t("All Time Events")}
              icon={<Calendar size={28} />}
              value={kpis?.data.data["total_events"] || "0"}
            />
            <KPICard
              title={t("Active Events")}
              icon={<Calendar size={28} />}
              value={kpis?.data.data["active_events"] || "0"}
            />
            <KPICard
              title={t("Automatic Events")}
              icon={<CircuitBoard size={28} />}
              value={kpis?.data.data["automatic_events"] || "0"}
            />
            <KPICard
              title={t("Total Registrations")}
              icon={<UserPlus size={28} />}
              value={kpis?.data.data["total_registrations"] || "0"}
            />
            <KPICard
              title={t("All Time Guests")}
              icon={<UsersRound size={28} />}
              value={kpis?.data.data["total_guests"] || "0"}
            />
            <KPICard
              title={t("All Time Earnings")}
              icon={<CircleDollarSign size={28} />}
              value={ USDollar.format(kpis?.data.data["total_earnings"])  || "0"}
             
              currency=""
            />
            <KPICard
              title={t("Cleared Earnings")}
              icon={<HandCoins size={28} />}
              value={USDollar.format(kpis?.data.data["cleared_cash"])  || "0"}
              currency=""
            />
            <KPICard
              title={t("Pending Earnings")}
              icon={<Banknote size={28} />}
              value={USDollar.format(kpis?.data.data["pending_cash"])  || "0"}
              currency=""
            />
          </>
        )}
      </div>

      <div className="sm:flex gap-4 md:hidden sm:max-w-[98vw]">
        <Swiper
          slidesPerView={2}
          spaceBetween={6}
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
              title={t("All Time Events")}
              icon={<Calendar size={28} />}
              value={kpis?.data.data["total_events"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("Active Events")}
              icon={<Calendar size={28} />}
              value={kpis?.data.data["active_events"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title={t("Automatic Events")}
              icon={<CircuitBoard size={28} />}
              value={kpis?.data.data["automatic_events"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("Total Registrations")}
              icon={<UserPlus size={28} />}
              value={kpis?.data.data["total_registrations"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("All Time Guests")}
              icon={<UsersRound size={28} />}
              value={kpis?.data.data["total_guests"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("All Time Earnings")}
              icon={<CircleDollarSign size={28} />}
              value={USDollar.format(kpis?.data.data["total_earnings"] || "0")}
              currency=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title={t("Cleared Earnings")}
              icon={<HandCoins size={28} />}
              value={USDollar.format(kpis?.data.data["cleared_cash"] || "0")}
              currency=""
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <KPICard
              title={t("Pending Earnings")}
              icon={<Banknote size={28} />}
              value={USDollar.format(kpis?.data.data["pending_cash"] || "0")}
              currency=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default KPIContainer;
