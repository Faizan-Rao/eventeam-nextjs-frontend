"use client";
import React from "react";
import KPICard from "./KPICard";
import Calendar from "./icons/Calendar";
import { useTranslation } from "react-i18next";
import CalendarBlank from "./icons/CalendarBlank";
import Circuitary from "./icons/Circuitary";
import UserCirclePlus from "./icons/UserCirclePlus";
import UserFour from "./icons/UserFour";
import Money from "./icons/Money";
import HandCoins from "./icons/HandCoins";
import ReciepeX from "./icons/ReciepeX";

const KPIContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex  items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
      <KPICard title={t("All Time Events")} icon={<Calendar />} value={"0"}/>
      <KPICard title={t("Active Events")} icon={<Calendar />} value={"0"} />
      <KPICard title={t("Automatic Events")} icon={<Circuitary/>} value={"0"}/>
      <KPICard title={t("Total Registrations")} icon={<UserCirclePlus/>} value={"0"} />
      <KPICard title={t("All Time Guests")} icon={<UserFour/>} value={"0"} />
      <KPICard title={t("All Time Earnings")} icon={<Money/>} value={"0"} currency="$" />
      <KPICard title={t("Cleared Earnings")} icon={<HandCoins/>} value={"0"} currency="$"/>
      <KPICard title={t("Pending Earnings")} icon={<ReciepeX/>} value={"0"} currency="$"/>
    </div>
  );
};

export default KPIContainer;
