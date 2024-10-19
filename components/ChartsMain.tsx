
import React from "react";
import BarChartJSX from "./BarChart";

import data2 from '@/dummy/earning_bar_data.json'
import { Skeleton } from "./ui/skeleton";
const ChartsMain = ({chartData}: {chartData: any}) => {
  console.log(chartData)
  return (
    <div className="flex flex-col justify-center  flex-wrap ">
    {!chartData && <Skeleton className="h-[225px] m-4 w-[250px] rounded-xl" />}
    {!chartData && <Skeleton className="h-[225px] m-4 w-[250px] rounded-xl" />}
    {chartData && <BarChartJSX data={chartData} title="Guests Per Event" barName="guest" />}
    {chartData && <BarChartJSX data={chartData} title="Earnings Per Event" barName="earnings" />}

    </div>
  );
};

export default ChartsMain;
