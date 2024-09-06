
import React from "react";
import BarChartJSX from "./BarChart";
import data from '@/dummy/bar_data.json'
import data2 from '@/dummy/earning_bar_data.json'
const ChartsMain = () => {
  return (
    <div className="flex flex-col justify-center gap-4 flex-wrap ">
     <BarChartJSX data={data} title="Guests Per Event" barName="guest" />
     <BarChartJSX data={data2} title="Earnings Per Event" barName="earnings" />

    </div>
  );
};

export default ChartsMain;
