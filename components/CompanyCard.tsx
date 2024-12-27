"use client";
import { clsx } from "clsx";
import {
  AtSign,
  EllipsisVertical,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ICompanyCard {
  logo?: string;
  name: string;
  isActive: number;
  phone: string;
  address: string;
  email: string;
  stripe: number;
  slug: string,
}
const CompanyCard: React.FC<ICompanyCard> = ({
  logo = "/profile_logo.svg",
  name = "No Name",
  isActive = 0,
  address = "No address",
  email = "No Email",
  phone = "No Phone",
  stripe = "0",
  slug=""
}) => {

  const dummyImage =  "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
  return (
    <div className="  flex flex-1  w-auto  gap-10 p-6 m-3 flex-col bg-white rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center border-b-[1px] pb-5 gap-4">
          <Image
            src={
              logo ||
             dummyImage
            }
            height={50}
            width={50}
            className="rounded-full bg-cover aspect-square"
            alt="profile logo"
          />
          <div className="flex flex-col">
            <span className="text-[#4a4a4a] font-semibold text-lg line-clamp-1">
             {name}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  " h-[10px] w-[10px] rounded-full",
                  isActive === 1 ? "bg-[#41F468]" : "bg-[#e40303]"
                )}
              />
              <span className="text-sm font-semibold text-[#999999]">
                {isActive === 1 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="hover:bg-[#7655fa26] flex justify-center items-center self-center p-1 transition-all rounded-full  ">
            <EllipsisVertical strokeWidth={1} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/companies/${slug}`}>Company Events</Link>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex-1 flex items-center gap-4">
          <span className="p-2 bg-[#36ACCD] rounded-full">
            <Smartphone className="text-white" />
          </span>
          <div className="flex   flex-col ">
            <span className="text-sm font-semibold text-[#999999]">
              Phone Number
            </span>
            <p className="text-[#4a4a4a] font-semibold text-sm">{phone}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4">
          <span className="p-2 bg-[#C655FA] rounded-full">
            <AtSign className="text-white" />
          </span>
          <div className="flex flex-1   flex-col ">
            <span className="text-sm font-semibold text-[#999999]">Email</span>
            <p className="text-[#4a4a4a] font-semibold text-base break-words text-wrap">{email}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-4">
        <span className="p-2 bg-[#7655FA] rounded-full">
          <MapPin className="text-white" />
        </span>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold text-[#999999]">Address</span>
          <p className="text-[#4a4a4a] font-semibold text-base">{address}</p>
        </div>
      </div>

      <div
        className={clsx(
          " text-white font-semibold rounded-md text-center p-3 text-base",
          stripe === "1" ? "bg-[#7655fa]" : "bg-[#999999]"
        )}
      >
        {stripe === "1" ? "Stripe is Activated" : "Stripe is Disabled"}
      </div>
    </div>
  );
};

export default CompanyCard;
