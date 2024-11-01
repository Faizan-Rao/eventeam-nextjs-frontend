import { HandHeart, Trash } from "lucide-react";
import React from "react";
import DonationEditDialog from "./DonationEditDialog";
import { Switch } from "@/components/ui/switch";
import { Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import DeleteDonationDialog from "./DeleteDonationDialog";
const DonationCard = ({ data }: { data: any }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: Donations.status,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ['donations']})
      toast("Status Changed Successfully..", {
        type: "info",
      });
    },
  });
  return (
    <div className="flex-1 flex flex-col gap-4 p-6 bg-[#F7F6F9] sm:w-[100%] md:min-w-[350px]    rounded-lg">
      <div className="flex items-stretch justify-center  pb-4  border-b-[1px] gap-4">
        <div className="flex justify-between items-center gap-4 w-full">
          <span className=" flex justify-center items-center p-2 bg-[#4a4a4a] text-[white] rounded-full">
            <HandHeart />
          </span>
          <span className="flex-1  min-w-full text-2xl font-semibold">
            ${data.amount}
          </span>
        </div>

        <div className=" flex-1 flex gap-4 justify-center items-center">
          <DonationEditDialog data={data} />
         <DeleteDonationDialog id={data.id}/>
        </div>
      </div>

      <div className="flex flex-col justify-self-end">
        <h1 className="text-[#4a4a4a] text-xl font-semibold">{data.title}</h1>
        <h1 className="text-[#4a4a4a] text-sm font-semibold">
          {data.description}
        </h1>
      </div>

      <div className="flex justify-between mt-auto justify-self-end bg-[white] border-[1px] rounded-md p-2">
        <span className="text-[#4a4a4a] flex-1">Active</span>

        <Switch
        checked={data.status === 1 ? true : false}
          onCheckedChange={async (value) =>{

            console.log("checked value", value)
            mutation.mutate({
              id: data.id,
              data: {
                id: data.id,
                status: value ? 1 : 0,
              },
            })
          }
          }
        />
      </div>
    </div>
  );
};

export default DonationCard;
