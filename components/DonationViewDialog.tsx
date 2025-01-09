"use client";
import { USDollar } from "@/configs/currentFormat";
import clsx from "clsx";
import { Eye, HandHeart } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const DonationViewDialog = ({ data }: { data: any }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          {" "}
          <Eye className="text-[#999999] cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-4">Donations Selected</DialogTitle>
            <DialogDescription>
                <div className="flex flex-col gap-2">

              {data &&
                data.map((el: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className={clsx(
                        "flex justify-between items-center border-[2px] hover:border-[#7655fa] cursor-pointer focus:border-[#7655fa] rounded-md p-1 max-h-[400px] overflow-auto"
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
                          <p className="font-semibold text-[#7655fa] text-sm break-words break-all">
                            {el.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {!data && "No Donations"}
                </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonationViewDialog;
