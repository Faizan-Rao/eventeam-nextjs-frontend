"use client";
import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import KPICard from "./KPICard";
import { Building2, CircleCheckBig, ListFilter, Search } from "lucide-react";
import CompanyAddDialog from "./AddCompanyDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import _ from "lodash";
import LeadsCard from "./LeadsCard";
import { useQuery } from "@tanstack/react-query";
import { Leads } from "@/configs/apiRoutes";
import { Skeleton } from "./ui/skeleton";



const LeadsContainer = () => {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  const {
    isPending: isLeadsPending,
    data: leads,
    error: leadsError,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: Leads.getLeads,
  });

  console.log(leads)

  // const handleSearch = (value: any, name: string) => {
  //   if (_.isString(value)) {
  //     const searchedData = data.filter((el, index) => {
  //       return (el as any)[name].toLowerCase().includes(value.toLowerCase());
  //     });
  //     setFilteredData(searchedData as any);
  //   } else {
  //     const searchedData = data.filter((el, index) => {
  //       return (el as any)[name] === value;
  //     });
  //     setFilteredData(searchedData as any);
  //   }
  // };

  return (
    <>
      

      <div className="flex  justify-between gap-4">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          All Leads{" "}
          {/* {`(${filteredData.length > 0 ? filteredData.length : leads?.data.total_leads})`} */}
        </h1>
        <div className="flex gap-4">
          <span className="flex place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              // onChange={(event) => handleSearch(event.target.value, "name")}
              className="max-w-sm outline-none text-base bg-transparent "
            />
          </span>

          <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <button className="flex text-base bg-white  place-items-center gap-2 px-4 rounded-md py-2 border-[2px]">
                <ListFilter size={20} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Active State</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(true, "loggedin")}
              >
                <span>Active</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(false, "loggedin")}
              >
                <span>Inactive</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuLabel>Stripe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(true, "stripe")}
              >
                <span>Connected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(false, "stripe")}
              >
                <span>Disconnected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <span className="flex gap-3 flex-1">
                <button
                  className=" text-[#FF2727] my-4 px-4 py-1"
                  onClick={() => {
                    setFilteredData([]);
                  }}
                >
                  Clear Filters
                </button>

                <button
                  className=" bg-[#7655FA] text-white rounded-full my-4 px-6 py-1"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </button>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="flex gap-4 px-4 py-2 bg-[#7655fa] rounded-full text-white">
        
          <span>Export Leads as CSV</span>
        </button>
        </div>
      </div>

      {/* {filteredData.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {(filteredData as any[]).map((el, key) => (
            <LeadsCard
              key={key}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
            />
          ))}
        </div>
      )} */}

        {isLeadsPending && (<div className="flex gap-4 flex-wrap">
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />

        </div>)}
      {filteredData.length <= 0 && (
        <div className="flex  gap-4 flex-wrap">
          {leads && leads?.data.data.leads.map((el:any, key:number) => (
            <LeadsCard
              key={key}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
              event={el.registration.event.title}
              date={el.registration.event.created_at.split('T')[0]}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default LeadsContainer;