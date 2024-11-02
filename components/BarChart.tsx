"use client";

import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface IBarChartJSX {
    data: any[],
    barName: string,
    title: string,
}

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  }


const BarChartJSX : React.FC<IBarChartJSX> = ({
    data,
    barName="bar",
    title
}) => {
  return (
    <div className="flex flex-1 flex-col transition-all duration-300   sm:w-auto md:w-[350px]     gap-4 bg-[#f7f6f9]  p-10 rounded-xl sm:h-auto  md:h-[340px] ">
      <h1 className="font-semibold text-lg">{title}</h1>

      <ChartContainer config={chartConfig} className=" w-full flex-1 mx-4 ">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 4)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={barName} fill="#7655FA" radius={4} />
          
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartJSX;
