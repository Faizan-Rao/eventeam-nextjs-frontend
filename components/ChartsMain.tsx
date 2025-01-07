
import React from "react";
import BarChartJSX from "./BarChart";

import data2 from '@/dummy/earning_bar_data.json'
import { Skeleton } from "./ui/skeleton";
const ChartsMain = ({chartData}: {chartData: any}) => {
  console.log(chartData)
  return (
    <div className="grid grid-cols-1    gap-4 ">
    {!chartData && <Skeleton className=" m-4 w-[100%] rounded-xl" />}
    {!chartData && <Skeleton className="m-4 w-auto rounded-xl" />}
    {chartData && <BarChartJSX data={chartData} title="Guests Per Event" barName="guest" />}
    {chartData && <BarChartJSX data={chartData} title="Earnings Per Event" barName="earnings" />}

    </div>
  );
};

export default ChartsMain;
