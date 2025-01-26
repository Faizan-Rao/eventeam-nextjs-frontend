import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CommissionCalculation = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Commission Calculation Setting</h1>
      </div>
      <div className="flex flex-col gap-2 min-w-full">
        <span className="text-[#999999] text-sm font-semibold">
          Do You want to get commission on donation amount?
        </span>
        <Select>
          <SelectTrigger className="min-w-full text-[#999999] font-semibold">
            <SelectValue placeholder="Select Permission"  defaultValue={"0"}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Yes, calculate commission on donation </SelectItem>
            <SelectItem value="0">{`No, don't calculate commission on donation`}</SelectItem>
           
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default CommissionCalculation;
