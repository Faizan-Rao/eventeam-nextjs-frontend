'use client'
import {
  UsersRound,
  CircleDollarSign,
  HandCoins,
  Banknote,
} from "lucide-react";
import React, { useContext, useMemo, useState } from "react";
import KPICard from "./KPICard";
import { useTranslation } from "react-i18next";
import { PaymentDetailsTable } from "./tables/PaymentDetail/data-table";
import dummyData from '@/dummy/payment_details_dummy.json'
import {columns, Payment} from './tables/PaymentDetail/column'
import { PaymentDetailContext } from "@/context/PaymentDetailProvider";
export let data = dummyData

const PaymentDetailMain = () => {
  const { t } = useTranslation(["translation"]);
 const {data} : any = useContext(PaymentDetailContext)

  
  return (
    <div className="flex flex-col gap-6 p-4 rounded-md bg-white container min-h-screen">
      {/* KPI Container */}
      <div className="flex my-5 items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
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
        {/* Payment Detail Data Table */}
        <PaymentDetailsTable columns={columns} data={data}/>
    </div>
  );
};

export default PaymentDetailMain;
