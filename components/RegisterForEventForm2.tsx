import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RegisterForEventRadioGroup from "./RegisterForEventRadioGroup";
import { Checkbox } from "./ui/checkbox";
import RegsiterForEventDonation from "./RegsiterForEventDonation";

const RegisterForEventForm2 = ({data}:{data:any}) => {
  return (
    <div className="flex-1 grid grid-cols-1 rounded-md bg-[white] p-4 min-h-screen">
      <RegsiterForEventDonation/>
      <div className="flex flex-col  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Price Breakdown</h1>
        <div className="flex gap-4 text-base justify-between">
          <p className="font-semibold px-2 text-[#999999] text-sm">2x Man</p>
          <p className="font-semibold px-2 text-[#999999] text-sm">$123</p>
        </div>

        <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
          <div className="flex gap-4 text-base justify-between">
            <p className="font-semibold px-2">Total</p>
            <p className="font-semibold px-2">$123</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-b-[1px]  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Payment Method</h1>
        <RegisterForEventRadioGroup />
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        <div className=" flex items-center gap-3 text-[#4a4a4a] font-semibold">
          <Checkbox />
          <span className="text-[#999999] text-sm ">
            I agree to Terms & condition, Privacy policy & Return policy
          </span>
        </div>
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        <button className="rounded-full bg-[#7655fa] text-white  font-semibold px-4 py-2">Register for event</button>
      </div>
    </div>
  );
};

export default RegisterForEventForm2;
