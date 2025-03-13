"use client";
import CompanyEventCard from "@/components/CompanyEventCard";
import CompanyFooter from "@/components/CompanyFooter";
import CompanyHeader from "@/components/CompanyHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Companies } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import HashLoader from "react-spinners/HashLoader";

const CompaniesEvent = () => {
  const params = useParams();
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["company-events"],
    queryFn: () =>
      Companies.getCompaniesEvents((params.companyId as string) || ""),
  });

  const {t} = useTranslation(["translation"])
  const events = data?.data.data.events.events;
  const companies = data?.data.data.events.company;
  console.log(data, "companies data");
  return (
    <>
      <CompanyHeader data={companies} />

      {/* Main Event Publish Container */}
      <div className=" grid sm:grid-cols-1 md:lg:grid-cols-1 lg:grid-cols-3 place-items-center justify-items-stretch gap-6 lg:mx-20">
        {events &&
          events.map((el: any, i: any) => (
            <CompanyEventCard key={i} index={i} data={el} company={companies} />
          ))}
        {(isLoading || !events) && (
          <div className="flex min-h-screen gap-4 mx-auto sm:col-span-1 md:col-span-1 lg:col-span-3 w-full items-center justify-center ">
            <HashLoader
              color={"#7655fa"}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            
            <p className="text-xl font-semibold text-[#4a4a4a]">{t("Loading...")}</p>
          </div>
        )}
      </div>

      <CompanyFooter />
    </>
  );
};

export default CompaniesEvent;
