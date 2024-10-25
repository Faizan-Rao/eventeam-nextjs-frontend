"use client";
import {
  UsersRound,
  CircleDollarSign,
  HandCoins,
  Banknote,
  Calendar,
  CircuitBoard,
  UserPlus,
} from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import KPICard from "./KPICard";
import { useTranslation } from "react-i18next";
import { PaymentDetailsTable } from "./tables/PaymentDetail/data-table";
import dummyData from "@/dummy/payment_details_dummy.json";
import { columns } from "./tables/PaymentDetail/column";
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";
import { FreeMode, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { useQuery,  } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Dashboard, Payments } from "@/configs/apiRoutes";
import { Skeleton } from "./ui/skeleton";
export let data = dummyData;

const PaymentDetailMain = () => {
  const { t } = useTranslation(["translation"]);
  //  const {data} : any = useContext(PaymentDetailContext)

  const { data : kpis, error, isPending: isKpisPending, isError } = useQuery({
    queryKey: ["kpis"],
    staleTime: 20000,
    queryFn: Dashboard.getKPI,
  });

  const { data : paymentDetail ,  isPending: isPaymentPending} = useQuery({
    queryKey: ["payments"],
    queryFn: Payments.get,
    staleTime: 20000,
    
  });


 
  return (
    <>
      {/* Web Template */}
      <div className="flex flex-col gap-6 p-4 rounded-md bg-white container min-h-screen">
        {/* KPI Container */}
        <div className="sm:hidden md:flex my-5 items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
        {
          isKpisPending && (<>
          <Skeleton className="h-[82px] w-[314px]"/>
          <Skeleton className="h-[82px] w-[314px]"/>
          <Skeleton className="h-[82px] w-[314px]"/>
          <Skeleton className="h-[82px] w-[314px]"/>
        
          
          </>)
        }
        
        {
          !isKpisPending && ( <>
          <KPICard
            title={t("All Time Guests")}
            icon={<UsersRound size={28} />}
            value={kpis?.data.data["total_guests"] || "0"}
          />
          <KPICard
            title={t("All Time Earnings")}
            icon={<CircleDollarSign size={28} />}
            value={kpis?.data.data["total_earnings"] || "0"}
            currency="$"
          />
          <KPICard
            title={t("Cleared Earnings")}
            icon={<HandCoins size={28} />}
            value={kpis?.data.data["cleared_cash"] || "0"}
            currency="$"
          />
          <KPICard
            title={t("Pending Earnings")}
            icon={<Banknote size={28} />}
            value={kpis?.data.data["pending_cash"] || "0"}
            currency="$"
          />
          </>)
        }  
        
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

        {/* Payment Detail Data Table */}
        {isPaymentPending &&  <Skeleton className="h-[550px] w-full rounded-xl"/>}
       {!isPaymentPending && <PaymentDetailsTable columns={columns} data={paymentDetail?.data.data["registrations"]} />}
      </div>
    </>
  );
};

export default PaymentDetailMain;
