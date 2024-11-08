"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { HandHeart, PencilLine, CircleCheck, Check } from "lucide-react";
import { Switch } from "./ui/switch";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { usePathname } from "next/navigation";
import { USDollar } from "@/configs/currentFormat";
import clsx from "clsx";

const AutoDonationDialog = () => {
  const { control, setValue, watch } = useFormContext();
  const {
    data: donation,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: Donations.getList,
  });
  const [donations, setDonations] = useState([]);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const wt_form = watch()
  

  useEffect(() => {
    if (donation) {
      const donationsData = donation && donation?.data.data.data;
      if (pathname.includes("auto-config")) {
        setDonations(donationsData.admin_donations);
      } else {
        setDonations(donationsData.company_donations);
      }
    }
  }, [donation, pathname, setDonations]);

  const [selectedDonations, setSelectedDonations] = useState(
    wt_form.advance_form.donations?.other_donations || []
  );

  const selectDonation = (data: any) => {
    let s_donations = [...selectedDonations];
    let found = s_donations.find((el) => el.id === data.id);
    if (found) {
      let index = s_donations.indexOf(found);
      delete s_donations[index];
      s_donations = s_donations.filter((el) => {
        if (el) {
          return true;
        }
      });
      setSelectedDonations(s_donations);
      setValue("advance_form.donations.other_donations", s_donations);
    } else {
      s_donations.push(data);
      setSelectedDonations(s_donations);
      setValue("advance_form.donations.other_donations", s_donations);
    }
    console.log(selectedDonations);
  };

  console.log(selectedDonations);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex p-2 mx-4 items-center hover:bg-[#7655fa26] rounded-full justify-center">
          <PencilLine className="text-[#7655fa]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select donations for form</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col mt-4 gap-2">
              {donations.map((el: any, i: number) => {
                return (
                  <div
                    key={i}
                    onClick={() => selectDonation(el)}
                    className={clsx(
                      "flex justify-between items-center border-[2px] hover:border-[#7655fa] cursor-pointer focus:border-[#7655fa] rounded-md p-1 max-h-[400px] overflow-auto",
                      selectedDonations.findIndex(
                        (item:any) => item.id === el.id
                      ) !== -1 && "border-[#7655fa]"
                    )}
                  >
                    <div className=" flex justify-center items-center m-4 gap-4">
                      <div className="bg-[#7655fa] text-white aspect-square p-2 rounded-full">
                        <HandHeart />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-xl">
                          {USDollar.format(el.amount)}
                        </p>
                        <p className="font-semibold text-[#7655fa] text-sm">
                          {el.title}
                        </p>
                      </div>
                    </div>

                    <div className="m-4 ">
                      <Check
                        className={clsx(
                          "border-[2px] text-[#7655fa] border-[#7655fa] p-1 rounded-full",
                          selectedDonations.findIndex(
                            (item:any) => item.id === el.id
                          ) !== -1 &&
                            "bg-[#7655fa] rounded-full p-1 text-base text-white"
                        )}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col gap-2 ">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Enable Custom Donations
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">Active</span>
                  <Controller
                    name="advance_form.donations.is_enable_donation"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <button className="px-4 py-2 self-end mt-4 text-red-700 rounded-full" onClick={()=>{
                setSelectedDonations([])
                setValue("advance_form.donations.other_donations", [])
              }}>
                Clear Donations
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AutoDonationDialog;