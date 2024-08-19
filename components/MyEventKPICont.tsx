'use client'
import React from 'react'
import KPICard from "./KPICard";
import { Calendar, CircuitBoard, UserPlus, UsersRound, CircleDollarSign, HandCoins, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";

const MyEventKPICont = () => {
    const {t} = useTranslation(['Translation'])
  return (
    <div className="flex  items-center sm:justify-center lg:justify-center gap-4 flex-wrap">
    <KPICard title={t("All Time Events")} icon={<Calendar  size={28}/>} value={"0"}/>
      <KPICard title={t("Active Events")} icon={<Calendar  size={28}/>} value={"0"} />
      <KPICard title={t("Automatic Events")} icon={<CircuitBoard  size={28}/>} value={"0"}/>
      <KPICard title={t("Total Registrations")} icon={<UserPlus  size={28}/>} value={"0"} />
   
  </div>
  )
}

export default MyEventKPICont