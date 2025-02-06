import { USDollar } from "@/configs/currentFormat";
import { HandHeart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const DonationSuggestCard = () => {
  const {t} = useTranslation(["translation"])
  return (
    <div className="flex-1 flex flex-col gap-4 p-6 bg-[white] hover:bg-[#7655fa26]  rounded-lg">
      <span className="text-[#4a4a4a] font-semibold text-sm">
        {t("Donation Example")}
      </span>
      <div className="flex justify-between gap-4 border-b-[1px] pb-4">
        <span className="flex justify-center items-center p-2 bg-[#7655fa] text-white rounded-full">
          <HandHeart />
        </span>
        <span className="flex-1  justify-self-end m-auto w-full text-2xl font-semibold">
          {USDollar.format(200)}
        </span>
      </div>

      <div className="flex flex-col justify-self-end">
        <h1 className="text-[#4a4a4a] text-xl font-semibold">
          {t("Donation Charity")}
        </h1>
        <h1 className="text-[#4a4a4a] text-sm font-semibold">{t("Donation name")}</h1>
      </div>
    </div>
  );
};

export default DonationSuggestCard;
