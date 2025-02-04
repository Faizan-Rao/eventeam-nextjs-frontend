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
    <>
     
        <CompanyHeader data={companies} />
      
      {/* Main Event Publish Container */}
      <div className=" grid sm:grid-cols-1 md:lg:grid-cols-1 lg:grid-cols-3 place-items-center justify-items-stretch gap-6 lg:mx-20">
        {events &&
          events.map((el: any, i: any) => (
            <CompanyEventCard key={i} index={i} data={el} company={companies} />
          ))}
        {!events && (<>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        <Skeleton className="h-[450px] w-[350px] rounded-xl my-4"/>
        </>)}
      </div>

      <CompanyFooter />
    </>
  );
};

export default CompaniesEvent;
