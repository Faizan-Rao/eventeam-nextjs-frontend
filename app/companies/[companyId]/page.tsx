"use client";
import CompanyEventCard from "@/components/CompanyEventCard";
import CompanyFooter from "@/components/CompanyFooter";
import CompanyHeader from "@/components/CompanyHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Companies } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import React from "react";

const CompaniesEvent = () => {
  const params = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["company-events"],
    queryFn: () =>
      Companies.getCompaniesEvents((params.companyId as string) || ""),
  });
const events = data?.data.data.events.events
const companies = data?.data.data.events.company
  console.log(data, "companies data");
  return (
    <div className="flex flex-col flex-wrap">
     
        <CompanyHeader data={companies} />
      
      {/* Main Event Publish Container */}
      <div className="container flex flex-wrap sm:gap-3  md:gap-10">
        {events &&
          events.map((el: any, i: any) => (
            <CompanyEventCard key={i} data={el} company={companies} />
          ))}
        {!events && (<>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        </>)}
      </div>

      <CompanyFooter />
    </div>
  );
};

export default CompaniesEvent;
