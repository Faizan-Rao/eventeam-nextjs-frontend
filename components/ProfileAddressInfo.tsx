"use client";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const ProfileAddressInfo = ({profile}:{profile:any}) => {
  
  const {t} = useTranslation(["translation"])
  
  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">{t("Address")}</h1>
        <Link
          href={"/dashboard/setting"}
          className="p-2 hover:bg-[#7655fa42] transition-all rounded-full active:scale-[0.95] "
        >
          <PencilLine size={20} color="#7655fa" />
        </Link>
      </div>

      <div className="flex flex-col gap-4  pb-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">{t("Street")}</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
              {profile?.address?.address || "No Street"}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">{t("City")}</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.city || "No City"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">{t("State")}</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.state || "No State"}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">
              {t("Postal Code")}
            </span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.zip_code || "No Zip Code"}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#999999] text-sm font-semibold">{t("Country")}</span>
          <span className="text-[#4a4a4a] text-base font-semibold">
          {profile?.address?.country || "No Country"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[#999999] text-sm font-semibold">
            {t("Default City")}
          </span>
          <span className="text-[#7655fa] text-base font-semibold">
            New York
          </span>
        </div>
      </div>

     
    </div>
  );
};

export default ProfileAddressInfo;
