"use client";
import { Notebook, NotepadText, Search } from "lucide-react";
import React, { useState } from "react";
import DonationAddDialog from "./DonationAddDialog";
import DonationSuggestCont from "./DonationSuggestCont";
import DonationCard from "./DonationCard";
import { useQuery } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { useTranslation } from "react-i18next";
const DonationMainCont = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<any[]>([]);
  const {
    isPending,
    error,
    data: donations,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: Donations.getList,
  });
  const {t} = useTranslation(["translation"])
  const donationData = donations && donations.data.data.data.company_donations;
  return (
    <div className="flex flex-col transition-all ease-in bg-white p-5 gap-4 rounded-md min-h-screen">
      <div className="flex md:flex-row sm:flex-col justify-end gap-4  md:items-center flex-wrap">
        <span className="sm:flex-1 md:flex-none  flex place-items-center gap-2 rounded-md border-[2px] p-1">
          <Search size={18} />
          <input
          type="number"
            placeholder={t("Search Amount...")}
            onChange={(event) => {
              let payload = [...donationData];
              let filteredData = payload.filter(
                (e) =>
                  e.title.includes(`${event.target.value}`) ||
                  e.description.includes(`${event.target.value}`) ||
                  `${e.amount}`.includes(`${event.target.value}`)
              );
              setFiltered(filteredData);
            }}
            className=" outline-none  "
          />
        </span>
        <div className="grid sm:grid-cols-3 md:grid-cols-2 gap-4">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex-1 flex items-center justify-center sm:col-span-2 md:col-span-1 sm:gap-2 md:gap-4 border-[2px] rounded-md px-4 py-2 "
          >
            <NotepadText className="text-[#4a4a4a]" strokeWidth={1} />
            <span className="text-[#4a4a4a] sm:text-xs md:text-sm  font-semibold">
              {!isOpen ? "See" : "Close"} {t("Suggestions")}
            </span>
          </button>
          <DonationAddDialog />
        </div>
      </div>
      <div
        className=" transition-all ease-linear   [&[data-state=close]]:h-0 [&[data-state=open]]:h-full overflow-hidden "
        data-state={isOpen ? "open" : "close"}
      >
        <DonationSuggestCont />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length <= 0 &&
          donationData &&
          donationData.length > 0 &&
          donationData.map((el: any, i: number) => {
            console.log(el);
            return <DonationCard key={el.id} data={el} />;
          })}

        {filtered.length > 0 &&
          filtered.map((el: any, i: number) => {
            console.log(el);
            return <DonationCard key={el.id} data={el} />;
          })}
      </div>
    </div>
  );
};

export default DonationMainCont;
