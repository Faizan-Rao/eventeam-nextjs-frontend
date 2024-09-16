'use client'
import {
  UsersRound,
  CircleDollarSign,
  HandCoins,
  Banknote,
  Calendar,
  CircuitBoard,
  UserPlus,
} from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import KPICard from "./KPICard";
import { useTranslation } from "react-i18next";
import { PaymentDetailsTable } from "./tables/PaymentDetail/data-table";
import dummyData from '@/dummy/payment_details_dummy.json'
import {columns, Payment} from './tables/PaymentDetail/column'
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";
import { FreeMode, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
export let data = dummyData

const PaymentDetailMain = () => {
  const { t } = useTranslation(["translation"]);
 const {data} : any = useContext(PaymentDetailContext)

  
  return (
<>
    {/* Web Template */}
    <div className="flex flex-col gap-6 p-4 rounded-md bg-white container min-h-screen">
      {/* KPI Container */}
      <div className="sm:hidden md:flex my-5 items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
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
    {/* Mobile Template */}
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
        <SwiperSlide  >  <KPICard title={t("All Time Guests")} icon={<UsersRound size={28}/>} value={"0"} /></SwiperSlide>
        <SwiperSlide  > <KPICard title={t("All Time Earnings")} icon={<CircleDollarSign size={28}/>} value={"0"} currency="$" /></SwiperSlide>
        <SwiperSlide  ><KPICard title={t("Cleared Earnings")} icon={<HandCoins size={28}/>} value={"0"} currency="$"/></SwiperSlide>
        <SwiperSlide  >   <KPICard title={t("Pending Earnings")} icon={<Banknote size={28}/>} value={"0"} currency="$"/></SwiperSlide>
      </Swiper>

</div>

        {/* Payment Detail Data Table */}
        <PaymentDetailsTable columns={columns} data={data}/>
    </div>
   

</>
  );
};

export default PaymentDetailMain;
