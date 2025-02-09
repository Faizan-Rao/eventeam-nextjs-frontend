"use client"
import React from "react";
import BarChartJSX from "./BarChart";

import data2 from '@/dummy/earning_bar_data.json'
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "react-i18next";
const ChartsMain = ({chartData}: {chartData: any}) => {
  console.log(chartData)
  const {t} = useTranslation(["translation"])
  return (
    <div className="grid grid-cols-1    gap-4 ">
    {/* {!chartData && <Skeleton className=" m-4 w-[100%] rounded-xl" />}
    {!chartData && <Skeleton className="m-4 w-auto rounded-xl" />} */}
    {chartData && <BarChartJSX data={chartData} title={t("Guests Per Event")} barName={"guest"} />}
    {chartData && <BarChartJSX data={chartData} title={t("Earnings Per Event")} barName={"earnings"} />}

    </div>
  );
};

export default ChartsMain;
