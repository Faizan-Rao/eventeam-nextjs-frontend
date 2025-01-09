'use client'
import React from 'react'
import KPICard from "./KPICard";
import { Calendar, CircuitBoard, UserPlus, UsersRound, CircleDollarSign, HandCoins, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Autoplay  } from 'swiper/modules';
import { Dashboard } from '@/configs/apiRoutes';
import { useQuery } from '@tanstack/react-query';

const MyEventKPICont = () => {
    const {t} = useTranslation(['Translation'])
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
      <div className="sm:hidden md:flex  items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
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
      </div>

      <div className="sm:flex  md:hidden sm:max-w-[99vw]">
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
       
      </Swiper>

</div>
    </>
  )
}

export default MyEventKPICont