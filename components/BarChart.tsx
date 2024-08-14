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
    <div className="flex flex-col   gap-4 bg-[#f7f6f9] my-3 p-6 rounded-xl">
      <h1 className="font-semibold text-lg">{title}</h1>

      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey={barName} fill="#7655FA" radius={4} />
          
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartJSX;
