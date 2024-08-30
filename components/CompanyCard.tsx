"use client";
import { clsx } from "clsx";
import { AtSign, MapPin, Phone, Smartphone } from "lucide-react";
import Image from "next/image";
import React from "react";
interface ICompanyCard {
  logo?: string;
  name: string;
  loggedin: boolean;
  phone: string;
  address: string;
  email: string;
  stripe: boolean;
}
const CompanyCard: React.FC<ICompanyCard> = ({
  logo = "/profile_logo.svg",
  name = "No Name",
  loggedin = false,
  address = "No address",
  email = "No Email",
  phone = "No Phone",
  stripe = false,
}) => {
  return (
    <div className=" flex-1  max-w-[450px] flex gap-10 p-6 flex-col bg-white rounded-lg">
      <div className="flex items-center border-b-[1px] pb-5 gap-4">
        <Image
          src={logo}
          height={50}
          width={50}
          alt="profile logo"
        />
        <div className="flex flex-col">
          <span className="text-[#4a4a4a] font-semibold text-lg">{name}</span>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                " h-[10px] w-[10px] rounded-full",
                loggedin ? "bg-[#41F468]" : "bg-[#e40303]"
              )}
            />
            <span className="text-sm font-semibold text-[#999999]">
              {loggedin ? "Action" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 flex items-center gap-4">
          <span className="p-2 bg-[#36ACCD] rounded-full">
            <Smartphone className="text-white" />
          </span>
          <div className="flex flex-col ">
            <span className="text-sm font-semibold text-[#999999]">
              Phone Number
            </span>
            <p className="text-[#4a4a4a] font-semibold text-base">{phone}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4">
          <span className="p-2 bg-[#C655FA] rounded-full">
            <AtSign className="text-white" />
          </span>
          <div className="flex flex-col ">
            <span className="text-sm font-semibold text-[#999999]">Email</span>
            <p className="text-[#4a4a4a] font-semibold text-base">{email}</p>
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
          "flex-1 text-white font-semibold rounded-md text-center p-3 text-base",
          stripe ? "bg-[#7655fa]" : "bg-[#999999]"
        )}
      >
        {stripe ? "Stripe is Activated" : "Stripe is Disabled"}
      </div>
    </div>
  );
};

export default CompanyCard;
