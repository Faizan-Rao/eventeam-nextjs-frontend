import { HandHeart, Trash } from "lucide-react";
import React from "react";
import DonationEditDialog from "./DonationEditDialog";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";

const DonationCard = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-6 bg-[#F7F6F9] max-w-[300px] rounded-lg">
      <div className="flex items-center  pb-4  border-b-[1px] gap-4">
        <div className="flex justify-between items-center gap-4 w-full">
          <span className=" flex justify-center items-center p-2 bg-[#4a4a4a] text-[white] rounded-full">
            <HandHeart />
          </span>
          <span className="flex-1  min-w-full text-2xl font-semibold">
            $200
          </span>
        </div>

        <div className=" flex-1 flex gap-4 justify-center items-center">
          <DonationEditDialog />
          <Trash className="text-[#ff00009d] cursor-pointer p-2 hover:bg-[#ff000026] rounded-full " size={37} />
        </div>
      </div>

      <div className="flex flex-col justify-self-end">
        <h1 className="text-[#4a4a4a] text-xl font-semibold">
          Donation Charity
        </h1>
        <h1 className="text-[#4a4a4a] text-sm font-semibold">Donation name</h1>
      </div>

      <div className="flex justify-between bg-[white] border-[1px] rounded-md p-2">
        <span className="text-[#4a4a4a] flex-1">Active</span>
      
            <Switch
              checked={true}
              onCheckedChange={()=>null}
              name={"advance_form.show_address"}
            />
         
      </div>
    </div>
  );
};

export default DonationCard;
