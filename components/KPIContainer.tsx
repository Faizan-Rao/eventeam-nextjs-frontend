"use client";
import React from "react";
import KPICard from "./KPICard";
// import Calendar from "./icons/Calendar";
import { useTranslation } from "react-i18next";
import CalendarBlank from "./icons/CalendarBlank";
import Circuitary from "./icons/Circuitary";
import UserCirclePlus from "./icons/UserCirclePlus";
import UserFour from "./icons/UserFour";
import Money from "./icons/Money";
// import HandCoins from "./icons/HandCoins";
import ReciepeX from "./icons/ReciepeX";
import { Calendar, CircuitBoard, UserPlus, UsersRound, CircleDollarSign, HandCoins, Banknote } from "lucide-react";
const KPIContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex  items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
      <KPICard title={t("All Time Events")} icon={<Calendar  size={28}/>} value={"0"}/>
      <KPICard title={t("Active Events")} icon={<Calendar  size={28}/>} value={"0"} />
      <KPICard title={t("Automatic Events")} icon={<CircuitBoard  size={28}/>} value={"0"}/>
      <KPICard title={t("Total Registrations")} icon={<UserPlus  size={28}/>} value={"0"} />
      <KPICard title={t("All Time Guests")} icon={<UsersRound size={28}/>} value={"0"} />
      <KPICard title={t("All Time Earnings")} icon={<CircleDollarSign size={28}/>} value={"0"} currency="$" />
      <KPICard title={t("Cleared Earnings")} icon={<HandCoins size={28}/>} value={"0"} currency="$"/>
      <KPICard title={t("Pending Earnings")} icon={<Banknote size={28}/>} value={"0"} currency="$"/>
    </div>
  );
};

export default KPIContainer;
